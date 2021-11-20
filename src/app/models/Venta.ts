import { Cliente } from "./Cliente";
import { VentaDetalle } from "./VentaDetalle";

export class Venta {
  id!: number;
  fecha!: string;
  nroFactura!: number;
  cliente!: Cliente;
  total!: number;
  detalle!: VentaDetalle [];
}