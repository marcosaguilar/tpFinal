import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Venta } from '../models/Venta';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
 
  ventas: Venta[] = [{id: 1, fecha: {year:2021, month:10, day:10}, nroFactura: 123, cliente: {ruc: 1, nombreApellido: 'nombre', email: 'email'},
   total: 123, detalle: [
     {producto: {codigo: 1, existencia: 2, nombre: 'nombre', precio: 123}, cantidad: 123, totalDetalle: 123}
    ]
  }];

  constructor(private http: HttpClient) {}

  addVenta(venta: Venta): void {
    this.ventas.push(venta);
  }

  putVenta(venta: Venta, ventaActualizado: Venta): void {
    const index = this.ventas.indexOf(venta);
    if (index > -1) {
      this.ventas[index] = ventaActualizado;
    }
  }

  deleteVenta(venta: Venta): void {
    const index = this.ventas.indexOf(venta);
    if (index > -1) {
      this.ventas.splice(index, 1);
    }
  }

  getVenta(id: number): Venta{
    for(var x = 0; this.ventas.length; x++){
      if(this.ventas[x].id == id){
        return this.ventas[x];
      }
    }
    return (this.ventas[0]);   // tiene que retornar si o si venta
  }

  getVentas(): Venta[] {
    return this.ventas;
  }

}