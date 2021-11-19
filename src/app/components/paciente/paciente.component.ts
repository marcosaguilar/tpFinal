import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { concatMap, tap } from 'rxjs/operators';
import { Persona } from 'src/app/models/Persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
})
export class PacienteComponent implements OnInit {
  pacientes: Persona[] = [];
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  telefono: string = '';
  ruc: string = '';
  cedula: string = '';
  fechaNacimiento!: NgbDateStruct;

  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {
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
            this.pacientes.push(personas[index]);
        }
      });
  }

  private containsObject(persona: Persona, list: Persona[]) {
    for (let index = 0; index < list.length; index++) {
      if (list[index] === persona) return true;
    }
    return false;
  }

  parseDate(fechaNacimiento: NgbDateStruct): string {
    console.log(fechaNacimiento);
    let fechaNac =
      fechaNacimiento.year.toString() +
      '-' +
      this.parseNumber(fechaNacimiento.month) +
      '-' +
      this.parseNumber(fechaNacimiento.day) +
      ' 00:00:00';

    return fechaNac;
  }

  parseNumber(number: number): string {
    return number / 10 <= 1 ? '0' + number.toString() : number.toString();
  }

  crearPersona() {
    let persona = new Persona();
    persona.nombre = this.nombre;
    persona.apellido = this.apellido;
    persona.email = this.email;
    persona.telefono = this.telefono;
    persona.cedula = this.cedula;
    persona.fechaNacimiento = this.parseDate(this.fechaNacimiento);

    this.personaService.postPersona(persona);

    this.nombre= '';
    this.apellido= '';
    this.email= '';
    this.telefono= '';
    this.ruc= '';
    this.cedula= '';
    this.fechaNacimiento= {
        year:0,
        month:0,
        day: 0
      };
    };

}
