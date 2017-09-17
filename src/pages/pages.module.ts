import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaguePage } from './league/league';
import { EditStadiumPage } from './edit-stadium/edit-stadium';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../directives/directives.module';
import { AuthService } from '../providers/auth.service';

@NgModule({
	declarations: [
    LeaguePage,
		EditStadiumPage,
	],
	imports: [
		IonicPageModule.forChild(LeaguePage),
		IonicPageModule.forChild(EditStadiumPage),
		TranslateModule,
		DirectivesModule,
	],
	exports: [
    LeaguePage,
		EditStadiumPage
	],
	providers: [
		AuthService,
	]
})
export class PagesModule {}
