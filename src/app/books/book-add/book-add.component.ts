import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BookService } from '../../data/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  constructor(private bookService: BookService, public dialogRef: MatDialogRef<BookAddComponent>) { }

  ngOnInit() {
  }

  submit() {
    if (this.bookService.form.valid) {
      if (!this.bookService.form.get('$id').value) {
        const req = this.bookService.insertBook(this.bookService.form.value);
        req.subscribe(res => {
          console.log('res:', res);
        });
      } else {
        this.bookService.updateBook(this.bookService.form.value);
      }
      this.close();
    }
  }

  close() {
    this.bookService.form.reset();
    this.bookService.initializeFormGroup();
    this.dialogRef.close();
  }

}
