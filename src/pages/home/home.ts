import { Component } from '@angular/core';
import { ANIMALES } from '../../data/data.animales'; 
import { Animal } from '../../interfaces/animal.interface';//se importa la clase "interface" para trabajar con ella
import { Refresher, reorderArray } from 'ionic-angular'

//"component" son los componentes propios de la pagina
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = []; //se crea este array vacio para guardar la informacion de "data.animales.ts"
  audio = new Audio(); //se crea el objeto audio-- "Audio" es una funcion propia de html
  audioTiempo: any;
  ordenando:boolean = false;

  constructor() {
    //en "data.animales.ts" se esta creando un array con la informacion de los animales "ANIMALES" 
    this.animales = ANIMALES.slice(0);
  }

  reproducir( animal:Animal ){//se crea una funcion publica que recibe como parametro un obj de timpo "Animal" osea la interface
    this.pausarAudio(animal);
    if(animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }
    console.log( animal )//aqui se esta mostrando la informacion en la consola
    this.audio.src= animal.audio;
    this.audio.load();//"load" es una funcion propia de "Audio"
    this.audio.play();//"play" es una funion propia "Audio"
    animal.reproduciendo = true;
    this.audioTiempo = setTimeout(()=>animal.reproduciendo = false, animal.duracion * 1000);//"controla el tiempo de reproduccion del audio, la duracion se multiplica por 1k para pasarlo a milisegundos"
  }

  private pausarAudio(animalSel:Animal){
    clearTimeout(this.audioTiempo);//limpiamos el audio
    this.audio.pause();//funcion propia de "Audio"
    this.audio.currentTime = 0;//el "currentTime" igualado a 0 es para que se inicie desde el principio 
    for(let animal of this.animales){//se crea un for que recorra todos el array de animales
      if(animal.nombre != animalSel.nombre){//se coloca en falso todos los animales que no sean el seleccionado en la app
        animal.reproduciendo = false;
      }
    }
  }

  borrarAnimal(idx:number){
    this.animales.splice(idx, 1);
  }

  recargarAnimales(refresher:Refresher){

    setTimeout(() => {
      console.log('termino el refresh');
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }, 1500);
  }

  reordenarAnimales(indices:any){
    this.animales = reorderArray(this.animales, indices);
  }

}
