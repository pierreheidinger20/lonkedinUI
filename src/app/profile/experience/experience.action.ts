import { createAction, props } from '@ngrx/store';
import { Experience } from './experience.model';

export const addExperiences = createAction('[Experience Component] add',props<{experiences:Experience[]}>());
export const addExperience = createAction('[Experience Component] add one',props<{experience:Experience}>());
export const setExperience = createAction('[Experience Component] set',props<{experience:Experience}>());
export const deleteExperience = createAction('[Experience Component] delete',props<{experience:Experience}>());
