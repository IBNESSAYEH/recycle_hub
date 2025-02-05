import { createReducer, on } from "@ngrx/store";
import { collecteState } from "./collecte.state";
import { loadCollects } from "./collecte.actions";

export const collectReducer = createReducer(
  collecteState,
  // on(loadCollects, (state) => {...state, collects: collects}),
  on(loadCollects, (state, action) => {...state, collects: [action.collectes , ...state.collectes]})
);
