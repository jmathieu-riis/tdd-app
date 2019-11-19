import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {DialogService} from '../../services/dialog.service';
import {BookingComponent} from '../booking/booking.component';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.less']
})
export class HomesComponent implements OnInit {

  public homes$;

  constructor(private dataService: DataService, private dialogService: DialogService) { }

  ngOnInit() {
    this.homes$ = this.dataService.getHomes$();
  }

  openDialog(home: any) {
    this.dialogService.open(BookingComponent, {
      width: '300px',
      data: {
        home
      }
    });
  }
}
