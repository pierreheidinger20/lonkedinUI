import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { addSkill } from '../skill.action';
import { Skill } from '../skill.model';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent implements OnInit {

  userForm: FormGroup;
  skill:Skill = new Skill
  submit:boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public _skillService : SkillService,
    public _store:Store<AppState>) 
  { 
    this.userForm = this.loadGroupForm();
  }

  ngOnInit(): void {

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

        let skill:Skill = this.userForm.value;
        skill.email = auth.email ?? "";
        this._skillService.addSkill(skill)
            .subscribe(skillAdded =>{

                this._store.dispatch(addSkill({ skill : skillAdded}))

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
      name: [this.skill.name, [Validators.required, Validators.max(50)]],
      nivel: ['', [Validators.required]],
    });
  }
}
