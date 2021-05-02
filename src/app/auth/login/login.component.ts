import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import * as authActions from '../auth.action';
import { AuthService } from '../auth.service';
import { UserState } from '../userState.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  form = new FormGroup({});

  constructor(
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _store: Store<AppState>,
    private _authService: AuthService
  ) { 

    this._store.select(state => state.auth)
               .subscribe(auth => {
                   debugger;
                   if(auth.isAuthenticated)
                   {
                    this.goToHome();
                   }
               });

  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  async onSubmit(){

    this.submitted = true;

    if (this.form.invalid) {
        return;
    }

    let email = this.form.get("email")?.value;
    let password = this.form.get("password")?.value;

    let user = await this._authService.logIn(email,password);

    if(user)
    {
      this.goToHome();
    }
   
  }

  private async goToHome()
  {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.router.navigateByUrl(returnUrl);
  }

}
