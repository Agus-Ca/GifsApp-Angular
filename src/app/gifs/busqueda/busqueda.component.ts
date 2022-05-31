import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {
  
  constructor (private gifsService:GifsService) {}

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  buscar():void {
    const valor = this.txtBuscar.nativeElement.value;

    if( valor.trim().length == 0) {
      this.limpiarBusqueda();
      return;
    }

    this.gifsService.buscarGifs(valor);
    this.limpiarBusqueda();
  }

  limpiarBusqueda():void {
    this.txtBuscar.nativeElement.value = '';
  }
}