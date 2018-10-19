import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../_models/student";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  public validateStudentId(studentId: string): Observable<any> {
    return this.http.get<{[key:string]: boolean}>(`api/user/${studentId}`);
  }

  public register(student: Student) {
    return this.http.post<{[key:string]: boolean}>('api/user/register', student)
  }
}
