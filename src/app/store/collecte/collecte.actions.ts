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

export const deleteCollect = createAction('[Collects] Delete a Collect', props<{ id: number }>());
export const deleteCollectSuccess = createAction('[Collects] Delete a Collect Success', props<{ id: number }>());
export const deleteCollectFailure = createAction('[Collects] Delete a Collect Failure', props<{ error: string }>());
