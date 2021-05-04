
import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {  
    
    token?:string;

    constructor(private _store:Store<AppState>) {
        this._store.select(state => state.auth).subscribe(auth => this.token = auth.token );
    }  

    intercept(request: HttpRequest<any>, 
            next: HttpHandler): Observable<HttpEvent<any>> {
        
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.token}`
            }
        });    return next.handle(request);
    }
}