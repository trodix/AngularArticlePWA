import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/data/book.service';
import { BookAddComponent } from '../book-add/book-add.component';
import { MatDialog } from '@angular/material';
import { DialogService } from 'src/app/services/dialog.service';
import Book from 'src/app/models/book/book.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];

  displayedColumns: string[] = ['title', 'author', 'actions'];
  dataSource: Book[] = this.books;

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  loadData() {
    // This returns fucking undefined !
    // this.bookService.loadBooks().then((data: Book[]) => {
    //   console.log('books', data);
    //   this.books = data;
    // }).catch((err) => {
    //   console.log(err);
    // });
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
      this.notificationService.success(`:: Books loaded from the server`);
    }, err => this.bookService.loadBooks());
  }

  addBookDialog(bookEdit: Book = null) {
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

  delete(id: number) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(dialogResp => {
      if (dialogResp === true) {
        this.bookService.deleteBook(id);
        this.books = this.books.filter((book: Book) => book.id !== id);
      }
    });
  }

}
