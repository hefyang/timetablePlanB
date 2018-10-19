import {Component, OnDestroy, OnInit} from '@angular/core';
import {Section} from "../_models/section";
import {TimetableService} from "../_services/timetable.service";
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit, OnDestroy {

  // declare a section array
  // hold the selected section in timetable
  ttSections: Section[];

  // declare and assign a string array of Days
  DAYS: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ];

  // declare a navigation Subscription variable
  navigationSubscription;

  constructor(
    private timetableService: TimetableService,
    private authService: AuthService,
    private router: Router) {

    // subscribe to the router events - storing the subscription so
    // we can unsubscribe later.
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initialise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  // define the initialising function
  initialiseInvites() {

    // query timetable items data
    if (this.authService.isLoggedIn()) {

      // if user logged in, query the timetable items data
      this.timetableService
        .initTimetable(Number(localStorage.getItem('student_id')))
        .subscribe((timetable) => {
          this.ttSections = timetable;
        });
    } else {

      // if user logged out, set the timetable with an empty array
      this.ttSections = [];
    }

    // delete a subject from the timetable
    this.timetableService.deleteEvent
      .subscribe((sections: Section[]) => {
        this.ttSections = this.ttSections.filter(it => {
          return !(it.subjectId == sections[0].subjectId);
        })
      });

    // create or update sections to timetable
    this.timetableService.updateEvent
      .subscribe((sections: Section[]) => {
        this.ttSections = this.ttSections.filter(it => {
          return !(it.subjectId == sections[0].subjectId);
        });
        this.ttSections = this.ttSections.concat(sections);
      })

  }

  // define the functionality for edit button
  editSection(subjectId) {
    this.router
      .navigate([{outlets: {sidebar: ['selector', subjectId]}}])
      .then(() => {
        let editSections: Section[];
        editSections = this.ttSections.filter(it =>  {
          return it.subjectId === subjectId;
        });

        this.timetableService.editEvent.emit(editSections);
      });
  }

  // for ngOnInit, Angular lifecycle
  ngOnInit() {
  }

  // for ngOnDestroy, Angular lifecycle
  ngOnDestroy(): void {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}
