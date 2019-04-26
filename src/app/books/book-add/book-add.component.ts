import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookService } from 'src/app/data/book.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  constructor(
    public bookService: BookService,
    public notificationService: NotificationService,
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
        // insert a book
        const req = this.bookService.insertBook(this.bookService.form.value);
        req.subscribe(res => {
          console.log('response from the server:', res);
          this.notificationService.success(`:: Book created successfully`);
          this.data.books.push(res); // data update without reload doesn't works
        }, (err: HttpErrorResponse) => {
          this.notificationService.error(`:: An error has occured, book not created`);
        });
      } else {
        // update a book
        const req = this.bookService.updateBook(this.bookService.form.value);
        req.subscribe(res => {
          console.log('response from the server:', res);
          this.notificationService.success(`:: Book updated successfully`);
          this.data.books.push(res); // data update without reload doesn't works
        }, (err: HttpErrorResponse) => {
          this.notificationService.error(`:: An error has occured, book not updated`);
        });
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
