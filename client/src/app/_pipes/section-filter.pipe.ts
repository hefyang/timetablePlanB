import { Pipe, PipeTransform } from '@angular/core';
import {Section} from "../_models/section";

@Pipe({
  name: 'filter'
})
export class SectionFilterPipe implements PipeTransform {

  //filter the section which is not the type specified
  transform(items: Section[], types: string): any {
    if (!items) return [];
    if (!types) return items;
    types = types.toLowerCase();
    return items.filter(it => {
      return !types.includes(it.type.toLowerCase());
    });
  }

}
