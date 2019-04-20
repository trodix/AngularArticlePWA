import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../data/articles.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

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
