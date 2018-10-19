import {Component} from '@angular/core';
import {Section} from "../_models/section";
import {TimetableService} from "../_services/timetable.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TimetableItem} from "../_models/timetable-item";
import * as moment from "moment";
import {extendMoment} from "moment-range";

@Component({
  selector: 'app-section-selector',
  templateUrl: './section-selector.component.html',
  styleUrls: ['./section-selector.component.css']
})
export class SectionSelectorComponent {

  subjectId: number;
  sections: Section[];
  selected: Section[];
  selectedTypes: string[];
  studentId: number;
  filter: string;
  editing: boolean;
  clash: boolean;

  momentRange = extendMoment(moment);

  constructor(
    private timetableService: TimetableService,
    private router: Router,
    private route: ActivatedRoute ) {

    this.initSections();

    this.timetableService.editEvent
      .subscribe((sections) => {
        this.initSections();

        this.selected = sections;

        sections.map(sc => {
          this.selectedTypes.push(sc.type);
        });

        this.filter = this.selectedTypes.join(',');

        this.editing = true;
      })
  }

  private initSections() {

    this.subjectId = this.route.snapshot.params['id'];
    this.studentId = Number(localStorage.getItem('student_id'));

    if (!this.studentId) {
      this.timetableService.getSections(this.subjectId)
        .subscribe(sections => {
          this.sections = sections;
        });
    } else {
      // query the timetable items from server
      this.timetableService.initTimetable(this.studentId).subscribe(items => {

        // query the sections need to be displayed in the selector
        this.timetableService.getSections(this.subjectId)
          .subscribe(sections => {

            // set clash status to the sections
            sections.map(sec => {
              let secStart = moment(sec.day + ' ' + sec.startTime, "dddd HH:mm");
              let secEnd = moment(sec.day + ' ' + sec.endTime, "dddd HH:mm");
              let secRange = this.momentRange.range(secStart, secEnd);
              let clash = false;

              items.forEach(it => {
                let itStart = moment(it.day + ' ' + it.startTime, "dddd HH:mm");
                let itEnd = moment(it.day + ' ' + it.endTime, "dddd HH:mm");
                let itRange = this.momentRange.range(itStart, itEnd);
                if (secRange.overlaps(itRange) && it.id !== sec.id && it.subjectId !== sec.subjectId) clash = true;
              });

              sec.clash = clash;
            });

            this.sections = sections;
          });
      });
    }

    this.selected = [];
    this.selectedTypes = [];
    this.editing = false;

  }

  // define the function for section button to select section
  selectSection(section) {
    if (section.clash) return;
    this.selected.push(section);
    this.selectedTypes.push(section.type);
    this.filter = this.selectedTypes.join(',');
  }

  // define the function for section button to dismiss section
  dismissSection(event, section) {
    event.preventDefault();
    this.selected
      .splice(this.selected.indexOf(section), 1);

    this.selectedTypes
      .splice(this.selectedTypes.indexOf(section.type), 1);

    this.filter = this.selectedTypes.join(',');
  }

  // define the function for add/update button
  updateSections() {
    let items: TimetableItem[] = [];
    this.selected.map((section) => {
      let item: TimetableItem = {
        sectionId: section.id,
        studentId: Number(localStorage.getItem("student_id")),
        subjectId: section.subjectId
      };
      items.push(item);
    });
    this.timetableService.updateSections(items)
      .subscribe(() => {
        this.router
          .navigate(['/'])
          .then(() => {
            this.timetableService.updateEvent.emit(this.selected);
          })
      });
  }

  // define the function for delete button
  deleteSections() {
    let delSubjectId = this.selected[0].subjectId;
    this.timetableService.deleteSections(delSubjectId)
      .subscribe(() => {
        this.router
          .navigate(['/'])
          .then(() => {
            this.timetableService.deleteEvent.emit(this.selected);
          })
      });
  }
}
