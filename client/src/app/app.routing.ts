import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {DescriptionComponent} from "./description/description.component";
import {TimetableComponent} from "./timetable/timetable.component";
import {SubjectsListComponent} from "./subjects-list/subjects-list.component";
import {SectionSelectorComponent} from "./section-selector/section-selector.component";

const routes: Routes = [
  {path: '', redirectTo: 'timetable', pathMatch: 'full'},
  {path: '', component: SubjectsListComponent, outlet: 'sidebar', runGuardsAndResolvers: 'always'},
  {path: 'timetable', component: TimetableComponent},
  {path: 'description/:id', component: DescriptionComponent},
  {path: 'selector/:id', component: SectionSelectorComponent, outlet: 'sidebar'},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'timetable', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"});
