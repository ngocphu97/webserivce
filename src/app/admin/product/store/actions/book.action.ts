import { createAction, props } from '@ngrx/store';

import { Book, AddBook } from '../../models/book.model';
import { BookCover } from '../../models';
import { BookLocation } from '../../models/book-location.model';
import { Proposal } from '../../models/proposal.model';

export const getBookList = createAction(
	'[Book] Get Book List'
);

export const getBookListSuccess = createAction(
	'[Book] Get Book List Success',
	props<{ bookList: any }>()
);

export const getBookListFail = createAction(
	'[Book] Get Book List Fail',
	props<{ error: any }>()
);

export const addBook = createAction(
	'[Book] Add New Book',
	props<{ book: AddBook }>()
);

export const addBookSuccess = createAction(
	'[Book] Add New Book Success',
	props<{ book: Book }>()
);

export const addBookFail = createAction(
	'[Book] Add New Book Fail',
	props<{ error: any }>()
);

export const getBookById = createAction(
	'[Book] Get Book By Id',
	props<{ bookId: number }>()
);

export const getBookByIdSuccess = createAction(
	'[Book] Get Book By Id Success',
	props<{ book: Book }>()
);

export const getBookByIdFail = createAction(
	'[Book] Get Book By Id Fail',
	props<{ error: any }>()
);

export const getBookLocationBySku = createAction(
  '[Book] Get Book Location By SKU',
  props<{ sku: number }>()
);

export const getBookLocationBySkuSuccess = createAction(
  '[Book] Get Book Location By SKU Success',
  props<{ bookLocation: any }>()
);

export const getBookLocationBySkuFail = createAction(
  '[Book] Get Book Location By SKU Fail',
  props<{ error: any }>()
);


export const getBookByCategoryId = createAction(
  '[Book] Get Book Category Id',
  props<{ categoryId: number }>()
);

export const getBookByCategoryIdSuccess = createAction(
  '[Book] Get Book By Category Success',
  props<{ book: Book }>()
);

export const getBookByCategoryIdFail = createAction(
  '[Book] Get Book By Category Fail',
  props<{ error: any }>()
);


export const updateBookById = createAction(
	'[Book] Update Book By Id',
	props<{ book: Book }>()
);

export const updateBookByIdSuccess = createAction(
	'[Book] Update Book By Id Success',
	props<{ book: Book }>()
);

export const updateBookByIdFail = createAction(
	'[Book] Update Book By Id Fail',
	props<{ error: any }>()
);

export const deleteBook = createAction(
	'[Book] Delete book',
	props<{ book: Book }>()
);

export const deleteBookSuccess = createAction(
	'[Book] Delete book success',
	props<{ bookId: string }>()
);

export const deleteBookError = createAction(
	'[Book] Delete book fail',
	props<{ error: any }>()
);

export const getTopSearchBooksByTime = createAction(
  '[Book] Get top search book',
  props<{ time: number }>()
);

export const getTopSearchBooksByTimeSuccess = createAction(
  '[Book] Get top search book success',
  props<{ topBooks: Array<Book> }>()
);

export const getTopSearchBooksByTimeFail = createAction(
  '[Book] Get top search book fail',
  props<{ error: any }>()
);

export const addBookCover = createAction(
  '[Book] Add book cover',
  props<{ photo: string, sku: string }>()
);

export const addBookCoverSuccess = createAction(
  '[Book] Add book cover success',
);

export const addBookCoverFail = createAction(
  '[Book] Add book cover fail',
  props<{ error: any }>()
);

export const updateBookCover = createAction(
  '[Book] Update book cover',
  props<{ bookCover: BookCover }>()
);

export const updateBookCoverSuccess = createAction(
  '[Book] Update book cover success',
);

export const updateBookCoverFail = createAction(
  '[Book] Update book cover fail',
  props<{ error: any }>()
);

export const getProposalList = createAction(
  '[Proposal Import] Get Proposal Import Book List'
);

export const getProposalListSuccess = createAction(
  '[Proposal Import] Get Proposal Import List Success',
  props<{ proposalList: any }>()
);

export const getProposalListFail = createAction(
  '[Proposal Import] Get Proposal Import List Fail',
  props<{ error: any }>()
);

export const updateProposal = createAction(
  '[Proposal Import] Update Proposal Import ',
  props<{ proposal: Proposal }>()
);

export const updateProposalSuccess = createAction(
  '[Proposal Import] Update Proposal Import Success',
  props<{ id: any }>()
);

export const updateProposalFail = createAction(
  '[Proposal Import] Update Proposal Import Fail',
  props<{ error: any }>()
);

export const addProposal = createAction(
  '[Proposal Import] Add Proposal Import ',
  props<{ proposal: Proposal }>()
);

export const addProposalSuccess = createAction(
  '[Proposal Import] Add Proposal Import Success',
  props<{ proposal: Proposal }>()
);

export const addProposalFail = createAction(
  '[Proposal Import] Add Proposal Import Fail',
  props<{ error: any }>()
);

export const getBookLocationList = createAction(
  '[Book Location ] Get Book Location Book List'
);

export const getBookLocationListSuccess = createAction(
  '[Book Location] Get Book Location List Success',
  props<{ bookLocationList: Array<BookLocation> }>()
);

export const getBookLocationListFail = createAction(
  '[Book Location] Get Book Location List Fail',
  props<{ error: any }>()
);


