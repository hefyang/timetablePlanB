import {AfterContentChecked, Component} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements AfterContentChecked {

  isLoggedIn: boolean;

  constructor(public authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
  }

  ngAfterContentChecked(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (!this.isLoggedIn) this.authService.logout();
  }

}
