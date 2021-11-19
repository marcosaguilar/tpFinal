import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { listadatos } from '../models/ListaDatos';
import { PresentacionProducto } from '../models/PresentacionProducto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  endpoint = 'http://181.123.243.5:8080/stock-pwfe/presentacionProducto';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<listadatos<PresentacionProducto>> {
    return this.http.get<listadatos<PresentacionProducto>>(this.endpoint);
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
