import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as BookActions from '../actions/book.action';
import { Book } from '../../models/book.model';

export interface State extends EntityState<Book> {
  selectedBookId: number | null;
  topBooks: Array<Book> | null;
  loading: boolean | false;
  bookLocation: any | null
}

export function selectBookId(book: Book): number {
  return book.id;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: selectBookId
});

export const initialState: State = adapter.getInitialState({
  selectedBookId: undefined,
  topBooks:  undefined,
  loading: undefined,
  bookLocation: undefined
});

export const bookReducer = createReducer(
  initialState,

  on(BookActions.getBookList, (state) => ({
    ...state,
    error: null,
    loading: true
  })),

  on(BookActions.getBookById, (state, { bookId }) => {
    return { ...state, selectedBookId: bookId };
  }),

  on(BookActions.getBookByCategoryId, (state, { categoryId }) => {
    return {
      ...state,
      x: categoryId
    };
  }),

  on(BookActions.getBookListSuccess, (state, { bookList }) => {
    const newstate = {
      ...state,
      loading: false,
    }
    return adapter.addAll(bookList, newstate);
  }),

  on(BookActions.addBookSuccess, (state, { book }) => {
    return adapter.addOne(book, state);
  }),

  on(BookActions.deleteBookSuccess, (state, { bookId }) => {
    return adapter.removeOne(bookId, state);
  }),

  on(BookActions.getTopSearchBooksByTimeSuccess, (state, { topBooks }) => {
    return {
      ...state,
      topBooks: topBooks
    }
  }),
 
  on(BookActions.getBookLocationBySkuSuccess, (state, { bookLocation }) => {
    return {
      ...state,
      bookLocation: bookLocation
    }
  }),

);

export function reducer(state: State | undefined, action: Action) {
  return bookReducer(state, action);
}

export const getSelectedBookId = (state: State) => state.selectedBookId;
export const getSelectedTopSearch = (state: State) => state.topBooks;
export const getSelectedLoading = (state: State) => state.loading;
export const getSelectBookLocation = (state: State) => state.bookLocation;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectBookIds = selectIds;
export const selectBookEntities = selectEntities;
export const selectAllBooks = selectAll;
export const selectBookTotal = selectTotal;

