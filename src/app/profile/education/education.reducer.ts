import { createReducer, on , Action } from "@ngrx/store";
import { addEducation, addEducations, deleteEducation, setEducation } from "./education.action";
import { Education } from "./education.model";


export const initialState:Education[] = [];

const _educationReducer = createReducer(
    initialState,
    on(addEducation,(state ,{ education }) => {
        return [...state,education];
    }),
    on(addEducations,(state ,{ educations }) => {
        return educations;
    }),
    on(setEducation,(state ,{ education }) => {
        debugger;
        return state.map(educationState => {

            if(educationState._id == education._id)
            {
                debugger;
                return {
                    ...educationState,
                    email: education.email,
                    school : education.school,
                    degree : education.degree,
                    credentialUrl : education.credentialUrl,
                }

            }else
            {
                return educationState;
            }
      
        })
    }),
    on(deleteEducation,(state ,{ education  }) => {
        return state.filter(experienceState => experienceState._id !== education._id);
    }),
);


export function educationRedudcer(state:Education[] | undefined,action: Action){
    return _educationReducer(state,action);
}