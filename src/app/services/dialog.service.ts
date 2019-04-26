import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg: any) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '390px',
      disableClose: true,
      data: {
        message: msg
      }
    });
  }
}
