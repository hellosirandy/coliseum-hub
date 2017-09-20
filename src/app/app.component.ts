import { Component } from '@angular/core';
import { Config } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    private config: Config,
    private translate: TranslateService,
  ) {
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('zh');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('zh'); // Set your language here
    }

    this.translate.get('BACK_BUTTON_TEXT').subscribe((res: string) => {
      this.config.set('ios', 'backButtonText', res);
    });
  }
}
