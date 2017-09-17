import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaguePage } from './league/league';
import { EditStadiumPage } from './edit-stadium/edit-stadium';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
	declarations: [
    LeaguePage,
		EditStadiumPage,
	],
	imports: [
		IonicPageModule.forChild(LeaguePage),
		IonicPageModule.forChild(EditStadiumPage),
		TranslateModule,
		DirectivesModule
	],
	exports: [
    LeaguePage,
		EditStadiumPage
	]
})
export class PagesModule {}
