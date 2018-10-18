import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {TimetableService} from "../_services/timetable.service";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit, OnDestroy {
  subjectId: number;
  subjectTitle: string;
  subjectInfo: string;

  // ... your class variables here
  navigationSubscription;

  constructor(
    private route: ActivatedRoute,
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

    this.subjectId = this.route.snapshot.params['id'];
    this.timetableService.getSubject(this.subjectId)
      .subscribe(subject => {
        this.subjectTitle = subject.title;
        this.subjectInfo = subject.info;
        document.getElementById("description")
          .innerHTML = this.subjectInfo;
      });
  }


  ngOnInit(): void {

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
