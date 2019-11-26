import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, AddBook } from '../models/book.model';
import { environment } from 'src/environments/environment';
import { BookCover } from '../models';
import { Proposal } from '../models/proposal.model';
import { BookLocationEntity } from '../models/book-location.model';

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

  getBookByKeyword(keyword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/books/search`, { searchKey: keyword });
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

  getBookLocationBySKU(sku: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/location/getLocationFromSKU/${sku}`);
  }

  getBookLocationList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/location`);
  }

  addBookLocation(location: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/location`, { book_id: location.bookId, bookshelf_id: location.bookshelf_id });
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
    this.http.post('/upload', file).pipe().subscribe();
  }

  getBookPhotoByBookId(bookId): Observable<any> {
    return this.http.get(`${this.baseUrl}/books/photo/${bookId}`);
  }

  getProposalList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/proposal-import`);
  }

  updateProposalById(proposal: Proposal): Observable<any> {

    proposal = {
      ...proposal,
      status: proposal.status.toString()
    };

    return this.http.put(`${this.baseUrl}/proposal-import/${proposal.id}`, proposal);
  }

  addProposal(proposal: Proposal): Observable<any> {

    proposal = {
      ...proposal,
      status: proposal.status.toString()
    };

    return this.http.post(`${this.baseUrl}/proposal-import`, proposal);
  }

  updateBookLocation(bookLocationEntity: BookLocationEntity): Observable<any> {

    const bookLocation = {
      book_id: bookLocationEntity.bookId,
      bookshelf_id: bookLocationEntity.bookshelfId
    }
    return this.http.put(`${this.baseUrl}/location/${bookLocationEntity.bookId}`, bookLocation);
  }

}
