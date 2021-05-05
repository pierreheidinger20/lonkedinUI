import { ActionReducerMap } from "@ngrx/store";
import { UserState } from "./auth/userState.model";
import { Profile } from "./profile/profile.model";
import { Experience } from "./profile/experience/experience.model";


import * as fromAuth from "./auth/auth.reducer" 
import * as fromProfile from "./profile/profile.reducer" 
import * as fromExperience from "./profile/experience/experience.reducer" 

export interface AppState
{
    auth:UserState,
    profile:Profile,
    experiences: Experience[]
}

export  const appReducers :ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    profile : fromProfile.profileReducer,
    experiences : fromExperience.experienceRedudcer
}