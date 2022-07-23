import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error) {
          const errors = error?.error?.errors;
          switch (error.status) {
            case 400:
              if (errors) {
                const modalStateErrors = [];
                for (const key in errors) {
                  if (errors[key]) {
                    modalStateErrors.push(errors[key]);
                  }
                }
                throw modalStateErrors.flat();
              }
              else {
                this.toastr.error(error.statusText, error.status)
              }
              break;
            case 401:
              console.log("401 eeror")
              this.toastr.error(error.statusText, error.status);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state: { error: error.error } };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(error)
              break;
          }
        }
        return throwError(() => new Error(error));
      })

    );
  }
}
