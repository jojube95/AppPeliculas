import { NgModule } from '@angular/core';
import { MovieFormComponent } from './movieForm/movieForm.component';
import { MovieListComponent } from './movieList/movieList.component';
@NgModule({
	declarations: [MovieFormComponent,
    MovieListComponent],
	imports: [],
	exports: [MovieFormComponent,
    MovieListComponent]
})
export class ComponentsModule {}
