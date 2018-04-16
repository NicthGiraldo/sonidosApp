import { Component } from '@angular/core';
import { ANIMALES } from '../../data/data.animales'; 
import { Animal } from '../../interfaces/animal.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = [];

  constructor() {

    this.animales = ANIMALES.slice(0);
  }

  reproducir( animal:Animal ){
    console.log( animal )
    let audio = new Audio();
    audio.src= animal.audio;
    audio.load();
    audio.play();
    animal.reproduciendo = true;
    setTimeout(()=>animal.reproduciendo = false, animal.duracion * 1000);
  }

}
