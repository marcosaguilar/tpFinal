import { Component, OnInit } from '@angular/core';
import {
  NgbDateStruct,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { concatMap, tap } from 'rxjs/operators';
import { Persona } from 'src/app/models/Persona';
import { PersonaService } from 'src/app/services/persona.service';
import { ActivatedRoute } from '@angular/router';
import { FichaClinica } from 'src/app/models/FichaClinica';
import { FichaClinicaService } from 'src/app/services/ficha-clinica.service';

@Component({
  selector: 'app-servicio-agregar',
  templateUrl: './servicio-agregar.component.html',
  styleUrls: ['./servicio-agregar.component.css'],
})
export class ServicioAgregarComponent implements OnInit {
  closeResult = '';
  empleados: Persona[] = [];
  clientes: Persona[] = [];
  cliente: Persona = new Persona();
  empleado: Persona = new Persona();
  observacion: string = '';
  fecha!: NgbDateStruct;
  fichaClinica!: FichaClinica;

  constructor(
    private personaService: PersonaService,
    private router: ActivatedRoute,
    private fichaClinicaService: FichaClinicaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    let idFicha = this.router.snapshot.params.id;
    this.fichaClinicaService.getFichasClinicas().subscribe((res) => {
      let listas = res.lista;
      for (let index = 0; index < listas.length; index++) {
        if (listas[index].idFichaClinica == idFicha)
          this.fichaClinica = listas[index];
      }
      console.log(this.fichaClinica);
    });

    let personas: Persona[] = [];
    let empleados: Persona[] = [];

    this.personaService.getEmpleados().subscribe(
      (response) => (this.empleados = response.lista),
      (error) => console.log('No se pudo obtener la lista de empleados')
    );

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

  private containsObject(persona: Persona, list: Persona[]) {
    for (let index = 0; index < list.length; index++) {
      if (list[index] === persona) return true;
    }
    return false;
  }

  openEmpleados(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          (this.closeResult = `Closed with: ${result}`), console.log('TEST');
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
}
