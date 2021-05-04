import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AppConfig } from './config/app-config';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  configUrl = 'assets/config/config.json';

  constructor(public appConfig:AppConfig)
  { }

  getEndPoint() {
    return this.appConfig.lonkedinapi;
  }
  
}
