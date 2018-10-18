import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SubjectsListComponent } from './subjects-list/subjects-list.component';
import { TimetableComponent } from './timetable/timetable.component';
import { DescriptionComponent } from './description/description.component';
import { SectionSelectorComponent } from './section-selector/section-selector.component';
import { CloseBtnComponent } from './close-btn/close-btn.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {routing} from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    FooterComponent,
    NavBarComponent,
    SubjectsListComponent,
    TimetableComponent,
    DescriptionComponent,
    SectionSelectorComponent,
    CloseBtnComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
