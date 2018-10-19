import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import * as moment from "moment";
import 'rxjs/add/operator/do';
import "rxjs-compat/add/operator/shareReplay";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http:HttpClient) { }

  login(studentId:number, password:string) {
    return this.http.post<{[key:string]: any}>('/api/user/login', {studentId, password})
      .do(res => AuthService.setSession(res))
      .shareReplay();
  }

  private static setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'minutes');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("student_id", authResult.studentId);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()))
  }

  public logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("student_id");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(AuthService.getExpiration());
  }

  public isLoggedOut() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return !moment(expiresAt).isValid();
  }

  private static getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
