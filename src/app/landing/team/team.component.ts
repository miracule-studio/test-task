import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(this.config);
  }

  team = [
      { id: 1, name: 'Transport Manager', tel: '+44 730 999', mail: 'alex@kcharles.co.uk', src: 'manager.jpg'},
      { id: 2, name: 'Transport Manager', tel: '+44 730 999', mail: 'alex@kcharles.co.uk', src: 'manager-2.jpg'},
      { id: 3, name: 'Transport Manager', tel: '+44 730 999', mail: 'alex@kcharles.co.uk', src: 'manager-3.jpg'},
      { id: 4, name: 'Transport Manager', tel: '+44 730 999', mail: 'alex@kcharles.co.uk', src: 'manager-4.jpg'},
      { id: 5, name: 'Transport Manager', tel: '+44 730 999', mail: 'alex@kcharles.co.uk', src: 'manager-5.jpg'},
      { id: 6, name: 'Transport Manager', tel: '+44 730 999', mail: 'alex@kcharles.co.uk', src: 'manager-6.jpg'}
  ];

  config: SwiperOptions = {
    //pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    spaceBetween: 25,
    allowTouchMove: false,
    autoplay: { delay: 6000, disableOnInteraction: true },
    breakpoints: {
      1024: { slidesPerView: 6 },
      500: { slidesPerView: 4 },
      400: { slidesPerView: 3 },
      300: { slidesPerView: 2, allowTouchMove: true }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true
  };


}
