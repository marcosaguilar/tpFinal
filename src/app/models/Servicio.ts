import { Injectable } from '@angular/core';
import { FichaClinica } from './FichaClinica';

@Injectable()
export class Servicio {
  fechaHora!: string;
  idFichaClinica!: FichaClinica;
}
