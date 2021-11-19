import { Component, OnInit } from '@angular/core';
import {
  NgbDateStruct,
  NgbModal,
  ModalDismissReasons,
  NgbDate,
} from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { concatMap, tap } from 'rxjs/operators';
import { Persona } from 'src/app/models/Persona';
import { ReservaService } from 'src/app/services/reserva.service';
import { PersonaService } from 'src/app/services/persona.service';
import { AgendaLibre } from 'src/app/models/AgendaLibre';
import { Observable } from 'rxjs';
import { Reserva } from 'src/app/models/Reserva';


@Component({
  selector: 'app-reserva-agregar',
  templateUrl: './reserva-agregar.component.html',
  styleUrls: ['./reserva-agregar.component.css']
})
export class ReservaAgregarComponent implements OnInit {
  fecha!: NgbDate;
  empleados: Persona[] = [];
  clientes: Persona[] = [];
  agenda: AgendaLibre = new AgendaLibre();
  agendasLibres: AgendaLibre[] = [];
  closeResult = '';

  //variables del formulario
  cliente: Persona = new Persona();
  empleado: Persona = new Persona();
  reserva: Reserva = new Reserva();
  motivo: string = '';
  diagnostico: string = '';
  observacion: string = '';

  constructor(
    private personaService: PersonaService,
    private modalService: NgbModal,
    private _location: Location,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {

    this.personaService.getEmpleados().subscribe(
      (response) => (this.empleados = response.lista),
      (error) => console.log('No se pudo obtener la lista de empleados')
    );

    let personas: Persona[] = [];
    let empleados: Persona[] = [];

    this.personaService
      .getPersonas()
      .pipe(
        tap((res) => (personas = res.lista)),
        concatMap((res) => this.personaService.getEmpleados()),
        tap((res) => (empleados = res.lista))
      )
      .subscribe(() => {
        // console.log(personas);
        // console.log(empleados);

        for (let index = 0; index < personas.length; index++) {
          if (!this.containsObject(personas[index], empleados))
            this.clientes.push(personas[index]);
        }
      });
  }

  openEmpleados(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openClientes(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private containsObject(persona: Persona, list: Persona[]) {
    for (let index = 0; index < list.length; index++) {
      if (list[index] === persona) return true;
    }
    return false;
  }

  parseNumber(number: number): string {
    return number / 10 < 1 ? '0' + number.toString() : number.toString();
  }

  back(): void {
    this._location.back();
  }

  openAgendaLibre(content: any) {
    const t = this.reservaService.getAgendas(this.empleado.idPersona,this.fecha).subscribe(
      (response) =>{
        this.agendasLibres = response;

    this.modalService
    .open(content, { ariaLabelledBy: 'modal-basic-title' })
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
      } ,
      (error) => console.log('No se pudieron obtener las agendas')
    );
  }

  guardarReserva(){
    this.reservaService.postReserva(this.fecha.year.toString() + this.parseNumber(this.fecha.month) + this.parseNumber(this.fecha.day), this.agenda.horaInicioCadena, this.agenda.horaFinCadena, this.empleado.idPersona, this.cliente.idPersona, this.observacion)
    .subscribe(
      (res) => {
        console.log('Reserva creada');
        //volver al filtro
        this.back();
      },
      (error) => console.log('No se pudo crear la reserva')
    );
  }

}

