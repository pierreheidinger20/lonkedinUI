import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { EditExperienceComponent } from './edit-experience/edit-experience.component';
import { addExperiences, deleteExperience } from './experience.action';
import { Experience } from './experience.model';
import { ExperienceService } from './experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  experiences:Experience[] = [];

  constructor(
    private _store:Store<AppState>,
    private _experienceService: ExperienceService,
    private modalService: NgbModal
  ) 
  { 
    this._store.select( state => state.experiences).subscribe(experiences => {
      this.experiences = experiences;
      this.experiences = this.experiences.slice().sort((a,b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    });
  }

  ngOnInit(): void {
  }

  openAddExperience(){
    const modalRef = this.modalService.open(AddExperienceComponent);
  }

  openEditExperience(_id:string)
  {
    const modalRef = this.modalService.open(EditExperienceComponent);
    modalRef.componentInstance.id = _id;
  }
  deleteExperenci(_id:string)
  {
    debugger;
    Swal.fire({
      title: 'Do you want to delete?',
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Don't Delete`,
    }).then((result) => {

      if (result.isConfirmed) {

        var experience = this.experiences.find(x => x._id == _id);
        this._experienceService.deleteExperience(experience ?? new Experience)
          .subscribe(deleted => {
   
              this._store.dispatch(deleteExperience({ experience : experience ?? new Experience }))
              Swal.fire('Deleted!', '', 'success')
            
          })

      } else if (result.isDenied) {

        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }
}
