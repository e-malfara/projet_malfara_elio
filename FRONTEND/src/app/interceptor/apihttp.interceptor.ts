import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

  jwtToken: string = "";

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.jwtToken !== "") {
      request = request.clone({setHeaders: {Authorization: `Bearer ${this.jwtToken}` }});
    }

    return next.handle(request).pipe(tap(
      (evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            let tab : Array<string>;
            let headerAuthorization = evt.headers.get("Authorization");
            if (headerAuthorization != null ) {
              tab = headerAuthorization.split(/Bearer\s+(.*)$/i);
              if (tab.length > 1) this.jwtToken = tab[1];
            }
          }
        }
      )
    );
  }
}
