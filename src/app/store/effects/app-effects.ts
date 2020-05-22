import { map } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { SetSideBarStateAction, AppActionTypes } from './../actions/app-action';

@Injectable()
export class AppEffects {

    constructor(
        private actions$: Actions
    ) { }


    @Effect({ dispatch: false })
    reload = this.actions$.pipe(
        ofType<SetSideBarStateAction>(AppActionTypes.SideBarState),
        map(action => {
            console.log(action);
        })
    );

}