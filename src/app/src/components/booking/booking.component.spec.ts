import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookingComponent} from './booking.component';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormsModule} from '@angular/forms';

describe('BookingComponent (shows dialog of booking data per home)', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let dialogData;

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
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComponent);
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

  it('should show total price', async(() => {
    // user enters a check-in date: i.e. 12/20/19
    component.checkinDate = '2019/12/20';
    fixture.detectChanges();

    // user enters a check-out date: i.e. 12/23/19
    component.checkoutDate = '2019/12/23';
    fixture.detectChanges();

    const totalElement = el('[data-test="total"]');
    // Confirm total is $375
    expect(totalElement.textContent).toContain('$375');
  }));

  xit('should book home after clicking book button', () => {
    // user enters a check-in date: i.e. 12/20/19
    const checkin = el('input#checkin[type="date"]');
    component.checkinDate = '12/20/19';
    checkin.value = '12/20/19';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      console.log('Stable');
      checkin.dispatchEvent(new Event('input')); }
    );

    // user enters a check-out date: i.e. 12/23/19
    const checkout = el('input#checkout[type="date"]');
    component.checkoutDate = '12/23/19';
    checkout.value = '12/23/19';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      console.log('Stable');
      checkout.dispatchEvent(new Event('input'));
    });

    fixture.detectChanges();
  });

});
