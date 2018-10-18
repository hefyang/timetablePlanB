import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./_services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {routing} from "./app.routing";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { RegisterComponent } from './register/register.component';
import {RegistrationService} from "./_services/registration.service";
import {FormValidationService} from "./_validators/form-validation.service";
import { SubjectsListComponent } from './subjects-list/subjects-list.component';
import { TimetableComponent } from './timetable/timetable.component';
import { SearchPipe } from './_pipes/search.pipe';
import { DescriptionComponent } from './description/description.component';
import { SectionSelectorComponent } from './section-selector/section-selector.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { CloseBtnComponent } from './close-btn/close-btn.component';
import { SectionFilterPipe } from './_pipes/section-filter.pipe';
import { DayFilterPipe } from './_pipes/day-filter.pipe';
import { TimeSortPipe } from './_pipes/time-sort.pipe';
import {AutofocusModule} from "angular-autofocus-fix";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SubjectsListComponent,
    TimetableComponent,
    SearchPipe,
    DescriptionComponent,
    SectionSelectorComponent,
    NavBarComponent,
    FooterComponent,
    CloseBtnComponent,
    SectionFilterPipe,
    DayFilterPipe,
    TimeSortPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AutofocusModule,
    routing
  ],
  providers: [
    AuthService,
    RegistrationService,
    FormValidationService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
