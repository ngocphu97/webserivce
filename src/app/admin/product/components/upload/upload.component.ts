import { Component, Output, EventEmitter } from '@angular/core';

declare const firebase: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  @Output() coverURL = new EventEmitter<string>();

  uploadProcess = 0;

  previewImage = null;
  uploadedImageUrl = null;

  uploadMode = false;
  uploadSuccess = false;

  uploadImages = [];
  uploadingImages = [];

  storageRef = firebase.storage().ref();

  onSelectImage(image: any) {
    const uploadImage = image.target.files[0];
    const reader = new FileReader();

    reader.onload = () => this.previewImage = reader.result;
    reader.readAsDataURL(uploadImage);

    setTimeout(() => {
      this.uploadSuccess = true;
      this.uploadImageToFirebase(uploadImage);
    }, 1000);
  }

  uploadImageToFirebase(uploadImage) {

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
        if(url) {
          this.uploadSuccess = false;
          this.uploadedImageUrl = url;
          this.coverURL.emit(url);
        }
      });
    });

  }

  catchUploadProcess(snapshot): number {
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
}
