import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookService } from '../../data/book.service';

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
        const req = this.bookService.insertBook(this.bookService.form.value);
        req.subscribe(res => {
          console.log('response from the server:', res);
          this.data.books.push(res); // data update without reload doesn't works
        });
      } else {
        const req = this.bookService.updateBook(this.bookService.form.value);
        req.subscribe(res => {
          console.log('response from the server:', res);
          this.data.books.push(res); // data update without reload doesn't works
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
