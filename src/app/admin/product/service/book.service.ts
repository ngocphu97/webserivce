import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, AddBook } from '../models/book.model';
import { environment } from 'src/environments/environment';
import { BookCover } from '../models';

@Injectable()
export class BookService {

  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getBookList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/books`);
  }

  getBookTopSearch(numTime: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/books/mostsearch/${numTime}`);
  }

  getBookListWithCover(): Observable<any> {
    return this.http.get(`${this.baseUrl}/books?cover=1`);
  }

  addBook(book: AddBook): Observable<any> {
    return this.http.post(`${this.baseUrl}/books`, book);
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/books/${bookId}`);
  }

  deleteBookById(bookId: string): Observable<Book> {
    return this.http.delete<Book>(`${this.baseUrl}/books/${bookId}`);
  }

  updateBookById(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/books/${book.id}`, book);
  }

  updateBookCover(bookCover: BookCover): Observable<any> {
    return this.http.put(`${this.baseUrl}/books/${bookCover.id}/cover`, bookCover);
  }

  addBookCover(photo: string, bookId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/books/uploadcover`, { photo, bookId });
  }
  
  upload(file) {
    this.http.post('/upload', file).pipe().subscribe(
      x => console.log(x)
    );
  }

  getBookPhotoByBookId(bookId): Observable<any> {
    return this.http.get(`${this.baseUrl}/books/photo/${bookId}`);
  }
}
