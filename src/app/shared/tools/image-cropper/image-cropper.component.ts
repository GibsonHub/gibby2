import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ImageCroppedEvent } from 'ngx-image-cropper';
//import { EventEmitter } from 'events';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {

  @Output() croppedCallbackEvent:EventEmitter<any>;

  constructor() { 
    this.croppedCallbackEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  imageChangedEvent: any = '';
  @Input() croppedImage: any = '';
  
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      console.log('cropped!');
      console.log(this.croppedImage);
      //this.croppedCallbackEvent = new EventEmitter();
      this.croppedCallbackEvent.emit(this.croppedImage);
      //this.croppedCallback(this.croppedImage);
      //const e:EventEmitter = new EventEmitter();
      //e.emit('croppedCallbackEvent', this.croppedImage);
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
      console.log('cropper ready');
  }
  loadImageFailed() {
      // show message
  }

}
