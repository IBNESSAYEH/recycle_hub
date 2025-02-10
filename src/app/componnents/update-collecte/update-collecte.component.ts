import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CollecteModel } from '../../store/collecte/collecte.model';
import { loadCollects, updateCollect } from '../../store/collecte/collecte.actions';
import { selectAllCollects } from '../../store/collecte/collecte.selectors';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
 selector: 'app-update-collecte',
 standalone: true,
 imports: [CommonModule, ReactiveFormsModule, RouterModule],
 templateUrl: './update-collecte.component.html',
 styleUrls: ['./update-collecte.component.css']
})
export class UpdateCollecteComponent implements OnInit, OnDestroy {
 updateForm!: FormGroup;
 collecteId: string | null = null;
 currentCollecte: CollecteModel | null = null;
 loading = true;
 private subscription: Subscription = new Subscription();

 wasteTypes = ['PLASTIC', 'GLASS', 'PAPER', 'METAL'];
 timeSlots = Array.from({ length: 19 }, (_, i) => {
   const hour = Math.floor(i / 2) + 9;
   const minutes = i % 2 === 0 ? '00' : '30';
   return `${hour.toString().padStart(2, '0')}:${minutes}`;
 }).filter(time => {
   const hour = parseInt(time.split(':')[0]);
   return hour >= 9 && hour < 18;
 });

 constructor(
   private fb: FormBuilder,
   private store: Store,
   private route: ActivatedRoute,
   private router: Router
 ) {
   this.initForm();
 }

 private initForm() {
   this.updateForm = this.fb.group({
     wasteType: ['', [Validators.required]],
     estimatedWeight: ['', [
       Validators.required,
       Validators.min(1000),
       Validators.max(10000)
     ]],
     collectionAddress: ['', [Validators.required]],
     preferredDate: ['', [Validators.required]],
     preferredTimeSlot: ['', [Validators.required]],
     additionalNotes: ['']
   });
 }

 ngOnInit() {
   this.collecteId = this.route.snapshot.paramMap.get('id');
   if (this.collecteId) {
     this.store.dispatch(loadCollects());

     this.subscription.add(
       this.store.select(selectAllCollects).subscribe(collectes => {
         const collecte = collectes.find(c => c.id === this.collecteId);
         if (collecte) {
           this.currentCollecte = collecte;
           this.updateForm.patchValue({
             wasteType: collecte.wasteType,
             estimatedWeight: collecte.estimatedWeight,
             collectionAddress: collecte.collectionAddress,
             preferredDate: collecte.preferredDate,
             preferredTimeSlot: collecte.preferredTimeSlot,
             additionalNotes: collecte.additionalNotes || ''
           });
           this.loading = false;
         } else {
           Swal.fire({
             title: 'Error!',
             text: 'Collection request not found',
             icon: 'error',
             confirmButtonColor: '#10B981'
           }).then(() => {
             this.router.navigate(['/collectes']);
           });
         }
       })
     );
   }

   this.subscription.add(
     this.updateForm.valueChanges.subscribe(() => {
       if (this.updateForm.dirty) {
         window.onbeforeunload = () => true;
       }
     })
   );
 }

 async onSubmit() {
   if (this.updateForm.valid && this.collecteId && this.currentCollecte) {
     try {
       const updatedCollecte: CollecteModel = {
         ...this.currentCollecte,
         ...this.updateForm.value,
         id: this.collecteId
       };

       this.store.dispatch(updateCollect({ collecte: updatedCollecte }));

       await Swal.fire({
         title: 'Success!',
         text: 'Collection request updated successfully',
         icon: 'success',
         confirmButtonColor: '#10B981'
       });

       window.onbeforeunload = null;
       this.router.navigate(['/collectes']);
     } catch (error) {
       console.error('Update error:', error);
       Swal.fire({
         title: 'Error!',
         text: 'Failed to update collection request',
         icon: 'error',
         confirmButtonColor: '#10B981'
       });
     }
   } else {
     if (!this.updateForm.valid) {
       Object.keys(this.updateForm.controls).forEach(key => {
         const control = this.updateForm.get(key);
         control?.markAsTouched();
       });

       Swal.fire({
         title: 'Error!',
         text: 'Please fill all required fields correctly',
         icon: 'error',
         confirmButtonColor: '#10B981'
       });
     }
   }
 }

 onCancel() {
   if (this.updateForm.dirty) {
     Swal.fire({
       title: 'Are you sure?',
       text: 'You have unsaved changes. Do you want to discard them?',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#10B981',
       cancelButtonColor: '#EF4444',
       confirmButtonText: 'Yes, discard changes'
     }).then((result) => {
       if (result.isConfirmed) {
         window.onbeforeunload = null;
         this.router.navigate(['/collectes']);
       }
     });
   } else {
     this.router.navigate(['/collectes']);
   }
 }

 ngOnDestroy() {
   this.subscription.unsubscribe();
   window.onbeforeunload = null;
 }
}
