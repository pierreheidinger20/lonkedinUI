import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ProfileService } from './profile.service';

import * as profileActions from './profile.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private _profilesService:ProfileService,
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

          });
        
      })
  }
}
