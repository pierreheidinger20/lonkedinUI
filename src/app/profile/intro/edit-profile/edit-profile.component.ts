import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Profile } from '../../profile.model';
import { ProfileService } from '../../profile.service';
import Swal from 'sweetalert2'


import * as profileActions from '../../profile.action';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  userForm: FormGroup;
  profile: Profile = new Profile;
  submit:boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public _store:Store<AppState>,
    public _profileService: ProfileService) 
  { 
    this.loadProfile();
    this.userForm = this.loadGroupForm();
  }

  get f(){
    return this.userForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    debugger;
    this.submit = true;

    if(this.userForm.valid)
    {
      this._profileService.updateProfile(this.getProfileForm())
        .subscribe(profileUpdated =>{
           this._store.dispatch(profileActions.setProfile({ profile : profileUpdated }));

           Swal.fire({
            icon: 'success',
            title: 'Data successfully updated',
            showConfirmButton: false,
            timer: 1500
          })

          this.activeModal.close();
        });
    }
    console.log(this.userForm.value);
  }
  
  private loadProfile(){
     this._store.select(state => state.profile).subscribe(profile => this.profile = profile);
  }

  private loadGroupForm(){
    return this.userForm = this.formBuilder.group({
      firstName: [this.profile.firstName, [Validators.required, Validators.max(30)]],
      lastName: [this.profile.lastName, [Validators.required, Validators.max(30)]],
      email: [this.profile.email, [Validators.required]],
      city: [this.profile.city, [Validators.required]],
      address: [this.profile.address, []],
      company: [this.profile.company, []],
      presentation: [this.profile.presentation, [Validators.maxLength(500)]],
      phoneNumber: [this.profile.phoneNumber, []]
    });
  }
  private getProfileForm():Profile
  {
    return this.userForm.value;
  }
}
