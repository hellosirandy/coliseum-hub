import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { LoadingController, NavParams, PopoverController, ToastController, ViewController } from 'ionic-angular'

import { StorageService } from '../../providers/storage.service'
import { DatabaseService } from '../../providers/database.service'
import { TranslateService } from '@ngx-translate/core'
import { ImageService } from '../../providers/image.service'

import { Stadium } from '../../models/stadium'
import { Sport } from '../../models/sport'
import { League } from '../../models/league'
import { Team } from '../../models/team'

import { Sports, Leagues, Teams } from '../../statics/sports-leagues-teams'

import { FileControlPage } from '../../pages/file-control/file-control'

@Component({
  selector: 'page-edit-stadium',
  templateUrl: 'edit-stadium.html',
})
export class EditStadiumPage implements OnInit {
  @ViewChild('fileInput') fileInput
  editStadiumForm: FormGroup
  submitTried: boolean=false

  stadium: any=null

  fileList: any[]=[]
  previewImages = {old: [], new: []}

  sportsCandidates: Sport[]=Sports
  leaguesCandidates: League[]=[]
  tenantsCandidates: Team[]=[]

  imagesBuffer: any[]=[]
  fromLeague: League

  constructor(
    private viewCtrl: ViewController,
    private database: DatabaseService,
    private imageService: ImageService,
    private loadingCtrl: LoadingController,
    params: NavParams,
    private popoverCtrl: PopoverController,
    private storage: StorageService,
    private toastCtrl: ToastController,
    private translate: TranslateService,
  ) {
    this.stadium = params.get('stadium')
    this.fromLeague = params.get('fromLeague')
  }

  ngOnInit() {
    this.previewImages.old = ((this.stadium && this.stadium.images) ? this.stadium.images : [])
    this.editStadiumForm = new FormGroup({
      'name': new FormControl(this.stadium ? this.stadium.name : null, Validators.required),
      'sports': new FormControl(this.getSportInitValue(), Validators.required),
      'leagues': new FormControl({value: this.getLeagueInitValue(), disabled: !(this.stadium || this.fromLeague)}, Validators.required),
      'tenants': new FormControl({value: (this.stadium ? Object.keys(this.stadium.tenants).map(s => this.decodeKey(s)) : null), disabled: !(this.stadium || this.fromLeague)}, Validators.required),
      'location': new FormControl(this.stadium ? this.stadium.location : null, Validators.required),
      'architect': new FormControl((this.stadium ? this.stadium.architect : null), null),
      'openingDate': new FormControl(this.stadium ? this.stadium.openingDate : null, Validators.required),
      'capacity': new FormControl(this.stadium ? this.stadium.capacity : null, Validators.required),
      'images': new FormControl(this.previewImages.old, null),
    })
    if (this.stadium || this.fromLeague) {
      this.handleSportsChoosed()
      this.handleLeaguesChoosed()
    }
  }

  getSportInitValue() {
    if (this.stadium) {
      return Object.keys(this.stadium.sports)
    } else if (this.fromLeague) {
      return [this.fromLeague.sport.name]
    } else {
      return null
    }
  }

  getLeagueInitValue() {
    if (this.stadium) {
      return Object.keys(this.stadium.leagues)
    } else if (this.fromLeague) {
      return [this.fromLeague.name]
    } else {
      return null
    }
  }

  cancel() {
    this.viewCtrl.dismiss()
  }

  handleFileUploadClick() {
    this.fileInput.nativeElement.click()
  }

