import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

describe('DataService', () => {
  let http: HttpClient;
  let dataService: DataService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should return a list of homes', () => {
    http = TestBed.get(HttpClient);
    // Mock up dat data
    const mockHomes = [{
        title: 'Home 1',
        image: 'assets/listing.png',
        location: 'new york'
      },
        {
          title: 'Home 2',
          image: 'assets/listing.png',
          location: 'detroit'
        },
        {
          title: 'Home 3',
          image: 'assets/listing.png',
          location: 'los angles'
        }];
    spyOn(http, 'get').and.returnValue(of(mockHomes));
    dataService = TestBed.get(DataService);
    const spy = jasmine.createSpy('spy');
    dataService.getHomes$().subscribe(spy);
    // Verify the correct data was returned
    expect(spy).toHaveBeenCalledWith(mockHomes);
    // Verify we call the correct endpoint
    expect(http.get).toHaveBeenCalledWith('assets/homes.json');
  });
});
