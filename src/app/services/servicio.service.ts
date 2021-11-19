import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FichaClinica } from '../models/FichaClinica';
import { listadatos } from '../models/ListaDatos';
import { Servicio } from '../models/Servicio';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  endpoint = 'http://181.123.243.5:8080/stock-pwfe/servicio';

  constructor(private http: HttpClient) {}

  getServicios(): Observable<listadatos<Servicio>> {
    return this.http.get<listadatos<Servicio>>(this.endpoint);
  }

  getServiciosRangoFechas(
    fechaDesde: string,
    fechaHasta: string
  ): Observable<listadatos<Servicio>> {
    let _endpoint =
      this.endpoint +
      '?ejemplo=' +
      encodeURI(
        '{"fechaDesdeCadena":"' +
          fechaDesde +
          '","fechaHastaCadena":"' +
          fechaHasta +
          '"}'
      );

    return this.http.get<listadatos<Servicio>>(_endpoint);
  }

  postServicio(idFicha: number, observacion: number) {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('usuario', 'usuario2');

    let data = {
      idFichaClinica: {
        idFichaClinica: idFicha,
      },
      observacion: observacion,
    };

    this.http
      .post<Servicio>(this.endpoint, data, { headers: httpHeaders })
      .subscribe(
        (data) => console.log(data),
        (err) => console.log(err)
      );
  }
}
