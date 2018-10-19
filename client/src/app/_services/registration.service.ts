import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../_models/student";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  // define the validation service function to connect api/user/ API in the server end
  public validateStudentId(studentId: string): Observable<any> {
    return this.http.get<{[key:string]: boolean}>(`api/user/${studentId}`);
  }

  // define the register service function to connect api/user/register API in the server end
  public register(student: Student) {
    return this.http.post<{[key:string]: boolean}>('api/user/register', student)
  }
}
