import {AfterContentChecked, Component} from '@angular/core';
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements AfterContentChecked {

  isLoggedIn: boolean;

  constructor(public authService: AuthService) { }

  // define the function for logout button
  logout() {
    this.authService.logout();
  }

  // for ngAfterContentChecked, Angular lifecycle
  ngAfterContentChecked(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (!this.isLoggedIn) this.authService.logout();
  }

}
