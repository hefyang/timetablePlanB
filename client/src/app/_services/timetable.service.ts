import {EventEmitter, Injectable} from '@angular/core';
import {Section} from "../_models/section";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subject} from "../_models/subject";
import {TimetableItem} from "../_models/timetable-item";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  public updateEvent: EventEmitter<Section[]> = new EventEmitter();
  public editEvent: EventEmitter<Section[]> = new EventEmitter();
  public deleteEvent: EventEmitter<Section[]> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  public initTimetable(studentId: number): Observable<Section[]> {
    return this.http.get<Section[]>(`/api/timetable/${studentId}`);
  }

  public getSubjects(studentId: number) :Observable<Subject[]> {
    if (this.authService.isLoggedIn()) {
      return this.http.get<Subject[]>(`/api/subjects/${studentId}`);
    }
    return this.http.get<Subject[]>(`/api/subjects`);
  }

  public getSubject(subjectId: number) : Observable<Subject> {
    return this.http.get<Subject>(`/api/subject/${subjectId}`)
  }

  public getSubjectCount(studentId: number) : Observable<{[key:string]: number}> {
    return this.http.get<{[key:string]: number}>(`/api/subject/${studentId}/count`);
  }

  public getSections(subjectId: number) :Observable<Section[]> {
    return this.http.get<Section[]>(`/api/sections/${subjectId}`);
  }

  public updateSections(items: TimetableItem[]) : Observable<any> {
    return this.http.put<TimetableItem[]>('/api/timetable/', items);
  }

  public deleteSections(subjectId: number) : Observable<any> {
    return this.http.delete(`/api/timetable/${subjectId}` );
  }
}
