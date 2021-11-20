import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/Producto';

@Component({
  selector: 'app-administracion-producto-modificar',
  templateUrl: './administracion-producto-modificar.component.html',
  styleUrls: ['./administracion-producto-modificar.component.css']
})
export class AdministracionProductoModificarComponent implements OnInit {
  codigo!: number;
  nombre!: string;
  precio!: number;
  existencia!: number;

  producto: Producto = new Producto();
  productoModificado: Producto = new Producto();

  constructor(
    private productoService: ProductoService,
    private _location: Location,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.producto = this.productoService.getProducto(this.router.snapshot.params.codigo);
    this.codigo = this.producto.codigo;
    this.nombre = this.producto.nombre;
    this.precio = this.producto.precio;
    this.existencia = this.producto.existencia;
  }

  guardarProducto(): void {
    this.productoModificado.codigo = this.codigo;
    this.productoModificado.existencia = this.existencia;
    this.productoModificado.nombre = this.nombre;
    this.productoModificado.precio = this.precio;
    this.productoService.putProducto(this.producto, this.productoModificado);
  }
  
}
