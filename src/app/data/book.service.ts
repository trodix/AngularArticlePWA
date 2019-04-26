import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  notificationService: any;

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    publicationDate: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    reviews: new FormControl([], [])
  });

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

  populateForm(book) {
    console.log(book);
    this.form.setValue(book);
  }

  getBooks() {
    return this.http.get(`https://192.168.1.11:8000/api/books.json`);
  }

  insertBook(book: any) {
    console.log('insert:', book);
    return this.http.post(`https://192.168.1.11:8000/api/books`, book);
  }

  updateBook(book: any) {
    console.log('update:', book);
    return this.http.put(`https://192.168.1.11:8000/api/books/${book.id}`, book);
  }

  deleteBook(id) {
    console.log('delete:', id);
    return this.http.delete(`https://192.168.1.11:8000/api/books/${id}`);
  }

}
