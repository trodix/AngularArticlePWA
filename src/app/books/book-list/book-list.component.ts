import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/data/book.service';
import { BookAddComponent } from '../book-add/book-add.component';
import { MatDialog } from '@angular/material';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: any;

  displayedColumns: string[] = ['title', 'author', 'actions'];
  dataSource: any = this.books;

  constructor(
    private bookService: BookService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(res => {
      this.books = res;
    });
  }

  addBookDialog(bookEdit = null) {
    return this.dialog.open(BookAddComponent, {
      autoFocus: true,
      maxWidth: '600px',
      minWidth: '350px',
      data: { books: this.books, bookEdit }
    });
  }

  edit(book) {
    this.addBookDialog(book);
  }

  delete(id) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(dialogResp => {
      if (dialogResp === true) {
        const req = this.bookService.deleteBook(id);
        req.subscribe(res => {
          console.log('response from the server:', res);
          this.notificationService.success(`:: Book removed successfully`);
          this.books = this.books.filter(book => book.id !== id);
        }, (err: HttpErrorResponse) => {
          this.notificationService.error(`:: An error has occured, book not removed`);
        });
      }
    });
  }

}
