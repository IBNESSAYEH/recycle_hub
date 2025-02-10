import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { deleteCollect, loadCollects } from '../../store/collecte/collecte.actions';
import { selectAllCollects, selectCollecteLoading, selectCollecteError } from '../../store/collecte/collecte.selectors';
import { CollecteModel } from '../../store/collecte/collecte.model';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { CollecteService } from '../../services/collecte-service.service';
import {updateCollectStatus} from '../../store/collecte/collecte.actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collect-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './collect-list.component.html',
  styleUrl: './collect-list.component.css'
})
export class CollectListComponent implements OnInit {
  private store = inject(Store);
  authUrer = inject(AuthService);

  currentUser = this.authUrer.getCurrentUser();
  collecteService = inject(CollecteService)


  wasteTypeImages = ['assets/images/1.png','assets/images/2.png','assets/images/3.png','assets/images/4.png','assets/images/5.png','assets/images/6.png','assets/images/7.png','assets/images/8.png','assets/images/1.png','assets/images/2.png','assets/images/3.png','assets/images/4.png','assets/images/5.png','assets/images/6.png','assets/images/7.png','assets/images/8.png','assets/images/1.png','assets/images/2.png','assets/images/3.png','assets/images/4.png','assets/images/5.png','assets/images/6.png','assets/images/7.png','assets/images/8.png','assets/images/1.png','assets/images/2.png','assets/images/3.png','assets/images/4.png','assets/images/5.png','assets/images/6.png','assets/images/7.png','assets/images/8.png','assets/images/1.png','assets/images/2.png','assets/images/3.png','assets/images/4.png','assets/images/5.png','assets/images/6.png','assets/images/7.png','assets/images/8.png'];

  collects$: Observable<CollecteModel[]> = this.store.select(selectAllCollects).pipe(
    tap(data => console.log('Collects data:', data))
  );

  loading$: Observable<boolean> = this.store.select(selectCollecteLoading).pipe(
    tap(loading => console.log('Loading state:', loading))
  );

  error$: Observable<string | null> = this.store.select(selectCollecteError).pipe(
    tap(error => console.log('Error state:', error))
  );

  ngOnInit() {
    console.log('Component initialized');
    this.store.dispatch(loadCollects());
  }










  onStatusChange(
    collectId: string,
    event: Event,
    currentStatus: 'pending' | 'accepted' | 'completed' | 'cancelled' | undefined
  ) {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value as 'pending' | 'accepted' | 'completed' | 'cancelled';

    if (!currentStatus) return;

    Swal.fire({
      title: 'Are you sure?',
      text: `Change status to ${newStatus}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(updateCollectStatus({ id: collectId, status: newStatus }));
      } else {
        select.value = currentStatus;
      }
    });
  }

  onDelete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(deleteCollect({ id }));
      }
    });
  }
}
