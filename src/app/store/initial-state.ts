import { AppState, AppStore } from '../model/app/app-state';

export const INITIAL_APP_STATE: AppState = {
    AppName: '个人博客',
    isShowSideBar: true
};

export const INITIAL_STATE: AppStore = {
    app: INITIAL_APP_STATE
};