import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { INITIAL_STATE } from './initial-state';
import { appReducer } from './reducers/app-reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects/app-effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({ app: appReducer }, { initialState: INITIAL_STATE }),
    EffectsModule.forRoot([
        AppEffects
    ])
  ]
})
export class AppStoreModule { }
