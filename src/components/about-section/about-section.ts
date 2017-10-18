import { Component, Input } from '@angular/core'

import { Stadium } from '../../models/stadium'

import * as moment from 'moment'

@Component({
  selector: 'about-section',
  templateUrl: 'about-section.html'
})
export class AboutSectionComponent {
  @Input() stadium:Stadium

  aboutList:string[]=['leagues', 'tenants', 'location', 'capacity', 'architect', 'openingDate']
  aboutListTranslate:any={'leagues': 'LEAGUE', 'tenants': 'TENANT', 'location': 'LOCATION', 'capacity': 'CAPACITY', 'architect': 'ARCHITECT', 'openingDate': "OPENING_DATE"}

  constructor() {
    
  }

  getHeader(header:string) {
    let result=header
    if (header === 'openingDate') {
      result = 'Opened'
    }
    result = result.charAt(0).toUpperCase() + result.slice(1)
    return result
  } 

  getContent(header:any) {
    let result
    const content = this.stadium[header]
    if (content instanceof Object) {
      result = Object.keys(content)
    } else if (header === 'capacity') {
      result = [String(content).replace(/\B(?=(\d{3})+(?!\d))/g, ",")]
    } else if (header === 'openingDate') {
      const d = moment(content).format('MMMM Do, YYYY')
      result = [d]
    } else {
      result = [content]
    }
    for (let i = 0; i < result.length; i++) {
      result[i] = decodeURIComponent(result[i]).replace('_', ' ')
    }
    return result
  }

}
