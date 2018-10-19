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

  // define the login function to connect to /api/user/login API in the server end
  login(studentId:number, password:string) {
    return this.http.post<{[key:string]: any}>('/api/user/login', {studentId, password})
      .do(res => AuthService.setSession(res))
      .shareReplay();
  }

  // set up session with the data responded from login request
  private static setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'minutes');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("student_id", authResult.studentId);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()))
  }

  // define a logout function to remove the data stored in the localStorage
  public logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("student_id");
    localStorage.removeItem("expires_at");
  }

  // define a function to check whether a user logged in
  public isLoggedIn() {
    return moment().isBefore(AuthService.getExpiration());
  }

  // define a function to check whether the user logged out
  public isLoggedOut() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return !moment(expiresAt).isValid();
  }

  // define a private function to retrieve expired time stored in localStorage
  private static getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
