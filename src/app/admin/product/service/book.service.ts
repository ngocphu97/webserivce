import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookService {

  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getBookList(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(`${this.baseUrl}/books`);
  }

  addBook(book: Book): Observable<any> {
    return this.http.post(`${this.baseUrl}/books`, book);
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/books/${bookId}`);
  }

  deleteBookById(bookId: string): Observable<Book> {
    return this.http.delete<Book>(`${this.baseUrl}/books/${bookId}`);
  }
}
