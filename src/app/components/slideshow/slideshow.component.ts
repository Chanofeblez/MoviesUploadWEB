import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movieSlides: Movie[];

  public mySwiper : Swiper;

  constructor() { }

  ngAfterViewInit() {

    this.mySwiper = new Swiper('.swiper-container', {
      
      loop: true,
    })

  }

  ngOnInit(): void {

  }

  onSlideNext() {

    this.mySwiper.slideNext();
  }


  onSlidePrev() {

    this.mySwiper.slidePrev();
  }

}
