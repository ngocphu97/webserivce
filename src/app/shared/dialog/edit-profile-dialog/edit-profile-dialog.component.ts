import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    email: string;
    username: string;
    password: string;
  }) { }

  ngOnInit() {
  }

}
