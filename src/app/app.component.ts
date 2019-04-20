import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ArticlesService } from './data/articles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ArticleAngularPWA';

  books: any;

  displayedColumns: string[] = ['title', 'author'];
  dataSource: any = this.books;

  constructor(updates: SwUpdate, private articleService: ArticlesService) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => {
        document.location.reload();
      });
    });
  }

  ngOnInit() {
    this.articleService.getBooks().subscribe(res => {
      this.books = res;
    });
  }
}
