import { NgModule } from '@angular/core';
import { MenuListComponent } from './menu-list/menu-list';
import { MenuItemComponent } from './menu-item/menu-item';
import { IonicPageModule } from 'ionic-angular';
import { DirectivesModule } from '../directives/directives.module';
import { StadiumCardComponent } from './stadium-card/stadium-card';
import { CarouselComponent } from './carousel/carousel';
@NgModule({
	declarations: [
		MenuListComponent,
    MenuItemComponent,
    StadiumCardComponent,
    CarouselComponent,
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
	]
})
export class ComponentsModule {}
