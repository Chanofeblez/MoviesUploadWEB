import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetails } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula : MovieDetails;
  public castAux: Cast[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private peliService: PeliculasService,
               private location: Location,
               private router: Router) { }

  ngOnInit(): void {

    const id= this.activatedRoute.snapshot.params.id;

    combineLatest([
      this.peliService.getPeliculaDetalle( id ),
      this.peliService.getCast( id )
    ]).subscribe( ([peli, cast]) => {

      if( !peli){
          this.router.navigateByUrl('/home');
          return ;
         }
      this.pelicula = peli;

      this.castAux = cast.filter( actor => actor.profile_path !== null );
    });

   // this.peliService.getPeliculaDetalle( id ).subscribe( movie => {
     // console.log( movie );
    // if( !movie){
   //    this.router.navigateByUrl('/home');
   //    return ;
   //  }
   //  this.pelicula = movie;
  //  });

   // this.peliService.getCast( id ).subscribe( cast => {
   //   console.log( cast );
   //   this.castAux = cast.filter( actor => actor.profile_path !== null );
   // });
  }

  onRegresar() {
    this.location.back();
  }

}
