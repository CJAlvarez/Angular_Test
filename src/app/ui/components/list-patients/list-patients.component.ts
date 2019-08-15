import { Component, OnInit   } from '@angular/core';
import { PatientsService } from 'src/app/api/patients/patients.service';
import Swal from 'sweetalert2'

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

  constructor(private patientsService: PatientsService) { }

  ngOnInit() {
    this.getPatients(this.order, this.skip, this.limit);
  }

  getPatients(order, skip, limit) {
    this.patientsService.getPatients({ order: order, skip: skip, limit: limit })
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
            this.getPatients(this.order, this.skip, this.limit);
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          },
          err => console.error(err)
        );

      }
    })
  }

}
