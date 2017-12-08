import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { MoviesProvider } from '../../providers/movies/movies.provider';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'movieForm',
  templateUrl: 'movieForm.component.html',
})
export class MovieFormComponent {
  //Declare form values
  private todo:FormGroup;
  //Initialize array of movies, provided by the MoviesProvider and shared to the child component.
  public movies:any[] = new Array;

  constructor(private formBuilder:FormBuilder, public moviesProvider:MoviesProvider, public alertCtrl:AlertController) {
    //Initialize form values
    this.todo = this.formBuilder.group({
      title:['', Validators.required],
      type:[''],
      year:['']
    });
        
  }

  //Form submit method
  logForm(){
    //Clear the actual movies array.
    this.movies.splice(0, this.movies.length);

    //Get the movies from api, using the MoviesProvider.
    this.moviesProvider.getMovies(this.todo.value.title, this.todo.value.type, this.todo.value.year).subscribe(movies => {
      //Declare object to save the movies.
      let moviesAux:any;
      //Pass movies from the api to the declared object.
      moviesAux = movies;
      
      //Manage the errors from the api
      if(moviesAux.Response == 'False' && (moviesAux.Error == 'Movie not found!' || moviesAux.Error == 'Series not found!')){
        let alert = this.alertCtrl.create({
          title: 'No se ha encontrado.',
          subTitle: 'Inserte otros datos.',
          buttons: ['OK']
        });
        alert.present();
      }
      else{
        if(moviesAux.Response == 'False' && moviesAux.Error == 'Too many results.'){
          let alert = this.alertCtrl.create({
            title: 'Demasiados resultados.',
            subTitle: 'Filtre con más datos.',
            buttons: ['OK']
          });
          alert.present();
        }
        else{
          //Push the api movies to the shared class object movies.
          for(let i:number = 0; i < moviesAux.Search.length ; i++){
            this.movies.push(moviesAux.Search[i]);
          }
        }
      }

    });
    
  }

}
