import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaguePage } from './league/league';
import { NewStadiumPage } from './new-stadium/new-stadium';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
    LeaguePage,
		NewStadiumPage,
	],
	imports: [
		IonicPageModule.forChild(LeaguePage),
		IonicPageModule.forChild(NewStadiumPage),
		TranslateModule
	],
	exports: [
    LeaguePage,
		NewStadiumPage
	]
})
export class PagesModule {}
