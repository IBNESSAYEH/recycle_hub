import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-()]{10,}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5,}$/)]],
      birthDate: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.createForm.valid) {
      try {
        const userData = {
          ...this.createForm.value,
          role: 'USER'
        };
        await this.userService.createUser(userData).toPromise();

        await Swal.fire({
          title: 'Success!',
          text: 'Account created successfully',
          icon: 'success',
          confirmButtonColor: '#10B981'
        });

        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Creation error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to create account',
          icon: 'error',
          confirmButtonColor: '#10B981'
        });
      }
    } else {
      this.markFormGroupTouched(this.createForm);
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill all required fields correctly',
        icon: 'warning',
        confirmButtonColor: '#10B981'
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get passwordMatchError() {
    return (
      this.createForm.getError('mismatch') &&
      this.createForm.get('confirmPassword')?.touched
    );
  }
}
