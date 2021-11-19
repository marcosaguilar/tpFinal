import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listadatos } from '../models/ListaDatos';
import { Subcategoria } from '../models/Subcategoria';

import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriaService {
  private endpoint =
    'http://181.123.243.5:8080/stock-pwfe/tipoProducto?ejemplo=';

  constructor(private http: HttpClient) {}

  getSubCategorias(categoria: Categoria): Observable<listadatos<Subcategoria>> {
    let postString =
      '{"idCategoria":{"idCategoria": ' + categoria.idCategoria + '}}';
    return this.http.get<listadatos<Subcategoria>>(
      this.endpoint + encodeURI(postString)
    );
  }
  postSubcategoria(idCategoria: number, descripcion: string) {
    let nuevaSubcategoria: Subcategoria;

    this.http
      .post<Subcategoria>('http://181.123.243.5:8080/stock-pwfe/tipoProducto', {
        idCategoria: { idCategoria: idCategoria },
        descripcion: descripcion,
      })
      .subscribe((res) => console.log(res));
  }
}
