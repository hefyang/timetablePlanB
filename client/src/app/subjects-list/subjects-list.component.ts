import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "../_models/subject";
import {NavigationEnd, Router} from "@angular/router";
import {TimetableService} from "../_services/timetable.service";
import {AuthService} from "../_services/auth.service";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.css']
})
export class SubjectsListComponent implements OnInit, OnDestroy {

  subjects: Subject[];
  searchText: string = '';
  isLoggedIn: boolean;
  studentId: number;
  subjectCount: number;

  // ... your class variables here
  navigationSubscription;

  constructor(
    private router: Router,
    private timetableService: TimetableService,
    public authService: AuthService) {

    // subscribe to the router events - storing the subscription so
    // we can unsubscribe later.
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.studentId = Number(localStorage.getItem("student_id")) || null;

    if (this.authService.isLoggedIn()) {
      this.timetableService.getSubjectCount(this.studentId)
        .subscribe(count => {
          this.subjectCount = count.count;
        });
    } else {
      this.subjectCount = 0;
    }

    this.timetableService.getSubjects(this.studentId)
      .subscribe((subjects) => {
        this.subjects = subjects;
      });

    this.isLoggedIn = this.authService.isLoggedIn();
  }

  enroll(event, id) {
    event.stopPropagation();
    event.preventDefault();
    this.router
      .navigate(['/',{outlets: {primary: 'timetable', sidebar: ['selector', id]}}])
      .then(() => { });
  }

  ngOnDestroy(): void {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

}
