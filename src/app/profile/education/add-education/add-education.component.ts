import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { addEducation } from '../education.action';
import { Education } from '../education.model';
import { EducationService } from '../education.service';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss']
})
export class AddEducationComponent implements OnInit {

  userForm: FormGroup;
  education:Education = new Education
  submit:boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public _educationService : EducationService,
    public _store:Store<AppState>
    ) 
  { 
    this.userForm = this.loadGroupForm();
  }

  get f(){
    return this.userForm.controls;
  }

  ngOnInit(): void {

  }

  onSubmit()
  {
    this.submit = true;

    if(this.userForm.valid)
    {
      this._store.select(state => state.auth).subscribe(auth => {

        let education:Education = this.userForm.value;
        education.email = auth.email ?? "";
        this._educationService.addEducations(education)
            .subscribe(educationAdded =>{

                this._store.dispatch(addEducation({ education : educationAdded}))

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
