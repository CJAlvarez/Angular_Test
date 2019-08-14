import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientsService } from './../../../api/patients/patients.service';

@Component({
  selector: 'app-create-patients',
  templateUrl: './create-patients.component.html',
  styleUrls: ['./create-patients.component.css']
})
export class CreatePatientsComponent implements OnInit {


  patientForm: FormGroup;

  patient: any;
  name: any = '';
  age: any = 0;

  constructor(private pf: FormBuilder, private patientsService: PatientsService) {
  }

  ngOnInit() {
    this.patientForm = this.pf.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]]
    });
    this.onChanges();
  }

  onSubmit() {
    this.patient = this.savePatient();
    console.log(this.patientsService.getPatients({}));
    this.patientsService.postPatient(this.patient);
  }

  savePatient() {
    const savePatient = {
      name: this.patientForm.get('name').value,
      age: this.patientForm.get('age').value
    };
    return savePatient;
  }

  onChanges(): void {
    this.patientForm.valueChanges.subscribe(valor => {
    });
  }
}
