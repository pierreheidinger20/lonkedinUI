import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { map, take ,tap} from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  authenticated:boolean = false;

  constructor(private _authService:AuthService,
              private _store:Store<AppState>,
              private route: ActivatedRoute,
              private router: Router,)
  {
    this._store.select(state => state.auth)
        .subscribe(auth => this.authenticated = auth.isAuthenticated);
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticated();
  }
  
  private isAuthenticated() {
    if (!this.authenticated) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
      this.router.navigateByUrl(returnUrl);
    }
    return this.authenticated;
  }

}
