import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/models/Venta';
import { Cliente } from 'src/app/models/Cliente';
import { VentaService } from 'src/app/services/venta.service';
import { ClienteService } from 'src/app/services/cliente.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-venta-resumido',
  templateUrl: './venta-resumido.component.html',
  styleUrls: ['./venta-resumido.component.css']
})
export class VentaResumidoComponent implements OnInit {

  ventas: Venta[] = [];
  clientes: Cliente[] = [];
  clienteRuc!: number; //se utiliza para el filtro
  fechaDesde!: NgbDateStruct;
  fechaHasta!: NgbDateStruct;


  constructor(private ventaService: VentaService, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.ventas = this.ventaService.getVentas();
    this.clientes = this.clienteService.getListaClientes();
  }

  filtrar() {
    console.log(this.fechaDesde);
    console.log(this.fechaHasta);
  }

}
