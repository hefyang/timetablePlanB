import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("id_token");

    // insert the id token to the http request header,
    // if a token existed in the localStorage
    if (idToken) {

      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + idToken)
      });

      return next.handle(cloned);
    } else {

      return next.handle(req);
    }
  }
}
