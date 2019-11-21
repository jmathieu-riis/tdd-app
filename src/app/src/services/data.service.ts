import { Injectable } from '@angular/core';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getHomes$() {
    return this.http.get<any>('assets/homes.json');
  }

  bookHome$() {
    return this.http.post('http://www.mocky.io/v2/5dd401bd2f00002900d4f8be', null);
  }
}
