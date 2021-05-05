import { createReducer, on , Action } from "@ngrx/store";
import { addSkill, addSkills, deleteSkill, setSkill } from "./skill.action";
import { Skill } from "./skill.model";

export const initialState:Skill[] = [];

const _skillReducer = createReducer(
    initialState,
    on(addSkill,(state ,{ skill }) => {
        return [...state,skill];
    }),
    on(addSkills,(state ,{ skills }) => {
        return skills;
    }),
    on(setSkill,(state ,{ skill }) => {
        debugger;
        return state.map(skillState => {

            if(skillState._id == skill._id)
            {
                debugger;
                return {
                    ...skillState,
                    email: skill.email,
                    name : skill.name,
                    nivel : skill.nivel
                }

            }else
            {
                return skillState;
            }
      
        })
    }),
    on(deleteSkill,(state ,{ skill  }) => {
        return state.filter(experienceState => experienceState._id !== skill._id);
    }),
);


export function skillRedudcer(state:Skill[] | undefined,action: Action){
    return _skillReducer(state,action);
}