import { NgModule } from '@angular/core';
import { MenuListComponent } from './menu-list/menu-list';
import { MenuItemComponent } from './menu-item/menu-item';
import { IonicPageModule } from 'ionic-angular';
import { DirectivesModule } from '../directives/directives.module';
import { StadiumCardComponent } from './stadium-card/stadium-card';
import { CarouselComponent } from './carousel/carousel';
import { HomeRecommendationComponent } from './home-recommendation/home-recommendation';
import { AboutSectionComponent } from './about-section/about-section';
import { AlbumSectionComponent } from './album-section/album-section';
@NgModule({
	declarations: [
		MenuListComponent,
    MenuItemComponent,
    StadiumCardComponent,
    CarouselComponent,
    HomeRecommendationComponent,
    AboutSectionComponent,
    AlbumSectionComponent,
	],
	imports: [
		IonicPageModule.forChild(MenuListComponent),
		IonicPageModule.forChild(MenuItemComponent),
		IonicPageModule.forChild(StadiumCardComponent),
		DirectivesModule,
	],
	exports: [
		MenuListComponent,
    MenuItemComponent,
    StadiumCardComponent,
    CarouselComponent,
    HomeRecommendationComponent,
    AboutSectionComponent,
    AlbumSectionComponent,
	]
})
export class ComponentsModule {}
