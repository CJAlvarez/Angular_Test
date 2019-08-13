import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  greet: String;

  constructor() { }

  ngOnInit() {

    // Set Greet
    const date = new Date();
    if (date.getHours() > 19) {
      this.greet = 'Good evening';
    } else if (date.getHours() > 12) {
      this.greet = 'Good afternoon';
    } else {
      this.greet = 'Good morning';
    }

  }

  isDay = () => new Date().getHours() < 18.;

}
