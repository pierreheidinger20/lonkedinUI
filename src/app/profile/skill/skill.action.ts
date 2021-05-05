import { createAction, props } from '@ngrx/store';
import { Skill } from './skill.model';

export const addSkills = createAction('[Skill Component] add',props<{skills:Skill[]}>());
export const addSkill = createAction('[Skill Component] add one',props<{skill:Skill}>());
export const setSkill = createAction('[Skill Component] set',props<{skill:Skill}>());
export const deleteSkill= createAction('[Skill Component] delete',props<{skill:Skill}>());
