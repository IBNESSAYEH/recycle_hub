import { CollecteModel } from "./collecte.model";

export interface CollecteState {
  collectes: CollecteModel[];
  loading: boolean;
  error: string | null;
}

export const initialState: CollecteState = {
  collectes: [],
  loading: false,
  error: null
};
