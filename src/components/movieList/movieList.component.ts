import { Component, Input } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies.provider';

@Component({
  selector: 'movieList',
  templateUrl: 'movieList.component.html'
})
export class MovieListComponent {
  //Get the shared object from the parent component.
  @Input() movies:any;

  constructor(public alertCtrl:AlertController, public moviesProvider:MoviesProvider) {
    
  }

  //Method that shows the clicked movie detail.
  showDetail(i:number){
    //Get the details from the api, because the &s api parameter don't show them. We need to use &t parameter now.
    this.moviesProvider.getMovieAux(this.movies[i].Title, this.movies[i].Type, this.movies[i].Year).subscribe(movie => {
        let movieAux:any;
        movieAux = movie;
        
        //Declare an alert to show the detail.
        let alert = this.alertCtrl.create({
          
          title: this.movies[i].Title + ' ('+ this.movies[i].Year+')',
          subTitle: `<ul>
                      <li>Director: ` + movieAux.Director + `</li>
                      <li>Actores: ` + movieAux.Actors + `</li>
                      <li>Género: ` + movieAux.Genre + `</li>
                      <li>Duración: ` + movieAux.Runtime + `</li>
                      <li>Puntuación: ` + movieAux.imdbRating + `</li>
                    </ul>`,
          buttons: ['OK']
        });
        alert.present();
        
     });
        
  }
}
