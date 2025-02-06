import { createReducer, on } from '@ngrx/store';
import * as CollecteActions from './collecte.actions';
import { CollecteState } from './collecte.model';

export const initialState: CollecteState = {
  collectes: [],
  selectedCollecte: null,
  loading: false,
  error: null,
  showForm: false
};

export const collecteReducer = createReducer(
  initialState,
  on(CollecteActions.loadCollects, state => ({ ...state, loading: true })),
  on(CollecteActions.loadCollectsSuccess, (state, { collectes }) => ({ ...state, loading: false, collectes })),
  on(CollecteActions.loadCollectsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Similar patterns for add, update, delete
);
