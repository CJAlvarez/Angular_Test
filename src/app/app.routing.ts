import { Routes, RouterModule } from '@angular/router';

// Components
import { LandingComponent } from './ui/pages/landing/landing.component';
import { NotFoundComponent } from './ui/pages/not-found/not-found.component';
import { NavbarComponent } from './ui/components/navbar/navbar.component';
import { PatientsComponent } from './ui/pages/patients/patients.component';
import { ListPatientsComponent } from './ui/components/list-patients/list-patients.component';
import { CreatePatientsComponent } from './ui/components/create-patients/create-patients.component';

// Layouts
import { PatientsLayoutComponent } from './ui/layouts/patients-layout/patients-layout.component';


// Routing
const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'patients', component: PatientsComponent },
    {
      path: 'patients',
      component: PatientsLayoutComponent,
      children: [
        { path: 'createPatients', component: CreatePatientsComponent },
        { path: 'listPatients', component: ListPatientsComponent }
      ]
    },
    { path: '**', component: NotFoundComponent }
  ];
  
  
export const routing = RouterModule.forRoot(routes);