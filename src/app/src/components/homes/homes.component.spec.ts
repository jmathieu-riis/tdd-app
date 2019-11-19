import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { spyOnClass } from 'jasmine-es6-spies';
import { HomesComponent } from './homes.component';
import {DataService} from '../../services/data.service';
import {of} from 'rxjs';
import {DialogService} from '../../services/dialog.service';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let dialogService: jasmine.SpyObj<DialogService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesComponent ],
      providers: [
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
    dataService = TestBed.get(DataService);
    dialogService = TestBed.get(DialogService);
    const mockHomes = require('../../../../assets/homes.json');
    dataService.getHomes$.and.returnValue(of(mockHomes));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show homes', () => {
    expect(fixture.nativeElement.querySelectorAll('[data-test="home"]').length).toBe(3);
  });

  it('should show home info', () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"]');
    expect(home.querySelector('[data-test="title"]').innerText).toEqual('Home 1');
    expect(home.querySelector('[data-test="location"]').innerText).toEqual('new york');
    expect(home.querySelector('[data-test="image"]')).toBeTruthy();
  });

  it('should show book button', () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"]');
    expect(home.querySelector('[data-test="book-btn"]').innerText).toBeTruthy();
  });

  it('should use dialog service to open a dialog when clicking the book button', () => {

    // Grab the button to click
    const bookBtn = fixture.nativeElement.querySelector('[data-test="home"] [data-test="book-btn"] button');
    // Click the button
    bookBtn.click();
    // Assert that the dialog service was called to open a dialog
    expect(dialogService.open).toHaveBeenCalled();
  });
});
