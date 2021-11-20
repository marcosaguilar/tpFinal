import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';
import { Venta } from 'src/app/models/Venta';
import { VentaDetalle } from 'src/app/models/VentaDetalle';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/Producto';

@Component({
  selector: 'app-venta-agregar',
  templateUrl: './venta-agregar.component.html',
  styleUrls: ['./venta-agregar.component.css']
})
export class VentaAgregarComponent implements OnInit {

  fecha!: string;
  nroFactura!: number;
  clienteRuc!: number;
  total!: number;
  detalles: VentaDetalle [] = [];
  cantidad!: number;
  totalDetalle!: number;

  listaClientes!: Cliente[];
  listaProductos!: Producto[];

  venta: Venta = new Venta();
  ventaDetalle: VentaDetalle = new VentaDetalle();

  productoCodigo!: number;

  constructor(
    private ventaService: VentaService,
    private clienteService: ClienteService,
    private productoService: ProductoService,
  ) {}

  ngOnInit(): void {
    //cargar lista de clientes
    this.listaClientes = this.clienteService.getListaClientes();
    this.listaProductos = this.productoService.getListaProductos();
  }

  guardarVenta(): void {
    //traer maximo id y sumar uno
    this.venta.id = 1;
    this.venta.fecha = this.fecha;
    this.venta.nroFactura = this.nroFactura;
    //traer cliente con su ruc
    this.venta.cliente = this.clienteService.getCliente(this.clienteRuc);
    this.venta.total = this.total;
    this.venta.detalle = this.detalles;
    console.log(this.venta);
    this.ventaService.addVenta(this.venta);
  }

  guardarVentaDetalle(): void {
    //traer maximo id y sumar uno
    this.ventaDetalle.producto = this.productoService.getProducto(this.productoCodigo);

    this.ventaDetalle.cantidad = this.cantidad;
    this.ventaDetalle.totalDetalle = this.totalDetalle;
    this.detalles.push(this.ventaDetalle);
  }
}
