import { ActionReducerMap } from "@ngrx/store";
import { UserState } from "./auth/userState.model";
import { Profile } from "./profile/profile.model";
import { Experience } from "./profile/experience/experience.model";
import { Education } from "./profile/education/education.model";
import { Skill } from "./profile/skill/skill.model";

import * as fromAuth from "./auth/auth.reducer" 
import * as fromProfile from "./profile/profile.reducer" 
import * as fromExperience from "./profile/experience/experience.reducer" 
import * as fromEducation from "./profile/education/education.reducer" 
import * as fromSkill from "./profile/skill/skill.reducer"



export interface AppState
{
    auth:UserState,
    profile:Profile,
    experiences: Experience[],
    educations:Education[],
    skills:Skill[]
}

export  const appReducers :ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    profile : fromProfile.profileReducer,
    experiences : fromExperience.experienceRedudcer,
    educations : fromEducation.educationRedudcer,
    skills : fromSkill.skillRedudcer
}