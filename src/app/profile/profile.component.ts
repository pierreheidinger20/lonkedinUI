import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ProfileService } from './profile.service';

import * as profileActions from './profile.action';
import { ExperienceService } from './experience/experience.service';
import { addExperiences } from './experience/experience.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loadIntro:boolean = false;
  loadExperience:boolean = false;

  constructor(
    private _profilesService:ProfileService,
    private _experienceService: ExperienceService,
    private _store:Store<AppState>
    ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(){

    this._store.select(state => state.auth)
      .subscribe(auth => {

        this._profilesService.getProfile(auth.email ?? "")
          .subscribe(profile => {

            this._store.dispatch(profileActions.setProfile({ profile : profile }))
            this.loadIntro = true;
        });

        this._experienceService.getExperiences(auth.email ?? "")
          .subscribe(experiences => {
          
            this._store.dispatch(addExperiences({ experiences : experiences}));
            this.loadExperience = true;
        });
        
      })
  }
}
