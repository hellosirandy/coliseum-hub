import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeagueViewPage } from './league-view/league-view';
import { EditStadiumPage } from './edit-stadium/edit-stadium';
import { StadiumViewPage } from './stadium-view/stadium-view';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../directives/directives.module';
import { AuthService } from '../providers/auth.service';

@NgModule({
	declarations: [
    LeagueViewPage,
		EditStadiumPage,
		StadiumViewPage,
	],
	imports: [
		IonicPageModule.forChild(LeagueViewPage),
		IonicPageModule.forChild(EditStadiumPage),
		IonicPageModule.forChild(StadiumViewPage),
		TranslateModule,
		DirectivesModule,
	],
	exports: [
    LeagueViewPage,
		EditStadiumPage,
		StadiumViewPage,
	],
	providers: [
		AuthService,
	]
})
export class PagesModule {}
