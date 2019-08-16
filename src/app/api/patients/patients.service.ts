import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { collectExternalReferences } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  API_URI = 'http://127.0.0.1:8200/api';

  constructor(private http: HttpClient) { }

  getPatientCount() {
    return this.http.get(`${this.API_URI}/get_patientcount?angular=true`);
  }

  getPatients(params) {
    return this.http.get(`${this.API_URI}/get_patients?angular=true${params.order ? `&order=${params.order}` : ''}${params.limit ? `&limit=${params.limit}` : ''}${params.skip ? `&skip=${params.skip}` : ''}`);
  }

  deletePatient(id: string) {
    return this.http.delete(`${this.API_URI}/delete_patient?angular=true&id=${id}`);
  }

  insertPatient(patient: any) {
    return this.http.post(`${this.API_URI}/insert_patient`, patient);
  }


}