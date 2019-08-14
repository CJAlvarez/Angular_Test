import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  getURL = 'https://127.0.0.1:8200/api/get_patients';

  constructor(private http: Http) { }

  postPatient(patient: any) {
    console.log(patient);
  }

  getPatients(params) {
    return this.http.get(`${this.getURL}?${params.order ? `order=${params.order}` : ''}${params.limit ? `?limit=${params.limit}` : ''}${params.skip ? `?skip=${params.skip}` : ''}`)
      .map(res => res.json());
  }
}
