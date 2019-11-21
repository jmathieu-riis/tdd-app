import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import * as moment from 'moment';
import {DataService} from '../../services/data.service';
import {Subscription} from 'rxjs';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.less']
})
export class BookingComponent implements OnInit, OnDestroy {
  checkinDate: string;
  checkoutDate: string;
  private mySub: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService,
              private dialogService: DialogService) { }

  ngOnInit() {
    // console.log(this.data);
  }

  ngOnDestroy(): void {
    this.mySub.unsubscribe();
  }

  calculateTotal() {
    const checkinMoment = moment(this.checkinDate, 'YYYY-MM-DD');
    const checkoutMoment = moment(this.checkoutDate, 'YYYY-MM-DD');
    const days = checkoutMoment.diff(checkinMoment, 'days');
    return days <= 0 || isNaN(days) ? 0 : days * this.data.home.price;
  }

  onBookHome() {
    this.mySub = this.dataService.bookHome$().subscribe();
    this.dialogService.close(this);
  }
}
