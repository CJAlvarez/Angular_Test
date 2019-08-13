import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Components
import { LandingComponent } from './ui/pages/landing/landing.component';
import { NotFoundComponent } from './ui/pages/not-found/not-found.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/components/navbar/navbar.component';
import { PatientsComponent } from './ui/pages/patients/patients.component';

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
    PatientsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
