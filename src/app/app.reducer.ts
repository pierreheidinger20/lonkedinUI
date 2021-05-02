import { ActionReducerMap } from "@ngrx/store";
import { UserState } from "./auth/userState.model";

import * as fromLogin from "./auth/auth.reducer" 

export interface AppState
{
    auth:UserState
}

export  const appReducers :ActionReducerMap<AppState> = {
    auth: fromLogin.authReducer,
}