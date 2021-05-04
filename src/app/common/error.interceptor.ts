import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import Swal from 'sweetalert2'


export class ErrorIntercept implements HttpInterceptor {

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                    }
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: errorMessage
                      })
                    return throwError(errorMessage);
                })
            )
    }
}