import { createAction, props } from "@ngrx/store";
import { CollecteModel } from "./collecte.model";

export const loadCollects = createAction('[Collects] Load list of collects');
export const loadCollectsSuccess = createAction('[Collects] Load list of collects Success', props<{ collectes: CollecteModel[] }>());
export const loadCollectsFailure = createAction('[Collects] Load list of collects Failure', props<{ error: string }>());

export const addCollect = createAction('[Collects] Add a Collect', props<{ collecte: CollecteModel }>());
export const addCollectSuccess = createAction('[Collects] Add a Collect Success', props<{ collecte: CollecteModel }>());
export const addCollectFailure = createAction('[Collects] Add a Collect Failure', props<{ error: string }>());

export const updateCollect = createAction('[Collects] Update a Collect', props<{ collecte: CollecteModel }>());
export const updateCollectSuccess = createAction('[Collects] Update a Collect Success', props<{ collecte: CollecteModel }>());
export const updateCollectFailure = createAction('[Collects] Update a Collect Failure', props<{ error: string }>());

export const deleteCollect = createAction('[Collects] Delete a Collect', props<{ id: string }>());
export const deleteCollectSuccess = createAction('[Collects] Delete a Collect Success', props<{ id: string }>());
export const deleteCollectFailure = createAction('[Collects] Delete a Collect Failure', props<{ error: string }>());


export const updateCollectStatus = createAction(
  '[Collects] Update Collect Status',
  props<{ id: string; status: 'pending' | 'accepted' | 'completed' | 'cancelled' }>()
);

export const updateCollectStatusSuccess = createAction(
  '[Collects] Update Collect Status Success',
  props<{ collecte: CollecteModel }>()
);

export const updateCollectStatusFailure = createAction(
  '[Collects] Update Collect Status Failure',
  props<{ error: string }>()
);
