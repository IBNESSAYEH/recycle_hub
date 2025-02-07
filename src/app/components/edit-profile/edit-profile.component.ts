import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { UserData } from '../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  currentUser: UserData | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-()]{10,}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5,}$/)]],
      birthDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const user = this.userService.getCurrentUserFromStorage();
    if (user) {
      this.currentUser = user;
      this.editForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        zipCode: user.zipCode,
        birthDate: user.birthDate
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (this.editForm.valid && this.currentUser?.id) {
      const updatedUser = {
        ...this.currentUser,
        ...this.editForm.value
      };

      this.userService.updateUser(this.currentUser.id, updatedUser).subscribe({
        next: (response) => {
          localStorage.setItem('currentUser', JSON.stringify(response));
          Swal.fire({
            title: 'Success!',
            text: 'Profile updated successfully',
            icon: 'success',
            confirmButtonColor: '#10B981'
          }).then(() => {
            this.router.navigate(['/profile']);
          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update profile',
            icon: 'error',
            confirmButtonColor: '#10B981'
          });
          console.error('Update error:', error);
        }
      });
    } else {
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill all required fields correctly',
        icon: 'warning',
        confirmButtonColor: '#10B981'
      });
    }
  }

  onCancel() {
    this.router.navigate(['/profile']);
  }
}
