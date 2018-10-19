import { Pipe, PipeTransform } from '@angular/core';
import {Subject} from "../_models/subject";
// search for one subject
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: Subject[], searchText: string): any {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.title.toLowerCase().includes(searchText) || it.id.toString().includes(searchText);
    });
  }

}
