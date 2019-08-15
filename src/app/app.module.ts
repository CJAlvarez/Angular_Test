import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Routing
import { routing } from './app.routing';

// Components
import { LandingComponent } from './ui/pages/landing/landing.component';
import { NotFoundComponent } from './ui/pages/not-found/not-found.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/components/navbar/navbar.component';
import { PatientsComponent } from './ui/pages/patients/patients.component';
import { ListPatientsComponent } from './ui/components/list-patients/list-patients.component';
import { CreatePatientsComponent } from './ui/components/create-patients/create-patients.component';

// Layouts
import { PatientsLayoutComponent } from './ui/layouts/patients-layout/patients-layout.component';

// Services
import { PatientsService } from './api/patients/patients.service';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NotFoundComponent,
    NavbarComponent,
    PatientsComponent,
    ListPatientsComponent,
    CreatePatientsComponent,
    PatientsLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    routing
  ],
  providers: [
    PatientsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
