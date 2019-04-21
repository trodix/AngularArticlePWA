import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { RepDialogComponent } from '../rep-dialog/rep-dialog.component';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  titleFormControl: FormControl;
  dateFormControl: FormControl;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

    this.titleFormControl = new FormControl('', [
      Validators.required
    ]);

    this.dateFormControl = new FormControl('', [
      Validators.required
    ]);

  }

  openRepDialog() {
    const dialogRef = this.dialog.open(RepDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      alert(`User choose ${result}`);
    });
  }

}
