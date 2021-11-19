import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FichaClinica } from '../models/FichaClinica';
import { listadatos } from '../models/ListaDatos';
import { Persona } from '../models/Persona';
import { Subcategoria } from '../models/Subcategoria';

@Injectable({
  providedIn: 'root',
})
export class FichaClinicaService {
  private endpoint = 'http://181.123.243.5:8080/stock-pwfe/fichaClinica';

  constructor(private http: HttpClient) {}

  getFichasClinicas(): Observable<listadatos<FichaClinica>> {
    return this.http.get<listadatos<FichaClinica>>(this.endpoint);
  }

  getFichasRangoFechas(
    fechaDesde: string,
    fechaHasta: string
  ): Observable<listadatos<FichaClinica>> {
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

    return this.http.get<listadatos<FichaClinica>>(_endpoint);
  }

  getFichasPaciente(idPersona: number): Observable<listadatos<FichaClinica>> {
    let _endpoint =
      this.endpoint + '?ejemplo={"idCliente":{"idPersona":' + idPersona + '}}';
    return this.http.get<listadatos<FichaClinica>>(_endpoint);
  }

  getFichasFisioterapeuta(
    idEmpleado: number
  ): Observable<listadatos<FichaClinica>> {
    let _endpoint =
      this.endpoint +
      '?ejemplo={"idEmpleado":{"idPersona":' +
      idEmpleado +
      '}}';
    return this.http.get<listadatos<FichaClinica>>(_endpoint);
  }

  getFichasSubcategoria(
    idSubcategoria: number
  ): Observable<listadatos<FichaClinica>> {
    let _endpoint =
      this.endpoint +
      '?ejemplo=' +
      encodeURI('{"idTipoProducto":{"idTipoProducto":' + idSubcategoria + '}}');
    return this.http.get<listadatos<FichaClinica>>(_endpoint);
  }

  postFichaClinica(
    motivo: string,
    diagnostico: string,
    observacion: string,
    empleado: Persona,
    cliente: Persona,
    subcategoria: Subcategoria
  ): void {
    let data = {
      motivoConsulta: motivo,
      diagnostico: diagnostico,
      observacion: observacion,
      idEmpleado: {
        idPersona: empleado.idPersona,
      },
      idCliente: {
        idPersona: cliente.idPersona,
      },
      idTipoProducto: {
        idTipoProducto: subcategoria.idTipoProducto,
      },
    };

    console.log('vamos a insertar una nueva ficha');
    console.log(data);

    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('usuario', 'usuario2');

    this.http
      .post<FichaClinica>(this.endpoint, data, { headers: httpHeaders })
      .subscribe(
        (res) => {
          console.log('Fecha Clinica creada');
          console.log(res);
        },
        (error) => console.log('No se pudo crear la ficha clinica')
      );
  }
  actualizarFicha(idFicha: number, observacion: string) {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('usuario', 'usuario2');
    let data = {
      idFichaClinica: idFicha,
      observacion: observacion,
    };
    this.http
      .put<FichaClinica>(this.endpoint, data, { headers: httpHeaders })
      .subscribe(
        (res) => {
          console.log('Fecha Clinica modificada');
          console.log(res);
        },
        (error) => console.log('No se pudo editar la ficha clinica')
      );
  }
}
