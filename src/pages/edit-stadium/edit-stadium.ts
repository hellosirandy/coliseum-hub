import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavParams, ViewController } from 'ionic-angular';

import { StorageService } from '../../providers/storage.service';
import { DatabaseService } from '../../providers/database.service';

import { Stadium } from '../../models/stadium';

@Component({
  selector: 'page-edit-stadium',
  templateUrl: 'edit-stadium.html',
})
export class EditStadiumPage implements OnInit {
  @ViewChild('fileInput') fileInput;
  create: boolean=false;
  fileList: any[]=[];
  previewImages: string[]=[];

  editStadiumForm: FormGroup;

  constructor(
    private viewCtrl: ViewController,
    private database: DatabaseService,
    params: NavParams,
    private storage: StorageService,
  ) {
    this.create = params.get('create');
  }

  ngOnInit() {
    this.editStadiumForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'sports': new FormControl(null, Validators.required),
      'leagues': new FormControl(null, Validators.required),
      'tenants': new FormControl(null, Validators.required),
      'location': new FormControl(null, Validators.required),
      'openingDate': new FormControl(null, Validators.required),
      'capacity': new FormControl(null, Validators.required),
    });
  }

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

  onSubmit() {
    this.editStadiumForm.markAsTouched();
    console.log(this.editStadiumForm);
    if (this.editStadiumForm.valid) {
      const newStadium: Stadium = {
        name: this.editStadiumForm.get('name').value,
        sports: this.editStadiumForm.get('sports').value,
        leagues: this.editStadiumForm.get('leagues').value,
        tenants: this.editStadiumForm.get('tenants').value,
        capacity: this.editStadiumForm.get('capacity').value,
        location: this.editStadiumForm.get('location').value,
        openingDate: this.editStadiumForm.get('openingDate').value,
        images: []
      };
      this.database.newStadium(newStadium).then(res => {
        console.log(res);
      });
    }
  }

}
