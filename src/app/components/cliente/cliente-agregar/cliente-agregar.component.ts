import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/Cliente';

@Component({
  selector: 'app-cliente-agregar',
  templateUrl: './cliente-agregar.component.html',
  styleUrls: ['./cliente-agregar.component.css']
})
export class ClienteAgregarComponent implements OnInit {

  ruc!: number;
  nombreApellido!: string;
  email!: string;

  cliente: Cliente = new Cliente();

  constructor(
    private clienteService: ClienteService,
  ) {}

  ngOnInit(): void {
  }

  guardarCliente(): void {
    this.cliente.ruc = this.ruc;
    this.cliente.nombreApellido = this.nombreApellido;
    this.cliente.email = this.email;
    this.clienteService.addCliente(this.cliente);
  }
}
