import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  palabraBuscar: string = '';
  moviesBuscar: Movie[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private pelisService: PeliculasService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      console.log( params );
      this.palabraBuscar = params.texto;

      this.pelisService.buscarPeliculas( params.texto ).subscribe( movies => {
        console.log( movies );
        this.moviesBuscar = movies;
      })
    })
  }

}
