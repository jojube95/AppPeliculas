import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class MoviesProvider {
  //Declare the strings and parameters used by the api.
  baseUrl:string;
  titleFilter:string;
  typeFilter:string;
  yearFilter:string;
    
  constructor(public http: HttpClient) {
    //Initializate parameters.
    this.baseUrl = 'http://www.omdbapi.com/?apikey=4c7c15e2';
    this.titleFilter = '&s=';
    this.typeFilter = '&type=';
    this.yearFilter = '&y=';
  }

  //Get the movies by title, type and year
  getMovies(title:string, type:string, year:string){
    if(type.length == 0){
      if(year.length == 0){
        return this.http.get(this.baseUrl+this.titleFilter+title).map((res) => res);
      }
      else{
        return this.http.get(this.baseUrl+this.titleFilter+title+this.yearFilter+year).map((res) => res);
      }
    }
    else{
      if(year.length == 0){
        return this.http.get(this.baseUrl+this.titleFilter+title+this.typeFilter+type).map((res) => res);
      }
      else{
        return this.http.get(this.baseUrl+this.titleFilter+title+this.typeFilter+type+this.yearFilter+year).map((res) => res);
      }
    }

  }

  //Get particular movie with &t parameter to show the details. 
  getMovieAux(title:string, type:string, year:string){
    return this.http.get(this.baseUrl+'&t='+title+this.typeFilter+type+this.yearFilter+year).map((res) => res);
  }

}
  


