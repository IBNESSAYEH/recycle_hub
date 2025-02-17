import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { collecteReducer } from './store/collecte/collecte.reducer';
import { CollecteEffects } from './store/collecte/collecte.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      collectes: collecteReducer
    }),
    provideEffects([CollecteEffects]) 
  ]
};
