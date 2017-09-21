import { NgModule } from '@angular/core';
import { SquareDirective } from './square/square';
import { GoldenDirective } from './golden/golden';
@NgModule({
	declarations: [SquareDirective,
    GoldenDirective],
	imports: [],
	exports: [SquareDirective,
    GoldenDirective]
})
export class DirectivesModule {}
