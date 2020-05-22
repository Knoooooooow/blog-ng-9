
import { createSelector } from '@ngrx/store';
import { AppStore } from 'src/app/model/app/app-state';

export const selectApp = (state: AppStore) => state.app;


export const getAppName = createSelector(
    selectApp,
    state => state.AppName
);

export const getIsShowSideBar = createSelector(
    selectApp,
    state => state.isShowSideBar
);