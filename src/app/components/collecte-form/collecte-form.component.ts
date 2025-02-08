import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addCollect } from '../../store/collecte/collecte.actions';
import { CollecteModel } from '../../store/collecte/collecte.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-collecte-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './collecte-form.component.html',
  styleUrl: './collecte-form.component.css'
})
export class CollecteFormComponent implements OnInit {
  collecteForm!: FormGroup;
  minDate: string;
  selectedFiles: File[] = [];
  authUrer = inject(AuthService);

  currentUser = this.authUrer.getCurrentUser();

  readonly wasteTypes = ['PLASTIC', 'GLASS', 'PAPER', 'METAL'] as const;
  readonly timeSlots = Array.from({ length: 19 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  });

  formErrors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.initForm();
    this.collecteForm.valueChanges.subscribe(() => {
      this.validateForm();
    });
  }

  private initForm(): void {
    this.collecteForm = this.fb.group({
      wasteType: ['', [Validators.required]],
      estimatedWeight: ['', [
        Validators.required,
        Validators.min(1000),
        Validators.max(10000),
        Validators.pattern('^[0-9]*$')
      ]],
      collectionAddress: ['', [Validators.required, Validators.minLength(5)]],
      preferredDate: ['', [Validators.required, this.futureDateValidator()]],
      preferredTimeSlot: ['', [Validators.required]],
      additionalNotes: ['', [Validators.maxLength(500)]],
      photos: [[]]
    });
  }

  onFileSelect(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files?.length) {
      this.selectedFiles = Array.from(element.files);
      this.collecteForm.patchValue({
        photos: this.selectedFiles.map(file => URL.createObjectURL(file))
      });
    }
  }

  private futureDateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const selected = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return selected >= today ? null : { pastDate: true };
    };
  }

  private validateForm(): void {
    this.formErrors = {};

    if (!this.collecteForm) return;

    Object.keys(this.collecteForm.controls).forEach(key => {
      const control = this.collecteForm.get(key);
      if (control?.invalid && (control.dirty || control.touched)) {
        this.formErrors[key] = this.getErrorMessage(key, control.errors);
      }
    });
  }

  private getErrorMessage(field: string, errors: ValidationErrors | null): string {
    if (!errors) return '';

    const messages: { [key: string]: string } = {
      required: `${field} is required`,
      min: `Minimum ${field} is ${errors['min'].min}g`,
      max: `Maximum ${field} is ${errors['max'].max}g`,
      pattern: 'Please enter a valid number',
      minlength: `${field} must be at least ${errors['minlength'].requiredLength} characters`,
      maxlength: `${field} cannot exceed ${errors['maxlength'].requiredLength} characters`,
      pastDate: 'Please select a future date'
    };

    return Object.keys(errors)
      .map(key => messages[key])
      .filter(message => message)[0] || 'Invalid field';
  }

  onSubmit(): void {
    if (this.collecteForm.valid) {
      const formValue = this.collecteForm.value;
      const collecte: CollecteModel = {
        ...formValue,
        status: 'pending',
        userId: this.currentUser?.id ? this.currentUser?.id : 1,
        photos: this.selectedFiles.length ? this.selectedFiles : undefined,
        estimatedWeight: Number(formValue.estimatedWeight)
      };

      this.store.dispatch(addCollect({ collecte }));
      this.collecteForm.reset();
      this.selectedFiles = [];
    } else {
      Object.keys(this.collecteForm.controls).forEach(key => {
        const control = this.collecteForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      this.validateForm();
    }
  }
}
