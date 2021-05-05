import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { addExperience } from '../experience.action';
import { Experience } from '../experience.model';
import { ExperienceService } from '../experience.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.scss']
})
export class AddExperienceComponent implements OnInit {

  userForm: FormGroup;
  experience:Experience = new Experience;
  submit:boolean = false;

  constructor(public activeModal: NgbActiveModal,
              public formBuilder: FormBuilder,
              private _experiencesService:ExperienceService,
              private _store:Store<AppState>) 
  { 
    this.userForm = this.loadGroupForm();
  }

  get f(){
    return this.userForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    
    this.submit = true;

    if(this.userForm.valid)
    {
      let valueForm = this.userForm.value;

      var experience = new Experience();
      experience.company = valueForm.company;
      experience.description = valueForm.description;
      experience.title = valueForm.title;
      experience.startDate = this.formatDate(valueForm.startDate);

      if(valueForm.endDate)
      {
        experience.endDate = this.formatDate(valueForm.endDate);
      }
      console.log(experience)
      this._store.select(state => state.auth)
        .subscribe(auth => {

          experience.email = auth.email ?? "";

          this._experiencesService.addExperiences(experience)
          .subscribe(experienceAdded =>{

            this._store.dispatch(addExperience({ experience : experienceAdded}))

            Swal.fire({
              icon: 'success',
              title: 'Data successfully updated',
              showConfirmButton: false,
              timer: 1500
            })
  
            this.activeModal.close();
          })

        })

    }
  }

  private formatDate(date:any){
    return new Date(`${date.year}-${date.month}-${date.day}`);
  }

  private loadGroupForm(){
    return this.userForm = this.formBuilder.group({
      company: [this.experience.company, [Validators.required, Validators.max(50)]],
      title: [this.experience.title, [Validators.required, Validators.max(50)]],
      description: [this.experience.description, [Validators.max(300)]],
      startDate: [this.experience.startDate, [Validators.required]],
      endDate: [this.experience.endDate, []],
    });
  }

}
