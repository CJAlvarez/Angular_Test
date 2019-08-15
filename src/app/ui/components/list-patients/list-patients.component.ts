import { Component, OnInit, HostBinding } from '@angular/core';
import { PatientsService } from 'src/app/api/patients/patients.service';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {

  patients: any = [];
  order: any;
  skip: any = 1;
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



}
