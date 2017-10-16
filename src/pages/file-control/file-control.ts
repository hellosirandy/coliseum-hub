import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
@Component({
  selector: 'page-file-control',
  templateUrl: 'file-control.html',
})
export class FileControlPage {

  type: 'db' | 'mem'
  index: number
  removeFile: any

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {
    this.type = this.navParams.data.type
    this.index = this.navParams.data.index
    this.removeFile = this.navParams.data.removeFile
  }

  handleRemoveTap() {
    this.removeFile(this.type, this.index)
    this.viewCtrl.dismiss()
  }

}
