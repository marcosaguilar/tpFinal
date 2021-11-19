import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  usuariosActivos: string[] = [];
  constructor() {}

  setUsuarioActivo(nombreUsuario: string) {
    this.usuariosActivos.push(nombreUsuario);
  }

  ponerOff() {
    this.usuariosActivos.pop();
  }
}
