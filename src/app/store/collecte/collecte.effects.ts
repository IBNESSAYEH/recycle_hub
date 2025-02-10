import { inject, Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as CollecteActions from './collecte.actions';
import { CollecteService } from '../../services/collecte-service.service';

@Injectable()
export class CollecteEffects {
  private actions$ = inject(Actions)
  collecteService = inject(CollecteService);

  loadCollects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollecteActions.loadCollects),
      mergeMap(() =>
        this.collecteService.getCollectes().pipe(
          map(collectes => CollecteActions.loadCollectsSuccess({ collectes })),
          catchError(error => of(CollecteActions.loadCollectsFailure({ error: error.message })))
        )
      )
    )
  );

  addCollect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollecteActions.addCollect),
      mergeMap(({ collecte }) =>
        this.collecteService.addCollecte(collecte).pipe(
          map(collecte => CollecteActions.addCollectSuccess({ collecte })),
          catchError(error => of(CollecteActions.addCollectFailure({ error: error.message })))
        )
      )
    )
  );

  updateCollect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollecteActions.updateCollect),
      mergeMap(({ collecte }) =>
        this.collecteService.updateCollecte(collecte).pipe(
          map(collecte => CollecteActions.updateCollectSuccess({ collecte })),
          catchError(error => of(CollecteActions.updateCollectFailure({ error: error.message })))
        )
      )
    )
  );

  deleteCollect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollecteActions.deleteCollect),
      mergeMap(({ id }) =>
        this.collecteService.deleteCollecte(id).pipe(
          map(() => CollecteActions.deleteCollectSuccess({ id })),
          catchError(error => of(CollecteActions.deleteCollectFailure({ error: error.message })))
        )
      )
    )
  );

  updateStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollecteActions.updateCollectStatus),
      mergeMap(({ id, status }) =>
        this.collecteService.updateCollectStatus(id, status).pipe(
          map(collecte => CollecteActions.updateCollectStatusSuccess({ collecte })),
          catchError(error => of(CollecteActions.updateCollectStatusFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    // private readonly actions$: Actions,
    // private readonly collecteService: CollecteService
  ) {}
}
