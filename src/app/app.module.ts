import { NgModule, ErrorHandler } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { ProfilePage } from '../pages/profile/profile';

import { DirectivesModule } from '../directives/directives.module';
import { ComponentsModule } from '../components/components.module';
import { PagesModule } from '../pages/pages.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../providers/auth.service';
import { StorageService } from '../providers/storage.service';
import { DatabaseService } from '../providers/database.service';
import { ImageService } from '../providers/image.service';

import { FirebaseConfig } from '../environments/environment';

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    SearchPage,
    ProfilePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    DirectivesModule,
    ComponentsModule,
    PagesModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    AngularFireModule.initializeApp(FirebaseConfig, 'coliseum-hub'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    SearchPage,
    ProfilePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    StorageService,
    DatabaseService,
    ImageService,
  ]
})
export class AppModule {}
