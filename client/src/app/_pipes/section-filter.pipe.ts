import { Pipe, PipeTransform } from '@angular/core';
import {Section} from "../_models/section";
//pipe, select the section available
@Pipe({
  name: 'filter'
})
export class SectionFilterPipe implements PipeTransform {

  transform(items: Section[], types: string): any {
    if (!items) return [];
    if (!types) return items;
    types = types.toLowerCase();
    return items.filter(it => {
      return !types.includes(it.type.toLowerCase());
    });
  }

}
