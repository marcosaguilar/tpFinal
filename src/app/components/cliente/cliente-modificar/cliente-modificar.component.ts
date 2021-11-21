import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/Cliente';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-modificar',
  templateUrl: './cliente-modificar.component.html',
  styleUrls: ['./cliente-modificar.component.css'],
})
export class ClienteModificarComponent implements OnInit {
  ruc?: number;
  nombreApellido!: string;
  email!: string;

  cliente: Cliente = new Cliente();

  clienteModificado: Cliente = new Cliente();

  constructor(
    private clienteService: ClienteService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cliente = this.clienteService.getCliente(
      this.router.snapshot.params.ruc
    );
    this.ruc = this.cliente.ruc;
    this.nombreApellido = this.cliente.nombreApellido;
    this.email = this.cliente.email;
  }

  guardarCliente(): void {
    this.clienteModificado.ruc = this.ruc;
    this.clienteModificado.nombreApellido = this.nombreApellido;
    this.clienteModificado.email = this.email;
    this.clienteService.putCliente(this.cliente, this.clienteModificado);
    this.ruc = undefined;
    this.nombreApellido = '';
    this.email = '';
  }
}
