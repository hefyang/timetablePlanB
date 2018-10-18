import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.css']
})
export class CloseBtnComponent implements OnInit {

  constructor(
    private router: Router) { }

  close() {
    this.router
      .navigate([''])
      .then();
  }

  ngOnInit() {
  }

}
