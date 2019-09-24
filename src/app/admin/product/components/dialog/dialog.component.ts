import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  file: any;

  uploadSuccessful = false

  constructor(public dialogRef: MatDialogRef<DialogComponent>, public uploadService: BookService) { }

  ngOnInit() {
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded(e) {
    this.file = e.target.files[0];
  }

  closeDialog() {
    this.uploadService.upload(this.file);
  }

}
