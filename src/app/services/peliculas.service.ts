import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie, Cartelera } from '../interfaces/cartelera-response';
import { MovieDetails } from '../interfaces/movie-response';
import { Cast, CreditsDetails } from '../interfaces/credits-response';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private pageAux = 1;
  public cargando = false;

  constructor( private http: HttpClient) { }

  get params() {
    return {
      api_key: '2bf85cc02310973dd70a88ee1ba84b2d',
      language: 'en-US',
      page: this.pageAux.toString()
    }
  }

  resetCarteleraPage() {
    this.pageAux = 1;
  }

  getCartelera(): Observable<Movie[]> {

    if( this.cargando ){
      return;
    }

    this.cargando = true;

    return this.http.get<Cartelera>(`${this.baseUrl}/movie/now_playing`,{
     params: this.params
   }).pipe(
     map( (resp) => resp.results ),
     tap( () => {
       this.pageAux += 1;
       this.cargando = false;
     })
   );
  }

  buscarPeliculas( texto: string ): Observable<Movie[]> {

    const params = { ...this.params, page: '1', query: texto};

    //https://api.themoviedb.org/3/search/movie
    return this.http.get<Cartelera>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results)
    )
  }


  getPeliculaDetalle( id : string ){

    return this.http.get<MovieDetails>(`${ this.baseUrl }/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError( err => of(null) )
    )
  }


  getCast( id : string ): Observable<Cast[]>{

    return this.http.get<CreditsDetails>(`${ this.baseUrl }/movie/${ id }/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast),
      catchError( err => of([]) )
    );
  }
}
