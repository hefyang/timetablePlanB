import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";
import {Section} from "../_models/section";

@Pipe({
  name: 'timeSort'
})
export class TimeSortPipe implements PipeTransform {

  transform(items: Section[]): any {
    if (!items) return [];
    return items.sort(this.compareFn);
  }

  private compareFn(it1: Section, it2: Section) {
    let it1Start = moment(it1.startTime, "HH:mm");
    let it2Start = moment(it2.startTime, "HH:mm");
    if (moment.max(it1Start, it2Start) == it1Start) return 1;
    return -1;
  }

}
