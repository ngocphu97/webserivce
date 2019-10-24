import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BookService } from '../../service';
import { DialogComponent } from '../dialog/dialog.component';

declare const firebase: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  previewImage = null;
  uploadMode = false;
  uploadingImages = [];
  uploadSuccess = false;
  uploadImages = [];
  storageRef = firebase.storage().ref();
  uploadProcess = 0;

  uploadedImageUrl = null;

  constructor(public dialog: MatDialog, public uploadService: BookService) { }

  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      height: '50%',
    })
  }

  onSelectImage(image: any) {
    const uploadImage = image.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
      this.uploadingImages.push(this.previewImage);
      // this.addBtn(this.previewImage);
      this.uploadImages.push(image.target.files[0]);
    };
    reader.readAsDataURL(image.target.files[0]);
  }

  uploadImageToFirebase() {
    console.log(this.uploadImages[0].name);
    this.uploadImages.forEach(uploadImage => {
      console.log('uploading .... ', uploadImage);

      const metadata = {
        contentType: 'image/jpeg'
      };

      const uploadTask = this.storageRef
        .child(uploadImage.name)
        .put(uploadImage, metadata);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => this.catchUploadProcess(snapshot),
        (error) => this.catchUploadError(error));

      uploadTask.then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          this.uploadedImageUrl = url;
        });
      });

      // uploadTask.snapshot.ref.getDownloadURL()
      //   .then((downloadURL) => {
      //     console.log('Log Message: UploadComponent -> uploadImageToFirebase -> downloadURL', downloadURL);
      //     this.uploadSuccess = true;
      //     this.uploadImg(downloadURL);
      //   })
      //   .catch((err) => {
      //     console.log('err', 'loi server', err);
      //   });
    });
  }

  catchUploadProcess(snapshot): number {
    console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    return this.uploadProcess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  }

  catchUploadError(error: any) {
    switch (error.code) {
      case 'storage/unauthorized':
        alert('storage/unauthorized');
        this.uploadProcess = -1;
        break;
      case 'storage/canceled':
        alert('storage/canceled');
        this.uploadProcess = -1;
        break;
      case 'storage/unknown':
        alert('storage/unknown');
        this.uploadProcess = -1;
        break;
    }
  }

  selectUploadMode() {
    this.uploadMode = true;
  }

  uploadImg(url) {
    console.log('Log Message: UploadComponent -> uploadImg -> url', url);
  }
}
