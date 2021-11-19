import { Persona } from './Persona';


export class Reserva {
  idReserva!: string;
  fecha!: string;
  idEmpleado!: Persona;
  idCliente!: Persona;
  observacion!: string;
  flagEstado!: string;
  flagAsistio!: string;
}
