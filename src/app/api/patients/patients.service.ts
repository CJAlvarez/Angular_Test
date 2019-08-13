import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  postPatient(patient: any) {
    console.log(patient);
  }

  constructor() { }
}
