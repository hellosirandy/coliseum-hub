import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaguePage } from './league/league';
@NgModule({
	declarations: [
    LeaguePage,
	],
	imports: [
		IonicPageModule.forChild(LeaguePage),
	],
	exports: [
    LeaguePage,
	]
})
export class PagesModule {}
