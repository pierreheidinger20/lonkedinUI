import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AppConfig } from 'src/app/config/app-config';
import { environment } from 'src/environments/environment';
import { Education } from './education.model';


@Injectable({
  providedIn: 'root'
})
export class EducationService extends AppService {

  controller:string = "educations";

  constructor(public http: HttpClient,public appConfig:AppConfig) 
  { 
    super(appConfig);
  }


  public getEducations(email:string)
  {
    const endpoint = `${super.getEndPoint()}${this.controller}/${email}`;
    return  this.http.get<Education[]>(endpoint);
  }

  public addEducations(education:Education)
  {
    const endpoint = `${super.getEndPoint()}${this.controller}`;
    return  this.http.post<Education>(endpoint,education);
  }

  public updateEducations(education:Education)
  {
    const endpoint = `${super.getEndPoint()}${this.controller}`;
    return  this.http.put<Education>(endpoint,education);
  }

  public deleteEducations(experience:Education)
  {
    const endpoint = `${super.getEndPoint()}${this.controller}/${experience._id}`;
    return this.http.delete<Education>(endpoint);
  }

}
