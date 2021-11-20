import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
 
  clientes: Cliente[] = [{ruc: 1, nombreApellido: 'nombreCliente', email: 'email'}];

  constructor(private http: HttpClient) {}

  addCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  getListaClientes(): Cliente[]{
    return this.clientes;
  }

  putCliente(cliente: Cliente, clienteActualizado: Cliente): void {
    const index = this.clientes.indexOf(cliente);
    if (index > -1) {
      this.clientes[index] = clienteActualizado;
    }
  }

  deleteCliente(cliente: Cliente): void {
    const index = this.clientes.indexOf(cliente);
    if (index > -1) {
      this.clientes.splice(index, 1);
    }
  }

  getCliente(ruc: number): Cliente{
    for(var x = 0; this.clientes.length; x++){
      if(this.clientes[x].ruc == ruc){
        return this.clientes[x];
      }
    }
    return (this.clientes[0]);   // tiene que retornar si o si cliente
  }

}