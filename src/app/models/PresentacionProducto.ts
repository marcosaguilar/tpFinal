import { Subcategoria } from './Subcategoria';

class TipoProducto {
  idProducto!: number;
  idTipoProducto!: Subcategoria;
}

export class PresentacionProducto {
  idPresentacionProducto!: number;
  nombre!: string;
  descripcionGeneral!: string;
  idProducto!: TipoProducto;
}
