import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
 
  productos: Producto[] = [{codigo: 1, existencia: 5, nombre: 'nombreProducto', precio: 321}];

  endpoint = 'http://181.123.243.5:8080/stock-pwfe/presentacionProducto';

  constructor(private http: HttpClient) {}


  addProducto(producto: Producto): void {
    this.productos.push(producto);
  }

  putProducto(producto: Producto, productoActualizado: Producto): void {
    const index = this.productos.indexOf(producto);
    if (index > -1) {
      this.productos[index] = productoActualizado;
    }
  }

  deleteProducto(producto: Producto): void {
    const index = this.productos.indexOf(producto);
    if (index > -1) {
      this.productos.splice(index, 1);
    }
  }

  getProducto(codigo: number): Producto{
    for(var x = 0; this.productos.length; x++){
      if(this.productos[x].codigo == codigo){
        return this.productos[x];
      }
    }
    return (this.productos[0]);   // tiene que retornar si o si producto
  }

  getListaProductos(): Producto[]{
    return this.productos;
  }

}