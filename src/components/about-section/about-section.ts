import { Component, Input } from '@angular/core'

import { Stadium } from '../../models/stadium'

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
    } else {
      result = [content]
    }
    for (let i = 0; i < result.length; i++) {
      result[i] = decodeURI(result[i]).replace('_', ' ')
    }
    return result
  }

}
