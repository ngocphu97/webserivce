import { Component } from '@angular/core';
import { BookService } from '../../service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  file: any;
  uploadSuccessful = false

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public uploadService: BookService
  ) { }

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
