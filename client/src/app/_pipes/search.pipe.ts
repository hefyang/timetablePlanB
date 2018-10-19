import { Pipe, PipeTransform } from '@angular/core';
import {Subject} from "../_models/subject";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // search for one subject based on the entered characters in search box
  transform(items: Subject[], searchText: string): any {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.title.toLowerCase().includes(searchText) || it.id.toString().includes(searchText);
    });
  }

}
