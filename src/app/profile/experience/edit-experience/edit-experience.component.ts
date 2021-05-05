import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Experience } from '../experience.model';
import { formatDate } from '@angular/common';
import { ExperienceService } from '../experience.service';
import { addExperience , setExperience } from '../experience.action';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.scss']
})
export class EditExperienceComponent implements OnInit {

  @Input() public id:any;
  userForm: FormGroup = new FormGroup({});
  experience:Experience = new Experience;
  submit:boolean = false;
  startDate:string = "";

  constructor(
    private _store:Store<AppState>,
    public formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private _experiencesService:ExperienceService,
    ) 
  { 
  }

  get f(){
    return this.userForm.controls;
  }

  ngOnInit(): void {
   
    this._store.select(state => state.experiences)
    .subscribe(experiences =>{
      this.experience = experiences.find(x => x._id == this.id) ?? new Experience;
      this.userForm = this.loadGroupForm();
    } );
  
  
  }


  onSubmit(){
    debugger;
    this.submit = true;
    Object.keys(this.userForm.controls).forEach(key => {
      // Get errors of every form control
      console.log(this.userForm.get(key)?.errors);
    });

    // this.userForm.controls.endDate = new Date();

    if(this.userForm.valid)
    {
      let valueForm = this.userForm.value;

      var experience = new Experience();
      experience._id = this.id;
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

          this._experiencesService.updateExperience(experience)
          .subscribe(experienceUpdated =>{
            debugger;
            this._store.dispatch(setExperience({ experience : experienceUpdated}))

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
    var control = this.userForm = this.formBuilder.group({
      company: [this.experience.company, [Validators.required, Validators.max(50)]],
      title: [this.experience.title, [Validators.required, Validators.max(50)]],
      description: [this.experience.description, [Validators.max(300)]],
      startDate: 
      [
        {
          day: new Date(this.experience.startDate).getDay(), 
          month:new Date(this.experience.startDate).getMonth() + 1, 
          year:new Date(this.experience.startDate).getFullYear(),
        }, [Validators.required]]
    });
    debugger;
    if(this.experience.endDate)
    {
      control.addControl('endDate', new FormControl({
        day: new Date(this.experience.endDate).getDay(), 
        month:new Date(this.experience.endDate).getMonth() + 1, 
        year:new Date(this.experience.endDate).getFullYear(),
      },[]));
    }else
    {
      control.addControl('endDate', new FormControl('',[]));
    }


    return control;
  }
}
