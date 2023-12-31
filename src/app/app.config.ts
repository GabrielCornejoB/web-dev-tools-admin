import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { firebaseProviders } from './firebase.config';

import { authFeatureKey, authReducer } from '@store/auth';
import * as authEffects from '@store/auth/auth.effects';
import { toolsFeatureKey, toolsReducer } from '@store/tools';
import * as toolsEffects from '@store/tools/tools.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    firebaseProviders,
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideState(toolsFeatureKey, toolsReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(authEffects),
    provideEffects(toolsEffects),
  ],
};
