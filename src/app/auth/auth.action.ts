import { createAction, props } from '@ngrx/store';
import { UserState } from './userState.model';

export const login = createAction('[Login Component] login',props<{userState:UserState}>());
export const logout = createAction('[Login Component] logout');