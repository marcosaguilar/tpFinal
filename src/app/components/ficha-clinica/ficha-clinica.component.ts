import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria';
import { Subcategoria } from 'src/app/models/Subcategoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

import {
  NgbDateStruct,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/models/Persona';
import { PersonaService } from 'src/app/services/persona.service';
import { concatMap, tap } from 'rxjs/operators';
import { listadatos } from 'src/app/models/ListaDatos';
import { FichaClinicaService } from 'src/app/services/ficha-clinica.service';
import { FichaClinica } from 'src/app/models/FichaClinica';

@Component({
  selector: 'app-ficha-clinica',
  templateUrl: './ficha-clinica.component.html',
  styleUrls: ['./ficha-clinica.component.css'],
})
export class FichaClinicaComponent implements OnInit {
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  fichasClinicas: FichaClinica[] = [];
  fichasFiltradas: FichaClinica[] = [];
  empleados: Persona[] = [];
  clientes: Persona[] = [];
  fechaDesde!: NgbDateStruct;
  fechaHasta!: NgbDateStruct;
  cliente: Persona = new Persona();
  empleado: Persona = new Persona();

  closeResult = '';

  //variables del formulario
  categoria: Categoria = new Categoria();
  subcategoria: Subcategoria = new Subcategoria();

  constructor(
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService,
    private personaService: PersonaService,
    private fichaClinicaService: FichaClinicaService,
    private modalService: NgbModal,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.loginService.usuariosActivos.length > 0) {
      this.categoriaService.getCategorias().subscribe(
        (response) => (this.categorias = response.lista),
        (error) => console.log('No se pudieron obtener las categorias')
      );

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

      this.fichaClinicaService.getFichasClinicas().subscribe(
        (data) => {
          this.fichasClinicas = data.lista;
          this.fichasFiltradas = this.fichasClinicas;
        },
        (error) => console.log('no se pudieron conseguir las fichas clinicas')
      );
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  onChangeCategoria() {
    this.subcategoriaService.getSubCategorias(this.categoria).subscribe(
      (response) => (this.subcategorias = response.lista),
      (error) => console.log('No se pudieron obtener las subcategorias')
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

  filtrar() {
    this.fichasFiltradas = this.fichasClinicas;
    // console.log(this.fichasFiltradas);
    const idSubCategoria = this.subcategoria.idTipoProducto;
    const idCliente = this.cliente.idPersona;
    const idEmpleado = this.empleado.idPersona;

    if (this.fechaHasta !== undefined && this.fechaDesde !== undefined) {
      let fechaD =
        this.fechaDesde.year.toString() +
        this.parseNumber(this.fechaDesde.month) +
        this.parseNumber(this.fechaDesde.day);

      let fechaH =
        this.fechaHasta.year.toString() +
        this.parseNumber(this.fechaHasta.month) +
        this.parseNumber(this.fechaHasta.day);

      this.fichaClinicaService
        .getFichasRangoFechas(fechaD, fechaH)
        .subscribe((respuesta) => {
          this.fichasFiltradas = respuesta.lista;
          // console.log(this.fichasFiltradas);
          if (Object.keys(this.subcategoria).length !== 0) {
            let listaSubCategorias = [];
            for (let index = 0; index < this.fichasFiltradas.length; index++) {
              if (
                this.fichasFiltradas[index].idTipoProducto.idTipoProducto ==
                idSubCategoria
              ) {
                console.log(this.fichasFiltradas[index].idTipoProducto);
                listaSubCategorias.push(this.fichasFiltradas[index]);
              }
            }
            if (listaSubCategorias.length > 0) {
              this.fichasFiltradas = listaSubCategorias;
            }
          }
          if (Object.keys(this.cliente).length != 0) {
            let listaFichasCliente = [];
            for (let index = 0; index < this.fichasFiltradas.length; index++) {
              if (
                this.fichasFiltradas[index].idCliente.idPersona == idCliente
              ) {
                listaFichasCliente.push(this.fichasFiltradas[index]);
              }
            }
            if (listaFichasCliente.length > 0) {
              this.fichasFiltradas = listaFichasCliente;
            }
          }
          if (Object.keys(this.empleado).length != 0) {
            let listaFichaEmpleado = [];
            for (let index = 0; index < this.fichasFiltradas.length; index++) {
              if (
                this.fichasFiltradas[index].idEmpleado.idPersona == idEmpleado
              ) {
                listaFichaEmpleado.push(this.fichasFiltradas[index]);
              }
            }
            if (listaFichaEmpleado.length > 0) {
              this.fichasFiltradas = listaFichaEmpleado;
            }
          }
        });
    }

    if (
      Object.keys(this.subcategoria).length !== 0 &&
      this.fechaHasta === undefined &&
      this.fechaDesde === undefined
    ) {
      let listaSubCategorias = [];
      let listaFichasCliente = [];
      let listaFichaEmpleado = [];
      console.log('entramos en subcategoria');
      for (let index = 0; index < this.fichasFiltradas.length; index++) {
        if (
          this.fichasFiltradas[index].idTipoProducto.idTipoProducto ===
          idSubCategoria
        ) {
          listaSubCategorias.push(this.fichasFiltradas[index]);
        }
      }
      if (listaSubCategorias.length > 0) {
        this.fichasFiltradas = listaSubCategorias;
      }
      if (Object.keys(this.cliente).length != 0) {
        for (let index = 0; index < this.fichasFiltradas.length; index++) {
          if (this.fichasFiltradas[index].idCliente.idPersona == idCliente) {
            listaFichasCliente.push(this.fichasFiltradas[index]);
          }
        }
        if (listaFichasCliente.length > 0) {
          this.fichasFiltradas = listaFichasCliente;
        }
      }
      if (Object.keys(this.empleado).length != 0) {
        for (let index = 0; index < this.fichasFiltradas.length; index++) {
          if (this.fichasFiltradas[index].idEmpleado.idPersona == idEmpleado) {
            listaFichaEmpleado.push(this.fichasFiltradas[index]);
          }
        }
        if (listaFichaEmpleado.length > 0) {
          this.fichasFiltradas = listaFichaEmpleado;
        }
      }
    }
    if (
      Object.keys(this.empleado).length != 0 &&
      Object.keys(this.subcategoria).length === 0 &&
      this.fechaHasta === undefined &&
      this.fechaDesde === undefined
    ) {
      let listaFichasCliente = [];
      let listaFichaEmpleado = [];
      for (let index = 0; index < this.fichasFiltradas.length; index++) {
        if (this.fichasFiltradas[index].idEmpleado.idPersona == idEmpleado) {
          listaFichaEmpleado.push(this.fichasFiltradas[index]);
        }
      }
      if (listaFichaEmpleado.length > 0) {
        this.fichasFiltradas = listaFichaEmpleado;
      }
      if (Object.keys(this.cliente).length != 0) {
        for (let index = 0; index < this.fichasFiltradas.length; index++) {
          if (this.fichasFiltradas[index].idCliente.idPersona == idCliente) {
            listaFichasCliente.push(this.fichasFiltradas[index]);
          }
        }
        if (listaFichasCliente.length > 0) {
          this.fichasFiltradas = listaFichasCliente;
        }
      }
    }

    if (
      Object.keys(this.cliente).length != 0 &&
      Object.keys(this.empleado).length === 0 &&
      Object.keys(this.subcategoria).length === 0 &&
      this.fechaHasta === undefined &&
      this.fechaDesde === undefined
    ) {
      let listaFichasCliente = [];
      for (let index = 0; index < this.fichasFiltradas.length; index++) {
        if (this.fichasFiltradas[index].idCliente.idPersona == idCliente) {
          listaFichasCliente.push(this.fichasFiltradas[index]);
        }
      }
      if (listaFichasCliente.length > 0) {
        this.fichasFiltradas = listaFichasCliente;
      }
    }
  }

  parseNumber(number: number): string {
    return number / 10 <= 1 ? '0' + number.toString() : number.toString();
  }
  limpiarform() {
    this.fechaDesde = {
      year: 0,
      month: 0,
      day: 0,
    };
    this.fechaHasta = {
      year: 0,
      month: 0,
      day: 0,
    };
    this.cliente = new Persona();
    this.empleado = new Persona();
    this.categoria = new Categoria();
    this.subcategoria = new Subcategoria();
  }
}
