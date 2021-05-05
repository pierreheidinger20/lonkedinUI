import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AppConfig } from 'src/app/config/app-config';
import { environment } from 'src/environments/environment';

import { Experience } from './experience.model';


@Injectable({
  providedIn: 'root'
})
export class ExperienceService extends AppService {

  controller:string = "experiences";

  constructor(public http: HttpClient,public appConfig:AppConfig) 
  { 
    super(appConfig);
  }


  public getExperiences(email:string)
  {
    const endpoint = `${super.getEndPoint()}${this.controller}/${email}`;
    return  this.http.get<Experience[]>(endpoint);
  }

  public addExperiences(experience:Experience)
  {
    const endpoint = `${super.getEndPoint()}${this.controller}`;
    return  this.http.post<Experience>(endpoint,experience);
  }

  public updateExperience(experience:Experience)
  {
    const endpoint = `${super.getEndPoint()}${this.controller}`;
    return  this.http.put<Experience>(endpoint,experience);
  }

  public deleteExperience(experience:Experience)
  {
    const endpoint = `${super.getEndPoint()}${this.controller}/${experience._id}`;
    return this.http.delete<Experience>(endpoint);
  }

}
