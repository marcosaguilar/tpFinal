import { Injectable } from '@angular/core';
import { Categoria } from './Categoria';

@Injectable()
export class Subcategoria {
  idTipoProducto!: number;
  descripcion!: string;
  idCategoria!: Categoria;
}
