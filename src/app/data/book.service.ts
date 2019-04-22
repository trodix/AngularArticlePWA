import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $id: new FormControl(null),
    title: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    publicationDate: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  initializeFormGroup() {
    this.form.setValue({
      $id: null,
      title: '',
      isbn: '',
      author: '',
      publicationDate: '',
      description: ''
    });
  }

  getBooks() {
    return this.http.get(`https://localhost:8000/api/books.json`);
  }

  insertBook(book: any) {
    console.log('insert: ', book);
    return this.http.post(`https://localhost:8000/api/books.json`, book);
  }

  updateBook(book: any) {
    console.log('update: ', book);
    return this.http.post(`https://localhost:8000/api/books/${book.$id}.json`, book);
  }

}
