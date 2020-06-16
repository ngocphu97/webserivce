import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() isAdmin: boolean;
  @Output() logout = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this.logout.emit(true);
  }

  gotoExplore() {
    this.router.navigate(['/explore']);
  }

  gotoManage() {
    this.router.navigate(['/admin/manage']);
  }

}