  handleFileSelected(files) {
    this.imagesBuffer = [...this.imagesBuffer, ...Array.from(files)]
    const offset = this.previewImages.new.length
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader()
      reader.readAsDataURL(files[i])
      reader.onloadend = function (e) {
        this.previewImages.new[offset+i] = reader.result
      }.bind(this)
    }
  }

  handleSportsChoosed() {
    let leaguesCandidates = []
    this.editStadiumForm.get('sports').value.forEach(sport => {
      leaguesCandidates = [...leaguesCandidates, ...Leagues.filter(league => league.sport.name === sport)]
      
    })
    this.leaguesCandidates = leaguesCandidates
    if (leaguesCandidates.length > 0) {
      this.editStadiumForm.get('leagues').enable()
    } else {
      this.editStadiumForm.get('leagues').disable()
    }
  }

  handleLeaguesChoosed() {
    let tenantsCandidates = []
    this.editStadiumForm.get('leagues').value.forEach(league => {
      tenantsCandidates = [...tenantsCandidates, ...this.sortTeamName(Teams[league])]
    })
    this.tenantsCandidates = tenantsCandidates
    this.tenantsCandidates = tenantsCandidates
    if (tenantsCandidates.length > 0) {
      this.editStadiumForm.get('tenants').enable()
    } else {
      this.editStadiumForm.get('tenants').disable()
    }
  }

  sortTeamName(teams: Team[]) {
    return teams.sort((a, b) => {
      const first = a.location ? a.location : a.name
      const second = b.location ? b.location: b.name
      return first.localeCompare(second) 
    })
  }

  onSubmit() {
    this.submitTried = true
    if (this.editStadiumForm.valid) {
      const stringArray = ['UPLOADING_IMAGE', 'SAVING_STADIUM', 'STADIUM_UPDATED', 'STADIUM_ADDED']
      this.translate.get(stringArray, {stadium: this.editStadiumForm.get('name').value}).subscribe((res: any) => {
        if (this.stadium) {
          this.editStadium(res)
        } else {
          this.createStadium(res)
        }
      })
    }
  }

  editStadium(translateValues: any) {
    let loader
    loader = this.loadingCtrl.create({
      content: translateValues.UPLOADING_IMAGE,
    })
    loader.present()
    this.uploadImages().then(_ => {
      loader.setContent(translateValues.SAVING_STADIUM)

      let updates = {}
      for(let control in this.editStadiumForm.controls) {
        if (this.editStadiumForm.get(control).dirty) {
          const multiChildren = ['sports', 'leagues', 'tenants']
          if (multiChildren.indexOf(control) > -1 ) {
            updates[control] = this.generateFireObject(this.editStadiumForm.get(control).value)
          } else {
            updates[control] = this.editStadiumForm.get(control).value
          }
        }
      }
      if (Object.keys(updates).length === 0) {

      } else {
        return this.database.updateStadium(this.stadium.$key, updates)
      }
    }).then(res => {
      loader.dismiss()
      let toast = this.toastCtrl.create({
        message: translateValues.STADIUM_UPDATED,
        duration: 2000,
        position: 'middle',
      })
      toast.present()
      this.cancel()
    })
  }

  createStadium(translateValues: any) {
    let loader
    loader = this.loadingCtrl.create({
      content: translateValues.UPLOADING_IMAGE,
    })
    loader.present()
    this.uploadImages().then(_ => {
      loader.setContent(translateValues.SAVING_STADIUM)
      const newStadium: Stadium = {
        name: this.editStadiumForm.get('name').value,
        sports: this.generateFireObject(this.editStadiumForm.get('sports').value),
        leagues: this.generateFireObject(this.editStadiumForm.get('leagues').value),
        tenants: this.generateFireObject(this.editStadiumForm.get('tenants').value),
        capacity: this.editStadiumForm.get('capacity').value,
        location: this.editStadiumForm.get('location').value,
        architect: this.editStadiumForm.get('architect').value ? this.editStadiumForm.get('architect').value : '',
        openingDate: this.editStadiumForm.get('openingDate').value,
        images: this.editStadiumForm.get('images').value
      }
      return this.database.newStadium(newStadium)
    }).then(res => {
      loader.dismiss()
      let toast = this.toastCtrl.create({
        message: translateValues.STADIUM_ADDED,
        duration: 2000,
        position: 'middle',
      })
      toast.present()
      this.cancel()
    })
  }

  generateFireObject(array) {
    let fire = {}
    for (let value of array) {
      fire[this.encodeKey(value)] = true
    }
    return fire
  }

  encodeKey(s) { 
    return encodeURIComponent(s).replace('.', '%2E') 
  }

  decodeKey(s) { 
    return decodeURIComponent(s).replace('%2E', '.') 
  }

  uploadImages():Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.imagesBuffer.length === 0) {
        resolve()
      }
      this.storage.uploadMultipleFiles(this.imagesBuffer).subscribe((urls: string[]) => {
        const images = this.editStadiumForm.get('images').value
        this.editStadiumForm.get('images').setValue([...images, ...urls])
        this.editStadiumForm.get('images').markAsDirty()
        resolve()
      })
    })
  }

  getThumbnail(image, size: 100 | 200 | 400 | 800) {
    return this.imageService.getThumbnail(image, size)
  }

  handleFileClick(myEvent) {
    console.log(myEvent)
    const popover = this.popoverCtrl.create(FileControlPage)
    popover.present({
      ev: myEvent
    });
  }

}
