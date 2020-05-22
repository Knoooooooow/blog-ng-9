import { Action } from '@ngrx/store';
import { AppState } from 'src/app/model/app/app-state';
import { INITIAL_APP_STATE } from '../initial-state';
import { SetSideBarStateAction, AppActionTypes, InitialStateAction, SetAppNameAction } from 'src/app/store/actions/app-action';

export function appReducer(
    state: AppState = INITIAL_APP_STATE,
    action: Action
): AppState {
    let newState: AppState;
    switch (action.type) {
        case AppActionTypes.InitialState:
            newState = Object.assign({}, (<InitialStateAction>action).payload);
            break;
        case AppActionTypes.AppName:
            newState = setAppName(state, <SetAppNameAction>action)
            break;
        case AppActionTypes.SideBarState:
            newState = setSideBarState(state, <SetSideBarStateAction>action)
            break;
        default:
            newState = Object.assign({}, state);
    }
    return newState;
}

function setAppName(state: AppState, action): AppState {
    const newState = Object.assign({}, state);
    newState.AppName = action.payload;
    return newState;
}

function setSideBarState(state: AppState, action): AppState {
    const newState = Object.assign({}, state);
    newState.isShowSideBar = action.payload;
    return newState;
}
