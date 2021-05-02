import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { logout } from '../../auth/auth.action'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  email?:string;

  constructor(
    private _store:Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._store.select(state => state.auth).subscribe(auth => this.email = auth.email )
  }

  public logOut() :void {
    this._store.dispatch(logout());
    this.router.navigateByUrl('/login');
  }

}
