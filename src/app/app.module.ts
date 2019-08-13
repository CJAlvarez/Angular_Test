import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 


// Components
import { LandingComponent } from './ui/pages/landing/landing.component';
import { NotFoundComponent } from './ui/pages/not-found/not-found.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/components/navbar/navbar.component';
import { PatientsComponent } from './ui/pages/patients/patients.component';
import { PatientManageButtonsComponent } from './ui/components/patient-manage-buttons/patient-manage-buttons.component';
import { ListPatientsComponent } from './ui/components/list-patients/list-patients.component';
import { CreatePatientsComponent } from './ui/components/create-patients/create-patients.component';

// Services
import { PatientsService } from './api/patients/patients.service';

// Routing
const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'patients', component: PatientsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NotFoundComponent,
    NavbarComponent,
    PatientsComponent,
    PatientManageButtonsComponent,
    ListPatientsComponent,
    CreatePatientsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PatientsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
