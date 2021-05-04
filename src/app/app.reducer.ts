import { ActionReducerMap } from "@ngrx/store";
import { UserState } from "./auth/userState.model";

import * as fromAuth from "./auth/auth.reducer" 
import * as fromProfile from "./profile/profile.reducer" 
import { Profile } from "./profile/profile.model";

export interface AppState
{
    auth:UserState,
    profile:Profile
}

export  const appReducers :ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    profile : fromProfile.profileReducer
}