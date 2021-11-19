import { Categoria } from './Categoria';
import { Persona } from './Persona';
import { Subcategoria } from './Subcategoria';

export class FichaClinica {
  idFichaClinica!: number;
  fechaHora!: string;
  idEmpleado!: Persona;
  idCliente!: Persona;
  //   idCategoria!: Categoria;
  idTipoProducto!: Subcategoria;
  motivoConsulta!: string;
  diagnostico!: string;
  observacion!: string;
}
