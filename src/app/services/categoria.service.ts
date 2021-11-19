import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

import { listadatos } from '../models/ListaDatos';
import { Categoria } from '../models/Categoria';
import { SubcategoriaService } from './subcategoria.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private endpoint = 'http://181.123.243.5:8080/stock-pwfe/categoria';

  constructor(
    private http: HttpClient,
    private subcategoriaService: SubcategoriaService
  ) {}

  getCategorias(): Observable<listadatos<Categoria>> {
    return this.http.get<listadatos<Categoria>>(this.endpoint);
  }

  postCategoria(descripcionCategoria: string) {
    let nuevaCategoria: Categoria;

    this.http
      .post<Categoria>(this.endpoint, { descripcion: descripcionCategoria })
      .subscribe((res) => {});
  }
}
