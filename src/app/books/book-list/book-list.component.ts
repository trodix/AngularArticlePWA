import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../data/articles.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: any;

  displayedColumns: string[] = ['title', 'author'];
  dataSource: any = this.books;

  constructor(private articleService: ArticlesService) {}

  ngOnInit() {
    this.articleService.getBooks().subscribe(res => {
      this.books = res;
    });
  }
}
