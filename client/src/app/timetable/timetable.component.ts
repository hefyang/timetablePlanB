import {Component, OnDestroy, OnInit} from '@angular/core';
import {Section} from "../_models/section";
import {TimetableService} from "../_services/timetable.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit, OnDestroy {

  ttSections: Section[];

  DAYS: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ];

  // ... your class variables here
  navigationSubscription;

  constructor(
    private timetableService: TimetableService,
    private router: Router) {

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
    this.timetableService
      .initTimetable(Number(localStorage.getItem('student_id')))
      .subscribe((timetable) => {
        this.ttSections = timetable;
      });

    this.timetableService.deleteEvent
      .subscribe((sections: Section[]) => {
        this.ttSections = this.ttSections.filter(it => {
          return !(it.subjectId == sections[0].subjectId);
        })
      });

    this.timetableService.updateEvent
      .subscribe((sections: Section[]) => {
        this.ttSections = this.ttSections.filter(it => {
          return !(it.subjectId == sections[0].subjectId);
        });
        this.ttSections = this.ttSections.concat(sections);
      })

  }

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

  ngOnInit() {
  }

  ngOnDestroy(): void {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}
