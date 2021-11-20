import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { listadatos } from '../models/ListaDatos';
import { PresentacionProducto } from '../models/PresentacionProducto';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
 
  productos: Producto[] = [{codigo: 1, existencia: 'existencia', nombre: 'nombreProducto', precio: 321}];

  endpoint = 'http://181.123.243.5:8080/stock-pwfe/presentacionProducto';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<listadatos<PresentacionProducto>> {
    return this.http.get<listadatos<PresentacionProducto>>(this.endpoint);
  }

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



  // postPresentacionProducto(): {

  // }
}

// "codigo": "500",
// "ﬂagServicio": "S",
// "idProducto": {
// "idProducto": 3
// },
// "nombre": "TRATAMIENTO RODILLA",
// "existenciaProducto": {
// "precioVenta": 200000
// }

// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/internal/operators/map';
// import { listadatos } from '../models/ListaDatos';
// import { Persona } from '../models/Persona';

// @Injectable({
//   providedIn: 'root',
// })
// export class PersonaService {
//   endpoint = 'http://181.123.243.5:8080/stock-pwfe/persona';
//   constructor(private http: HttpClient) {}

//   getEmpleados(): Observable<listadatos<Persona>> {
//     let _endpoint =
//       this.endpoint +
//       '?ejemplo=' +
//       encodeURI('{"soloUsuariosDelSistema":true}');

//     return this.http.get<listadatos<Persona>>(_endpoint);
//   }

//   getPersonas(): Observable<listadatos<Persona>> {
//     return this.http.get<listadatos<Persona>>(this.endpoint);
//   }

//   postPersona(persona: Persona): void {
//     let data = {
//       nombre: persona.nombre,
//       apellido: persona.apellido,
//       email: persona.email,
//       telefono: persona.telefono,
//       cedula: persona.cedula,
//       tipoPersona: 'FISICA',
//       fechaNacimiento: persona.fechaNacimiento,
//     };

//     const httpHeaders = new HttpHeaders().append(
//       'Content-Type',
//       'application/json'
//     );

//     this.http
//       .post<Persona>(this.endpoint, data, { headers: httpHeaders })
//       .subscribe(
//         (res) => {
//           console.log('Persona guardada');
//           console.log(res);
//         },
//         (error) => console.log('No se pudo guardar la persona')
//       );
//   }
// }
