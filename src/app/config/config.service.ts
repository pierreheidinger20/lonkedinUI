import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class JsonAppConfigService extends AppConfig {

  configUrl = 'assets/config/config.json';

  constructor(private http: HttpClient) {
    super();
  }

  // This function needs to return a promise
  load() {
    return this.http.get<AppConfig>(this.configUrl)
      .toPromise()
      .then(data => {
        this.lonkedinapi = data.lonkedinapi;
      })
      .catch(() => {
        console.error('Could not load configuration');
      });
  }
}