import {createSelector} from 'reselect';

import { RootState } from '../store';

import { UserState } from './user.reducer';

export const selectUseReducer = (state: RootState): UserState => state.user;


export const selectCurrentUser = createSelector(
    selectUseReducer,
    (user) => user.currentUser
);