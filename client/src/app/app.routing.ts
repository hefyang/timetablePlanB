import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {DescriptionComponent} from "./description/description.component";
import {TimetableComponent} from "./timetable/timetable.component";
import {SubjectsListComponent} from "./subjects-list/subjects-list.component";
import {SectionSelectorComponent} from "./section-selector/section-selector.component";
import {LoginGuard} from "./_guards/login.guard";
import {LogoutGuard} from "./_guards/logout.guard";

// Set up the routes in the single page application,
// the content has been divide into to outlets: primary and sidebar
// LoginGuard and LogoutGuard are applied on some routes to avoid unauthenticated access
const routes: Routes = [
  {path: '', redirectTo: 'timetable', pathMatch: 'full'},
  {path: '', component: SubjectsListComponent, outlet: 'sidebar', runGuardsAndResolvers: 'always'},
  {path: 'timetable', component: TimetableComponent},
  {path: 'description/:id', component: DescriptionComponent},
  {path: 'selector/:id', component: SectionSelectorComponent, outlet: 'sidebar', canActivate: [LoginGuard]},

  {path: 'login', component: LoginComponent, canActivate: [LogoutGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LogoutGuard]},
  {path: '**', redirectTo: 'timetable', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"});
