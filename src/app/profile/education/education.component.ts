import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { AddEducationComponent } from './add-education/add-education.component';
import { EditEducationComponent } from './edit-education/edit-education.component';
import { deleteEducation } from './education.action';
import { Education } from './education.model';
import { EducationService } from './education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  educations:Education[]= [];
  isAuthenticaded:boolean = false;

  constructor(
    private _store:Store<AppState>,
    private modalService: NgbModal,
    private _educationService: EducationService
    ) 
  {
    this._store.subscribe(state =>{
      this.educations = state.educations;
      this.isAuthenticaded = state.auth.isAuthenticated;
    });
  }

  ngOnInit(): void {
  }

  openAddEducation()
  {
    const modalRef = this.modalService.open(AddEducationComponent);
  }

  deleteEducation(_id:string)
  {
    Swal.fire({
      title: 'Do you want to delete?',
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Don't Delete`,
    }).then((result) => {

      if (result.isConfirmed) {

        var education = this.educations.find(x => x._id == _id);
        this._educationService.deleteEducations(education ?? new Education)
          .subscribe(deleted => {
   
              this._store.dispatch(deleteEducation({ education : education ?? new Education }))
              Swal.fire('Deleted!', '', 'success')
            
          })

      } else if (result.isDenied) {

        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

  editEducation(_id:string){
    const modalRef = this.modalService.open(EditEducationComponent);
    modalRef.componentInstance.id = _id;
  }
}
