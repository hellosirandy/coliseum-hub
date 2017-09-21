import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavParams, ToastController, ViewController } from 'ionic-angular';

import { StorageService } from '../../providers/storage.service';
import { DatabaseService } from '../../providers/database.service';
import { TranslateService } from '@ngx-translate/core';

import { Stadium } from '../../models/stadium';
import { Sport } from '../../models/sport';
import { League } from '../../models/league';
import { Team } from '../../models/team';

import { Sports, Leagues, Teams } from '../../statics/sports-leagues-teams';

@Component({
  selector: 'page-edit-stadium',
  templateUrl: 'edit-stadium.html',
})
export class EditStadiumPage implements OnInit {
  @ViewChild('fileInput') fileInput;
  editStadiumForm: FormGroup;
  submitTried: boolean=false;

  stadium: any=null;

  fileList: any[]=[];
  previewImages: string[]=[];

  sportsCandidates: Sport[]=Sports;
  leaguesCandidates: League[]=[];
  tenantsCandidates: Team[]=[];

  constructor(
    private viewCtrl: ViewController,
    private database: DatabaseService,
    params: NavParams,
    private storage: StorageService,
    private toastCtrl: ToastController,
    private translate: TranslateService,
  ) {
    this.stadium = params.get('stadium');
  }

  ngOnInit() {
    this.editStadiumForm = new FormGroup({
      'name': new FormControl(this.stadium ? this.stadium.name : null, Validators.required),
      'sports': new FormControl(this.stadium ? Object.keys(this.stadium.sports) : null, Validators.required),
      'leagues': new FormControl({value: (this.stadium ? Object.keys(this.stadium.leagues) : null), disabled: !this.stadium}, Validators.required),
      'tenants': new FormControl({value: (this.stadium ? Object.keys(this.stadium.tenants) : null), disabled: !this.stadium}, Validators.required),
      'location': new FormControl(this.stadium ? this.stadium.location : null, Validators.required),
      'architect': new FormControl((this.stadium ? this.stadium.architect : null), null),
      'openingDate': new FormControl(this.stadium ? this.stadium.openingDate : null, Validators.required),
      'capacity': new FormControl(this.stadium ? this.stadium.capacity : null, Validators.required),
    });
    if (this.stadium) {
      this.handleSportsChoosed();
      this.handleLeaguesChoosed();
    }
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

  handleSportsChoosed() {
    let leaguesCandidates = [];
    this.editStadiumForm.get('sports').value.forEach(sport => {
      if (Leagues[sport]) {
        leaguesCandidates = [...leaguesCandidates, ...Leagues[sport]];
      }
    });
    this.leaguesCandidates = leaguesCandidates;
    if (leaguesCandidates.length > 0) {
      this.editStadiumForm.get('leagues').enable();
    } else {
      this.editStadiumForm.get('leagues').disable();
    }
  }

  handleLeaguesChoosed() {
    let tenantsCandidates = [];
    this.editStadiumForm.get('leagues').value.forEach(league => {
      tenantsCandidates = [...tenantsCandidates, ...Teams[league]];
    });
    this.tenantsCandidates = tenantsCandidates;
    if (tenantsCandidates.length > 0) {
      this.editStadiumForm.get('tenants').enable();
    } else {
      this.editStadiumForm.get('tenants').disable();
    }
  }

  onSubmit() {
    this.submitTried = true;
    if (this.editStadiumForm.valid) {
      if (this.stadium) {
        this.editStadium();
      } else {
        this.createStadium();
      }
    }
  }

  editStadium() {
    let updates = {};
    for(let control in this.editStadiumForm.controls) {
      if (this.editStadiumForm.get(control).dirty) {
        const multiChildren = ['sports', 'leagues', 'tenants'];
        if (multiChildren.indexOf(control) > -1 ) {
          updates[control] = this.generateFireObject(this.editStadiumForm.get(control).value);
        } else {
          updates[control] = this.editStadiumForm.get(control).value;
        }
      }
    }
    if (Object.keys(updates).length === 0) {

    } else {
      this.database.updateStadium(this.stadium.$key, updates).then(res => {
        this.translate.get('STADIUM_UPDATED', {stadium: this.editStadiumForm.get('name').value }).subscribe((res: string) => {
          let toast = this.toastCtrl.create({
            message: res,
            duration: 2000,
            position: 'middle',
          })
          toast.present();
          this.cancel();
        })
      });
    }
  }

  createStadium() {
    const newStadium: Stadium = {
      name: this.editStadiumForm.get('name').value,
      sports: this.generateFireObject(this.editStadiumForm.get('sports').value),
      leagues: this.generateFireObject(this.editStadiumForm.get('leagues').value),
      tenants: this.generateFireObject(this.editStadiumForm.get('tenants').value),
      capacity: this.editStadiumForm.get('capacity').value,
      location: this.editStadiumForm.get('location').value,
      architect: this.editStadiumForm.get('architect').value ? this.editStadiumForm.get('architect').value : '',
      openingDate: this.editStadiumForm.get('openingDate').value,
      images: []
    };
    this.database.newStadium(newStadium).then(res => {
      this.translate.get('STADIUM_ADDED', {stadium: newStadium.name}).subscribe((res: string) => {
        let toast = this.toastCtrl.create({
          message: res,
          duration: 2000,
          position: 'middle',
        })
        toast.present();
        this.cancel();
      })
    });
  }

  generateFireObject(array) {
    let fire = {};
    for (let value of array) {
      fire[value] = true;
    }
    return fire;
  }

}
