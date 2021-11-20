import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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
  existencia!: number;


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
