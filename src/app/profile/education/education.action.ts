import { createAction, props } from '@ngrx/store';
import { Education } from './education.model';


export const addEducations = createAction('[Education Component] add',props<{educations:Education[]}>());
export const addEducation = createAction('[Education Component] add one',props<{education:Education}>());
export const setEducation = createAction('[Education Component] set',props<{education:Education}>());
export const deleteEducation= createAction('[Education Component] delete',props<{education:Education}>());
