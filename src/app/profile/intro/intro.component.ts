import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { setProfile } from '../profile.action';
import { Profile } from '../profile.model';
import { ProfileService } from '../profile.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  profile: Profile = new Profile;

  constructor(
    private _store:Store<AppState>,
    private modalService: NgbModal
    ) 
  { 
    this._store.select(state => state.profile).subscribe(profile => this.profile = profile);
  }

  ngOnInit(): void {
    

  }

  openEditProfile(){
    const modalRef = this.modalService.open(EditProfileComponent);
  }

}
