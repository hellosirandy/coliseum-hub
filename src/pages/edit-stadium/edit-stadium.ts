import { Component, ViewChild } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
@Component({
  selector: 'page-edit-stadium',
  templateUrl: 'edit-stadium.html',
})
export class EditStadiumPage {
  @ViewChild('fileInput') fileInput;
  create: boolean=false;
  fileList: any[]=[];
  previewImages: string[]=[];

  constructor(
    private viewCtrl: ViewController,
    params: NavParams,
  ) {
    this.create = params.get('create');
  }

  ionViewDidLoad() {}

  cancel() {
    this.viewCtrl.dismiss();
  }

  handleFileUploadClick() {
    this.fileInput.nativeElement.click();
  }

  handleFileSelected(files) {
    const offset = this.previewImages.length;
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = function (e) {
        this.previewImages[offset+i] = reader.result;
      }.bind(this);
    }
  }

}
