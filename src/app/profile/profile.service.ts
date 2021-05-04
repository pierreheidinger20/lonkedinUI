import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';
import { AppConfig } from '../config/app-config';
import { Profile } from './profile.model';


@Injectable({
  providedIn: 'root'
})
export class ProfileService extends AppService {

  controller:string = "profiles";

  constructor(public http: HttpClient,public appConfig:AppConfig) 
  { 
    super(appConfig);
  }


  public getProfile(email:string)
  {
    const endpoint = `${super.getEndPoint()}${this.controller}/${email}`;
    return  this.http.get<Profile>(endpoint);
  }

  public updateProfile(profile:Profile)
  {
    const endpoint = `${super.getEndPoint()}${this.controller}`;
    return  this.http.put<Profile>(endpoint,profile);
  }

}
