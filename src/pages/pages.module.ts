import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeagueViewPage } from './league-view/league-view';
import { EditStadiumPage } from './edit-stadium/edit-stadium';
import { StadiumViewPage } from './stadium-view/stadium-view';
import { FileControlPage } from './file-control/file-control'
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../directives/directives.module';
import { ComponentsModule } from '../components/components.module';
import { AuthService } from '../providers/auth.service';

@NgModule({
	declarations: [
    LeagueViewPage,
		EditStadiumPage,
		StadiumViewPage,
		FileControlPage,
	],
	imports: [
		IonicPageModule.forChild(LeagueViewPage),
		IonicPageModule.forChild(EditStadiumPage),
		IonicPageModule.forChild(StadiumViewPage),
		IonicPageModule.forChild(FileControlPage),
		TranslateModule,
		DirectivesModule,
		ComponentsModule,
	],
	exports: [
    LeagueViewPage,
		EditStadiumPage,
		StadiumViewPage,
		FileControlPage,
	],
	providers: [
		AuthService,
	]
})
export class PagesModule {}
