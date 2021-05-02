import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { UserState } from './userState.model';
import { filter } from 'rxjs/operators';

import * as authActions from './auth.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public _angularFireAuth:AngularFireAuth,
    private store:Store<AppState>
  ) 
  { }


  public async logIn(email:string,password:string)
  {
    try{

      const { user }  = await this._angularFireAuth.signInWithEmailAndPassword(email,password);

      if(user)
      {
        let userState = new UserState();
        userState.email = email;
        this.store.dispatch(authActions.login({ userState: userState}));
      }
      
      return user;

    }catch(err)
    {
      console.log(err);
    }

    return null;
  }
}
