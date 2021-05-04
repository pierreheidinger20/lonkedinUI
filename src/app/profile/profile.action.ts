import { createAction, props } from '@ngrx/store';
import { Profile } from './profile.model';

export const getProfile = createAction('[Profile Component] get',props<{profile:Profile}>());
export const setProfile = createAction('[Profile Component] set',props<{profile:Profile}>());
