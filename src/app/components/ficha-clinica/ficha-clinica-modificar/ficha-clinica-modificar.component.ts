import { Component, OnInit } from '@angular/core';
import {
  NgbDateStruct,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { concatMap, tap } from 'rxjs/operators';
import { Categoria } from 'src/app/models/Categoria';
import { Persona } from 'src/app/models/Persona';
import { Subcategoria } from 'src/app/models/Subcategoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FichaClinicaService } from 'src/app/services/ficha-clinica.service';
import { PersonaService } from 'src/app/services/persona.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { ActivatedRoute } from '@angular/router';
import { FichaClinica } from 'src/app/models/FichaClinica';

@Component({
  selector: 'app-ficha-clinica-modificar',
  templateUrl: './ficha-clinica-modificar.component.html',
  styleUrls: ['./ficha-clinica-modificar.component.css'],
})
export class FichaClinicaModificarComponent implements OnInit {
  fecha!: string;
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  empleados: Persona[] = [];
  clientes: Persona[] = [];
  fichasClinicas: FichaClinica[] = [];
  FichaClinica!: FichaClinica;
  closeResult = '';
  //variables del formulario
  categoria: string = '';
  subcategoria: string = '';
  cliente: Persona = new Persona();
  empleado: Persona = new Persona();
  motivo: string = '';
  diagnostico: string = '';
  observacion: string = '';
  fichaId: number = 0;

  constructor(
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService,
    private personaService: PersonaService,
    private fichaClinicaService: FichaClinicaService,
    private modalService: NgbModal,
    private _location: Location,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fichaId = Number(this.router.snapshot.params.id); //tipo string

    this.fichaClinicaService.getFichasClinicas().subscribe(
      (response) => {
        this.fichasClinicas = response.lista;
        for (let index = 0; index < this.fichasClinicas.length; index++) {
          const ficha = this.fichasClinicas[index];
          if (ficha.idFichaClinica == this.fichaId) {
            this.FichaClinica = ficha;
            console.log(this.FichaClinica);
            break;
          }
        }
        this.motivo = this.FichaClinica.motivoConsulta;
        this.diagnostico = this.FichaClinica.diagnostico;
        this.observacion = this.FichaClinica.observacion;
        this.empleado = this.FichaClinica.idEmpleado;
        this.cliente = this.FichaClinica.idCliente;
        this.categoria =
          this.FichaClinica.idTipoProducto.idCategoria.descripcion;
        this.subcategoria = this.FichaClinica.idTipoProducto.descripcion;
        this.fecha = this.FichaClinica.fechaHora.split(' ')[0];
        console.log(this.fecha);
        // let fecha = {
        //   year: fechaString.split('-')[0],
        //   month: fechaString.split('-')[1],
        //   day: fechaString.split('-')[2],
        // };
        // this.fecha = fecha;
        // console.log(fecha);
      },
      (error) => console.log('No se pudieron obtener las fichas clinicas')
    );
  }

  guardarFichaClinica(): void {
    this.fichaClinicaService.actualizarFicha(this.fichaId, this.observacion);
  }

  back(): void {
    this._location.back();
  }
}
