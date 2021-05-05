import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { deleteSkill } from './skill.action';
import { Skill } from './skill.model';
import { SkillService } from './skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  skills:Skill[] = [];
  isAuthenticaded:boolean = false;

  constructor(
    private _store:Store<AppState>,
    private modalService: NgbModal,
    private _skillService:SkillService) 
  { 
    this._store.subscribe(state =>{
      this.skills = state.skills;
      this.isAuthenticaded = state.auth.isAuthenticated;
    });
  }

  ngOnInit(): void {
  }

  openAddSkill()
  {
    const modalRef = this.modalService.open(AddSkillComponent);
  }
  deleteSkill(_id:string)
  {

    Swal.fire({
      title: 'Do you want to delete?',
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Don't Delete`,
    }).then((result) => {

      if (result.isConfirmed) {

        var skill = this.skills.find(x => x._id == _id);
        this._skillService.deleteSkill(skill ?? new Skill)
          .subscribe(deleted => {
   
              this._store.dispatch(deleteSkill({ skill : skill ?? new Skill }))
              Swal.fire('Deleted!', '', 'success')
            
          })

      } else if (result.isDenied) {

        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
