import { AppState } from 'src/app/model/app/app-state';
import { Action } from '@ngrx/store';

export enum AppActionTypes {
    InitialState = 'INITIAL_STATE',
    AppName = 'APP_NAME',
    SideBarState = 'SIDE_BAR_STATE',
    PlayAudio = "PLAY_AUDIO"
}
export class InitialStateAction implements Action {
    readonly type = AppActionTypes.InitialState;

    constructor(public payload: AppState) { }
}
export class SetAppNameAction implements Action {
    readonly type = AppActionTypes.AppName;

    constructor(public payload: string) { }
}
export class SetSideBarStateAction implements Action {
    readonly type = AppActionTypes.SideBarState;

    constructor(public payload: boolean) { }
}
export class PlayAudioAction implements Action {
    readonly type = AppActionTypes.PlayAudio;

    constructor(public payload: boolean) { }
}