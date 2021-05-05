import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { setEducation } from '../education.action';
import { Education } from '../education.model';
import { EducationService } from '../education.service';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.scss']
})
export class EditEducationComponent implements OnInit {

  @Input() public id:any;
  userForm: FormGroup = new FormGroup({});
  education:Education = new Education;
  submit:boolean = false;

  constructor(
    private _store:Store<AppState>,
    public formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private _educationService:EducationService
  ) { }

  ngOnInit(): void {
    
      this._store.select(state => state.educations)
        .subscribe(educations => {
          this.education = educations.find(x => x._id == this.id) ?? new Education;
          this.userForm = this.loadGroupForm();
        })
  }

  get f(){
    return this.userForm.controls;
  }
  onSubmit()
  {
    this.submit = true;

    if(this.userForm.valid)
    {
      this._store.select(state => state.auth).subscribe(auth => {

        let education:Education = this.userForm.value;

        education._id = this.id;
        education.email = auth.email ?? "";

        this._educationService.updateEducations(education)
            .subscribe(educationUpdated =>{
                debugger;
                this._store.dispatch(setEducation({ education : education}))

                Swal.fire({
                  icon: 'success',
                  title: 'Data successfully updated',
                  showConfirmButton: false,
                  timer: 1500
                })
      
                this.activeModal.close();

        });

      });
       
    }
    
  }
  private loadGroupForm()
  {
    return this.userForm = this.formBuilder.group({
      school: [this.education.school, [Validators.required, Validators.max(50)]],
      degree: [this.education.degree, [Validators.required, Validators.max(50)]],
      credentialUrl: [this.education.credentialUrl, [Validators.max(300)]]
    });
  }

}
