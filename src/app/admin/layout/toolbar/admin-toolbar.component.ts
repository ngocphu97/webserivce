import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core/store';
import { AuthActions } from '@app/auth';

@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.css']
})
export class AdminToolbarComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  onLogoutClicked(): void {
    this.store.dispatch(AuthActions.logoutConfirmation());
  }

}
