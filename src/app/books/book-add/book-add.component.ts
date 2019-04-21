import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  titleFormControl: FormControl;
  dateFormControl: FormControl;

  constructor() { }

  ngOnInit() {

    this.titleFormControl = new FormControl('', [
      Validators.required
    ]);

    this.dateFormControl = new FormControl('', [
      Validators.required
    ]);

  }

}
