import { Pipe, PipeTransform } from '@angular/core';
import {Section} from "../_models/section";

@Pipe({
  name: 'dayFilter'
})
export class DayFilterPipe implements PipeTransform {

  // put section into different groups from mon to fri
  transform(items: Section[], day: string): any {
    if (!items) return [];
    if (!day) return items;
    day = day.toLowerCase();
    return items.filter(it => {
      return day.includes(it.day.toLowerCase());
    });
  }

}
