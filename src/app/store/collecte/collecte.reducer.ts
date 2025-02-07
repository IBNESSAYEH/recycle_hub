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


on(CollecteActions.deleteCollect, (state, { id }) => ({
  ...state,
  collectes: state.collectes.filter(collecte => +collecte.id !== id)
})));


// on(CollecteActions.deleteCollect, (state) => ({
//   ...state,
//   loading: true
// })),
// on(CollecteActions.deleteCollectSuccess, (state, { id }) => ({
//   ...state,
//   loading: false,
//   collectes: state.collectes.filter(collecte => collecte.id !== id)
// })),
// on(CollecteActions.deleteCollectFailure, (state, { error }) => ({
//   ...state,
//   loading: false,
//   error
// }))
