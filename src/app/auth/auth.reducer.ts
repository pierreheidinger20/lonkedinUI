import { createReducer, on , Action } from "@ngrx/store";
import { login, logout } from './auth.action'
import { UserState } from "./userState.model";

export const initialState:UserState = {
    isAuthenticated : false
}

const _authReducer = createReducer(
    initialState,
    on(login,(state ,{ userState }) => {
        return {
            isAuthenticated : true,
            email : userState.email,
            token : userState.token,
            logOut : false
        };
    }),
    on(logout,(state) => {
        return {
            ...state,
            isAuthenticated : false,
            logOut : true
        };
    })
);


export function authReducer(state: UserState | undefined,action: Action){
    return _authReducer(state,action);
}