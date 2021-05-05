import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ProfileService } from './profile.service';

import * as profileActions from './profile.action';
import { ExperienceService } from './experience/experience.service';
import { addExperiences } from './experience/experience.action';
import { EducationService } from './education/education.service';
import { addEducations } from './education/education.action';
import { SkillService } from './skill/skill.service';
import { addSkills } from './skill/skill.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loadIntro:boolean = false;
  loadExperience:boolean = false;
  loadEducation:boolean = false;
  loadSkills:boolean = false;

  constructor(
    private _profilesService:ProfileService,
    private _experienceService: ExperienceService,
    private _educationService: EducationService,
    private _skillService: SkillService,
    private _store:Store<AppState>,
    private acticedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(){

    this._store.select(state => state.auth)
      .subscribe(auth => {
        
        let email = auth?.email ?? this.acticedRoute.snapshot.params.id;

        this._profilesService.getProfile(email ?? "")
          .subscribe(profile => {

            this._store.dispatch(profileActions.setProfile({ profile : profile }))
            this.loadIntro = true;
        });

        this._experienceService.getExperiences(email ?? "")
          .subscribe(experiences => {
          
            this._store.dispatch(addExperiences({ experiences : experiences}));
            this.loadExperience = true;
        });
        
        this._educationService.getEducations(email ?? "")
        .subscribe(educations => {
        
          this._store.dispatch(addEducations({ educations : educations}));
          this.loadEducation = true;
        });

        this._skillService.getSkills(email ?? "")
        .subscribe(skilss => {
          this._store.dispatch(addSkills({ skills : skilss}));
          this.loadSkills = true;
        });

      })
  }
}
