import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AppConfig } from 'src/app/config/app-config';
import { environment } from 'src/environments/environment';
import { Skill } from './skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService extends AppService {

  controller:string = "skills";

  constructor(public http: HttpClient,public appConfig:AppConfig) 
  { 
    super(appConfig);
  }


  public getSkills(email:string)
  {
    const endpoint = `${super.getEndPoint()}${this.controller}/${email}`;
    return  this.http.get<Skill[]>(endpoint);
  }

  public addSkill(skill:Skill)
  {
    const endpoint = `${super.getEndPoint()}${this.controller}`;
    return  this.http.post<Skill>(endpoint,skill);
  }

  public updateSkill(skill:Skill)
  {
    const endpoint = `${super.getEndPoint()}${this.controller}`;
    return  this.http.put<Skill>(endpoint,skill);
  }

  public deleteSkill(skill:Skill)
  {
    const endpoint = `${super.getEndPoint()}${this.controller}/${skill._id}`;
    return this.http.delete<Skill>(endpoint);
  }

}
