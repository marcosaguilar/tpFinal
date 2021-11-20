import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Categoria } from 'src/app/models/Categoria';
import { Persona } from 'src/app/models/Persona';
import { Subcategoria } from 'src/app/models/Subcategoria';
import { FichaClinica } from 'src/app/models/FichaClinica';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/Producto';

@Component({
  selector: 'app-administracion-producto-agregar',
  templateUrl: './administracion-producto-agregar.component.html',
  styleUrls: ['./administracion-producto-agregar.component.css']
})
export class AdministracionProductoAgregarComponent implements OnInit {

  codigo!: number;
  nombre!: string;
  precio!: number;
  existencia!: string;

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
  producto: Producto = new Producto();

  constructor(
    private productoService: ProductoService,
    private _location: Location
  ) {}

  ngOnInit(): void {
  }

  guardarProducto(): void {
    this.producto.codigo = this.codigo;
    this.producto.existencia = this.existencia;
    this.producto.nombre = this.nombre;
    this.producto.precio = this.precio;
    this.productoService.addProducto(this.producto);
  }

  back(): void {
    this._location.back();
  }
}
