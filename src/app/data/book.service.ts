import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnlineOfflineService } from 'src/app/services/online-offline-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import Book from 'src/app/models/book/book.model';
import Dexie from 'dexie';
// import 'dexie-observable';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private db: any;

  constructor(
    private http: HttpClient,
    private readonly onlineOfflineService: OnlineOfflineService,
    public notificationService: NotificationService
  ) {
    this.registerToEvents(onlineOfflineService);
    this.createDatabase();
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    publicationDate: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    reviews: new FormControl([], [])
  });

  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        console.log('went online');
        console.log('sending all stored items');
        this.sendItemsFromIndexedDb();
      } else {
        console.log('went offline, storing in indexdb');
      }
    });
  }

  private createDatabase() {
    this.db = new Dexie('ArticlesDB');
    this.db.version(1).stores({
      books: 'id,title,isbn,author,publicationDate,description,reviews'
    });
    // this.synchronizeFromDbServer();
  }

  private synchronizeFromDbServer() {
    if (this.onlineOfflineService.isOnline) {
      this.getBooks().subscribe(res => {
        this.db.books.bulkAdd(res);
        this.notificationService.success(`:: All books synchronized`);
      }, (err: any) => {
        console.log(err);
        this.notificationService.error(`:: Books not synchronized`);
      });
    }
  }

  private async sendItemsFromIndexedDb() {
    const allItems: Book[] = await this.db.books.toArray();
    let success: boolean = true;
    let count = 0;

    allItems.forEach((item: Book) => {
      // send items to backend...
      const res = this.insertBook(item);
      if (res !== null) {
        this.db.books.delete(item.id).then(() => {
          console.log(`item ${item.id} sent and deleted locally`);
          count++;
        });
      } else {
        success = false;
      }
    });

    if (success) {
      this.notificationService.success(`:: All books synchronized`);
    } else {
      this.notificationService.error(`:: An error has occured, ${count} books synchronized`);
    }
  }

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      title: '',
      isbn: '',
      author: '',
      publicationDate: '',
      description: '',
      reviews: []
    });
  }

  populateForm(book: Book) {
    console.log(book);
    this.form.setValue(book);
  }

  getBooks() {
    return this.http.get(`https://127.0.0.1:8000/api/books.json`);
  }

  async loadBooks() {
    if (this.onlineOfflineService.isOnline) {
      this.getBooks().subscribe((res: Book[]) => {
        this.notificationService.success(`:: Books loaded from the server`);
        return res;
      });
    } else {
      const allItems: Book[] = await this.db.books.toArray();
      this.notificationService.success(`:: Books loaded from locale database`);
      return allItems;
    }
  }

  insertBook(book: Book) {
    console.log('insert:', book);
    if (this.onlineOfflineService.isOnline) {
      this.http.post(`https://127.0.0.1:8000/api/books`, book).subscribe(res => {
        this.notificationService.success(`:: Book created`);
        return res;
      }, (err: any) => {
        this.notificationService.error(`:: An error occured, book not created`);
        return null;
      });
    } else {
      this.db.books.add(book, book.id).then(async () => {
        const allItems: Book[] = await this.db.books.toArray();
        console.log('saved in DB, DB is now', allItems);
        this.notificationService.success(`:: Book created`);
        return book;
      }).catch(e => {
        console.log('Error: ' + (e.stack || e));
        this.notificationService.error(`:: An error occured, book not created`);
        return null;
      });
    }
  }

  updateBook(book: Book) {
    console.log('update:', book);
    if (this.onlineOfflineService.isOnline) {
      this.http.put(`https://127.0.0.1:8000/api/books/${book.id}`, book).subscribe(res => {
        this.notificationService.success(`:: Book updated`);
        return res;
      }, (err: any) => {
        this.notificationService.error(`:: An error occured, book not updated`);
        return null;
      });
    } else {
      this.db.books.put(book).then(async () => {
        const allItems: Book[] = await this.db.books.toArray();
        console.log('saved in DB, DB is now', allItems);
        this.notificationService.success(`:: Book updated`);
        return book;
      }).catch(e => {
        console.log('Error: ' + (e.stack || e));
        this.notificationService.error(`:: An error occured, book not updated`);
        return null;
      });
    }
  }

  deleteBook(id: number) {
    console.log('delete:', id);
    if (this.onlineOfflineService.isOnline) {
      this.http.delete(`https://127.0.0.1:8000/api/books/${id}`).subscribe(res => {
        this.notificationService.success(`:: Book deleted`);
        return true;
      }, (err: any) => {
        this.notificationService.error(`:: An error occured, book not deleted`);
        return false;
      });
    } else {
      this.db.books.delete(id).then(async () => {
        const allItems: any[] = await this.db.books.toArray();
        console.log('saved in DB, DB is now', allItems);
        this.notificationService.success(`:: Book deleted`);
        return true;
      }).catch(e => {
        console.log('Error: ' + (e.stack || e));
        this.notificationService.error(`:: An error occured, book not deleted`);
        return false;
      });
    }
  }

}
