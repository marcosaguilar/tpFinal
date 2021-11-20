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
  total: number = 0;
  detalles: VentaDetalle [] = [];
  cantidad!: number;
  totalDetalle!: number;

  listaClientes!: Cliente[];
  listaProductos!: Producto[];

  venta: Venta = new Venta();
  

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
    //si la cantidad es menor o igual a la existencia se guarda si no no.
    var ventaDetalle = new VentaDetalle();
    ventaDetalle.producto = this.productoService.getProducto(this.productoCodigo);
    if(this.cantidad <= ventaDetalle.producto.existencia && this.cantidad != 0){
      //sacar de la existencia la cantidad de productos
      var productoActualizado : Producto = new Producto();
      productoActualizado = ventaDetalle.producto;
      productoActualizado.existencia = productoActualizado.existencia - this.cantidad;
      this.productoService.putProducto(ventaDetalle.producto,productoActualizado);

      ventaDetalle.cantidad = this.cantidad;
      ventaDetalle.totalDetalle = ventaDetalle.cantidad * ventaDetalle.producto.precio;
      this.detalles.push(ventaDetalle);
      this.total = this.total + ventaDetalle.totalDetalle;
    }else{

    }



  }
}
