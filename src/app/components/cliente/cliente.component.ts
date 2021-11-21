import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  closeResult = '';

  constructor(public clienteService: ClienteService) {}

  ngOnInit(): void {
    //cargar lista personas
  }

  addCliente(cliente: Cliente): void {
    this.clienteService.addCliente(cliente);
  }

  deleteCliente(cliente: Cliente): void {
    this.clienteService.deleteCliente(cliente);
  }

  parseNumber(number: number): string {
    return number / 10 <= 1 ? '0' + number.toString() : number.toString();
  }
}
