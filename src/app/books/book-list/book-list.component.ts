import { Component, OnInit } from '@angular/core';
import { BookService } from '../../data/book.service';
import { BookAddComponent } from '../book-add/book-add.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: any;

  displayedColumns: string[] = ['title', 'author', 'actions'];
  dataSource: any = this.books;

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(res => {
      this.books = res;
    });
  }

  addBookDialog(bookEdit) {
    const dialogRef = this.dialog.open(BookAddComponent, {
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
    this.bookService.deleteBook(id);
  }

}
