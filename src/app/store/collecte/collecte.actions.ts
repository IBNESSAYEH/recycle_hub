import {createAction, props} from "@ngrx/store"
import { CollecteModel } from "./collecte.model";

export const loadCollects = createAction('[Collects] Load list of collects');
export const addCollect = createAction('[Collects] add a Collect', props<{collecte: CollecteModel}>());
export const updateCollect = createAction('[Collects] update a Collect', props<{collecte: CollecteModel}>());
export const deleteCollect = createAction('[Collects] delete a Collect', props<{id: number}>());
