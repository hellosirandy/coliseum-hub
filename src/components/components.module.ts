import { NgModule } from '@angular/core';
import { MenuListComponent } from './menu-list/menu-list';
import { MenuItemComponent } from './menu-item/menu-item';
import { IonicPageModule } from 'ionic-angular';
@NgModule({
	declarations: [
		MenuListComponent,
    MenuItemComponent,
	],
	imports: [
		IonicPageModule.forChild(MenuListComponent),
		IonicPageModule.forChild(MenuItemComponent),
	],
	exports: [
		MenuListComponent,
    MenuItemComponent,
	]
})
export class ComponentsModule {}
