import { createReducer, on , Action } from "@ngrx/store";
import { addExperience, addExperiences, deleteExperience, setExperience } from "./experience.action";
import { Experience } from "./experience.model";



export const initialState:Experience[] = [];

const _experienceReducer = createReducer(
    initialState,
    on(addExperience,(state ,{ experience }) => {
        return [...state,experience];
    }),
    on(addExperiences,(state ,{ experiences }) => {
        return experiences;
    }),
    on(setExperience,(state ,{ experience }) => {

        return state.map(experienceState => {

            if(experienceState._id == experience._id)
            {

                return {
                    ...experienceState,
                    company : experience.company,
                    description : experience.description,
                    title : experience.title,
                    startDate : experience.startDate,
                    endDate : experience.endDate
                }

            }else
            {
                return experienceState;
            }
      
        })
    }),
    on(deleteExperience,(state ,{ experience }) => {
        return state.filter(experienceState => experienceState._id !== experience._id);
    }),
);


export function experienceRedudcer(state:Experience[] | undefined,action: Action){
    return _experienceReducer(state,action);
}