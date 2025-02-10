import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserData } from '../../models/user.model';
import { Router } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  Math = Math;
  currentUser: UserData | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.loading = true;
    this.error = null;

    try {
      this.currentUser = this.userService.getCurrentUserFromStorage();
      this.loading = false;
    } catch (error) {
      this.error = 'Failed to load user data.';
      this.loading = false;
      console.error('Error:', error);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to load user data.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  onEdit() {
    this.router.navigate(['/edit-profile']);
  }

  async onDelete() {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed && this.currentUser?.id) {
      try {
        await this.userService.deleteAccount(this.currentUser.id).toPromise();

        await Swal.fire({
          title: 'Deleted!',
          text: 'Your account has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#10B981'
        });

        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Error deleting account:', error);

        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete account. Please try again later.',
          icon: 'error',
          confirmButtonColor: '#10B981'
        });
      }
    }
  }
}
