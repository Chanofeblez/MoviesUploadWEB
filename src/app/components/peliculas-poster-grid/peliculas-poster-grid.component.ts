import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movieSlides: Movie[];

  constructor( private router: Router) { }

  ngOnInit(): void {
    console.log(this.movieSlides);
  }

  onMovieClick( movie: Movie ) {
   console.log( movie );
   this.router.navigate(['/pelicula', movie.id ]);
  }

 
}
