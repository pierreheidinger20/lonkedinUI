import { createReducer, on , Action } from "@ngrx/store";
import { login, logout } from './auth.action'
import { UserState } from "./userState.model";

export const initialState:UserState = {
    isAuthenticated : false
}

const _authReducer = createReducer(
    initialState,
    on(login,(state ,{ userState }) => {
        userState.isAuthenticated = true;
        return userState;
    }),
    on(logout,(state) => {
        state.isAuthenticated = false;
        state.email = undefined;
        return state;
    })
);


export function authReducer(state: UserState | undefined,action: Action){
    return _authReducer(state,action);
}