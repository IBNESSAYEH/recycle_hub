import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollecteState } from './collecte.model';


export const selectCollecteState = createFeatureSelector<CollecteState>('collectes');

export const selectAllCollects = createSelector(
  selectCollecteState,
  (state: CollecteState) => state.collectes
);

export const selectCollecteLoading = createSelector(
  selectCollecteState,
  (state: CollecteState) => state.loading
);

export const selectCollecteError = createSelector(
  selectCollecteState,
  (state: CollecteState) => state.error
);


export const selectSelectedCollecte = createSelector(
  selectCollecteState,
  (state: CollecteState) => state.selectedCollecte
);

export const selectShowForm = createSelector(
  selectCollecteState,
  (state: CollecteState) => state.showForm
);



