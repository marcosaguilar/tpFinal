import { Cliente } from "./Cliente";
import { VentaDetalle } from "./VentaDetalle";
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export class Venta {
  id!: number;
  fecha!: NgbDateStruct;
  nroFactura!: number;
  cliente!: Cliente;
  total!: number;
  detalle!: VentaDetalle [];
}