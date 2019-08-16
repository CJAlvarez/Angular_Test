import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientsService } from './../../../api/patients/patients.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-patients',
  templateUrl: './create-patients.component.html',
  styleUrls: ['./create-patients.component.css']
})
export class CreatePatientsComponent implements OnInit {

  patientForm: FormGroup;

  patient: any;
  firstname: any = '';
  lastname: any = '';
  id: any = '';
  age: any = 0;
  gender: any = 0;
  phone: any = 0;
  email: any = 0;

  constructor(private pf: FormBuilder, private patientsService: PatientsService) {
  }

  ngOnInit() {
    this.patientForm = this.pf.group({
      firstname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      lastname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      id: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      age: ['', [Validators.required, Validators.min(0), Validators.maxLength(3)]],
      gender: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]]
    });
  }

  onSubmit() {
    this.patient = this.insertPatient();
  }

  insertPatient() {
    const insertPatient = {
      firstname: this.patientForm.get('firstname').value,
      lastname: this.patientForm.get('lastname').value,
      id: this.patientForm.get('id').value,
      age: this.patientForm.get('age').value,
      gender: this.patientForm.get('gender').value,
      phone: this.patientForm.get('phone').value,
      email: this.patientForm.get('email').value,
      createdAt: new Date().toISOString()
    };
    this.patientsService.insertPatient(insertPatient).subscribe(
      res => {
        Swal.fire(
          'Inserted!',
          'The patient has been inserted.',
          'success'
        );
        this.patientForm.reset();
      },
      err => {
        Swal.fire(
          'Sorry! You have errors',
          err.error.errors.map(value => value.message.split(': ')[1]).join(', '),
          'error'
        );
        console.log(err);
      }
    );
  }

}
