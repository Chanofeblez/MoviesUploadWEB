import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public moviesHome: Movie[] = [];
  public moviesSlideshow : Movie[] = [];

  @HostListener('window: scroll', ['$event'])
  onScroll() {

    const pos = (document.documentElement.scrollTop || document.body.scrollTop ) + 1000;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight );

    if ( pos > max ){
      if( this.peliService.cargando ) { return; }
      this.peliService.getCartelera().subscribe( movies => {
      this.moviesHome.push( ...movies );
      });
    }
  }

  constructor(  private peliService: PeliculasService ) { 

    peliService.getCartelera()
         .subscribe( movies => {
           this.moviesHome = movies;
           this.moviesSlideshow = movies;
         });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.peliService.resetCarteleraPage();
  }

}
