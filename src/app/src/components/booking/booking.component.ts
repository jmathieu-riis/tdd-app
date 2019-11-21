import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.less']
})
export class BookingComponent implements OnInit {
  checkinDate: string;
  checkoutDate: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // console.log(this.data);
  }

  calculateTotal(checkIn, checkOut) {
    const checkinMoment = moment(checkIn, 'YYYY-MM-DD');
    const checkoutMoment = moment(checkOut, 'YYYY-MM-DD');
    const days = checkoutMoment.diff(checkinMoment, 'days');
    return days <= 0 || isNaN(days) ? 0 : days * this.data.home.price;
  }

}
