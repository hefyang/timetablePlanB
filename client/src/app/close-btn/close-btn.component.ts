import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.css']
})
export class CloseBtnComponent {

  constructor(
    private router: Router) { }

  // define the function for close button
  close() {
    this.router
      .navigate([''])
      .then();
  }
}
