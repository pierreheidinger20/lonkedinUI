import { createReducer, on , Action } from "@ngrx/store";
import { setProfile } from "./profile.action";
import { Profile } from "./profile.model";

export const initialState:Profile = new Profile

const _profileReducer = createReducer(
    initialState,
    on(setProfile,(state ,{ profile }) => {
        return {
            firstName: profile.firstName,
            lastName : profile.lastName,
            email : profile.email,
            city : profile.city,
            address : profile.address,
            phoneNumber : profile.phoneNumber,
            company : profile.company,
            presentation : profile.presentation
        };
    }),
);


export function profileReducer(state: Profile | undefined,action: Action){
    return _profileReducer(state,action);
}