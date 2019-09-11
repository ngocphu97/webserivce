import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class AppErrorHandler extends ErrorHandler {

  constructor() {
    super();
  }

  handleError(error: Error) {
    super.handleError(error);
  }
}
