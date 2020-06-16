import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() logout = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onLogout() {
    this.logout.emit(true);
  }

}
