import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { deleteCollect, loadCollects } from '../../store/collecte/collecte.actions';
import { selectAllCollects, selectCollecteLoading, selectCollecteError } from '../../store/collecte/collecte.selectors';
import { CollecteModel } from '../../store/collecte/collecte.model';

@Component({
  selector: 'app-collect-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collect-list.component.html',
  styleUrl: './collect-list.component.css'
})
export class CollectListComponent implements OnInit {
  private store = inject(Store);
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

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this collection request?')) {
      this.store.dispatch(deleteCollect({ id }));
    }
  }

  onEdit(collect: CollecteModel) {
    console.log('Edit collect:', collect);
   
  }
}
