import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  // Open a dialog
  open(component, info) {
    this.dialog.open(component, info);
  }

  close(component) {
    return null;
  }
}
