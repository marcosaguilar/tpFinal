import { Component, OnInit } from '@angular/core';

import {
  NgbDateStruct,
  NgbModal,
  ModalDismissReasons,
  NgbDate,
} from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/models/Persona';
import { PersonaService } from 'src/app/services/persona.service';
import { concatMap, tap } from 'rxjs/operators';
import { FichaClinicaService } from 'src/app/services/ficha-clinica.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { Reserva } from 'src/app/models/Reserva';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  reservas: Reserva[] = [];
  empleados: Persona[] = [];
  clientes: Persona[] = [];

  fechaDesde!: NgbDate;
  fechaHasta!: NgbDate;
  cliente: Persona = new Persona();
  empleado: Persona = new Persona();

  fechaD = '';
  fechaH = '';

  observacion = '';

  closeResult = '';


  constructor(
    private personaService: PersonaService,
    private fichaClinicaService: FichaClinicaService,
    private modalService: NgbModal,
    private reservaService: ReservaService,
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

    //obtener reservas del dia actual
    this.reservaService.getReservasRangoFechas(formatDate(new Date(), 'yyyyMMdd', 'en'),formatDate(new Date(), 'yyyyMMdd', 'en')).subscribe(
      (data) => (this.reservas = data.lista),
      (error) => console.log('no se pudieron conseguir las reservas')
    );
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


  filtrarReservas(): void {


    if(this.fechaDesde!=undefined){
      this.fechaD =
      this.fechaDesde.year.toString() +
      this.parseNumber(this.fechaDesde.month) +
      this.parseNumber(this.fechaDesde.day);
    }

    if(this.fechaHasta!=undefined){
      this.fechaH =
      this.fechaHasta.year.toString() +
      this.parseNumber(this.fechaHasta.month) +
      this.parseNumber(this.fechaHasta.day);
    }


    this.reservaService.getReservasFiltro(this.empleado,this.cliente,
      this.fechaD,
      this.fechaH).subscribe(
      (data) => (this.reservas = data.lista),
      (error) => console.log('no se pudieron conseguir las reservas')
    );
  }

  modificarReserva(reserva: Reserva) {
    this.reservaService.putReserva(reserva, this.observacion).subscribe(
      (data: any) => this.filtrarReservas(),
      (error: any) => console.log('no se pudo modificar la reserva')
    );
  }

  cancelarReserva(reserva: Reserva) {
    this.reservaService.deleteReserva(reserva).subscribe(
      (data: any) => this.filtrarReservas(),
      (error: any) => console.log('no se pudo modificar la reserva')
    );
  }


  openModificar(content: any, reserva: Reserva) {
    this.observacion = '';
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          //actualizar reserva
          this.modificarReserva(reserva);
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

}

