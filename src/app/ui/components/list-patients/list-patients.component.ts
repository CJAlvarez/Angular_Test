import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/api/patients/patients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {

  patients: any = [];
  order: any;
  skip: any = 0;
  limit = 5;
  count: any;
  more: any;

  constructor(private patientsService: PatientsService) { }

  ngOnInit() {
    this.upload();
  }

  getPatients(order, skip, limit) {
    this.patientsService.getPatients({ order: order, skip: (skip * limit), limit: limit })
      .subscribe(
        res => {
          this.patients = res;
        },
        err => console.error(err)
      );
  }

  deletePatient(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1c9a77',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.patientsService.deletePatient(id).subscribe(
          res => {
            this.upload();
            Swal.fire(
              'Deleted!',
              'The patient has been deleted.',
              'success'
            );
          },
          err => console.error(err)
        );

      }
    })
  }

  getPatientCount() {
    this.patientsService.getPatientCount().subscribe(res => {
      this.count = res[0]['COUNT(*)'];
      if (((this.skip * this.limit) + this.limit) < this.count) {
        this.more = true;
      } else {
        this.more = false;
      }
    },
      err => {
        console.log(err)
      })
  }

  morePatients() {
    this.limit += 5;
    this.upload();
  }


  upload() {
    this.getPatients(this.order, this.skip, this.limit);
    this.getPatientCount();
  }

}
