import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookService } from 'src/app/data/book.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  constructor(
    public bookService: BookService,
    public dialogRef: MatDialogRef<BookAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data.bookEdit !== null) {
      this.bookService.populateForm(this.data.bookEdit);
    }
  }

  submit() {
    if (this.bookService.form.valid) {
      if (!this.bookService.form.get('id').value) {
        this.insert();
      } else {
        this.update();
      }
      this.close();
    }
  }

  insert() {
    // insert a book
    const res = this.bookService.insertBook(this.bookService.form.value);
    this.data.books.push(res); // data update without reload doesn't works
  }

  update() {
    // update a book
    const res = this.bookService.updateBook(this.bookService.form.value);
    this.data.books.push(res); // data update without reload doesn't works
  }

  close() {
    this.bookService.form.reset();
    this.bookService.initializeFormGroup();
    this.dialogRef.close();
  }

}
