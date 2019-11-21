import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookingComponent} from './booking.component';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {spyOnClass} from 'jasmine-es6-spies/dist';
import {of} from 'rxjs';
import {DialogService} from '../../services/dialog.service';

describe('BookingComponent (shows dialog of booking data per home)', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let dialogData;
  let dataService: jasmine.SpyObj<DataService>;
  let dialogService: jasmine.SpyObj<DialogService>;

  const el = (selector) => {
    return fixture.nativeElement.querySelector(selector);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ BookingComponent ],
      providers: [
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        },
        {
          provide: DataService, useFactory: () => spyOnClass(DataService)
        },
        {
          provide: DialogService, useFactory: () => spyOnClass(DialogService)
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComponent);
    dataService = TestBed.get(DataService);
    dialogService = TestBed.get(DialogService);
    dialogData = TestBed.get(MAT_DIALOG_DATA);
    component = fixture.componentInstance;
    const mockHomes = require('../../../../assets/homes.json');
    dialogData.home = mockHomes[0];
    fixture.detectChanges();
  });

  it('should show title', () => {
    expect(el('[data-test="title"]').textContent).toContain('Book Home 1');
  });

  it('should show price', () => {
    expect(el('[data-test="price"]').textContent).toContain('$125 per night');
  });

  it('should show check in date input', () => {
    expect(el('input#checkin')).toBeTruthy();
    expect(el('label[for="checkin"]')).toBeTruthy();
  });

  it('should show check out date input', () => {
    expect(el('input#checkout')).toBeTruthy();
    expect(el('label[for="checkout"]')).toBeTruthy();
  });

  it('should show book button', () => {
    expect(el('button#book')).toBeTruthy();
    expect(el('button#book').textContent).toEqual('Book');
  });

  // SUCCESSFUL TEST
  it('should show total price (working version)', async(() => {
    // user enters a check-in date: i.e. 12/20/19
    component.checkinDate = '2019-12-20';
    fixture.detectChanges();

    // user enters a check-out date: i.e. 12/23/19
    component.checkoutDate = '2019-12-23';
    fixture.detectChanges();

    const totalElement = el('[data-test="total"]');
    // Confirm total is $375
    expect(totalElement.textContent).toContain('$375');
  }));

  fit('should show total price (non-functional version)', async(() => {
    const checkin = el('input#checkin');
    const checkout = el('input#checkout');

    // user enters a check-in date: i.e. 12/20/19
    checkin.value = '2019/12/20';
    checkin.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // user enters a check-out date: i.e. 12/23/19
    checkout.value = '2019/12/23';
    checkout.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      console.log(fixture.nativeElement);
    });

    const totalElement = el('[data-test="total"]');
    // Confirm total is $375
    expect(totalElement.textContent).toContain('$375');
  });

  // In Progress
  it('should book home after clicking book button', () => {
    // have spy make bookHome$ return `of(null)`
    dataService.bookHome$.and.returnValue(of(null));

    // user enters a check-in date: i.e. 12/20/19
    component.checkinDate = '2019-12-20';
    fixture.detectChanges();

    // user enters a check-out date: i.e. 12/23/19
    component.checkoutDate = '2019-12-23';
    fixture.detectChanges();

    const bookBtn  = el('button#book');
    bookBtn.click();

    // assert that the data service booked the home
    expect(dataService.bookHome$).toHaveBeenCalled();
  });

  fit('should close dialog and shoot notification after clicking book button', () => {
    // have spy make bookHome$ return `of(null)`
    dataService.bookHome$.and.returnValue(of(null));

    // user enters a check-in date: i.e. 12/20/19
    component.checkinDate = '2019-12-20';
    fixture.detectChanges();

    // user enters a check-out date: i.e. 12/23/19
    component.checkoutDate = '2019-12-23';
    fixture.detectChanges();

    // user clicks button
    const bookBtn  = el('button#book');
    bookBtn.click();

    // assert that the dialog close function to be called
    expect(dialogService.close).toHaveBeenCalled();
  });

});
