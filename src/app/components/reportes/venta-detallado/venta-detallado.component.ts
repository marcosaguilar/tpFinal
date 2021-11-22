import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/models/Venta';
import { Cliente } from 'src/app/models/Cliente';
import { VentaService } from 'src/app/services/venta.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-venta-detallado',
  templateUrl: './venta-detallado.component.html',
  styleUrls: ['./venta-detallado.component.css'],
})
export class VentaDetalladoComponent implements OnInit {
  ventas: Venta[] = [];
  clientes: Cliente[] = [];
  ventaProducto!: string;
  fechaDesde!: NgbDateStruct;
  fechaHasta!: NgbDateStruct;

  constructor(
    private ventaService: VentaService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.ventas = this.ventaService.getVentas();
    this.clientes = this.clienteService.getListaClientes();
  }

  filtrar() {
    this.ventas.forEach((venta, index) => {
      //filtro de fecha desde
      if (
        venta.fecha.year >= this.fechaDesde.year &&
        venta.fecha.month >= this.fechaDesde.month
      ) {
        if (
          venta.fecha.day >= this.fechaDesde.day &&
          venta.fecha.month == this.fechaDesde.month
        )
          this.ventas.splice(index, 1);
      }
    });

    this.ventas.forEach((venta, index) => {
      //filtro de fecha hasta
      if (
        venta.fecha.year <= this.fechaDesde.year &&
        venta.fecha.month <= this.fechaDesde.month
      ) {
        if (
          venta.fecha.day <= this.fechaDesde.day &&
          venta.fecha.month == this.fechaDesde.month
        )
          this.ventas.splice(index, 1);
      }
    });
  }
}
