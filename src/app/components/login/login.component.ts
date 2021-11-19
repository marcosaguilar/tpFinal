import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/Persona';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  password: string = '';
  usuarioslog: Persona[] = [];
  bandera: boolean = true;
  constructor(
    private personaService: PersonaService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.personaService.getEmpleados().subscribe(
      (respuesta) => (this.usuarioslog = respuesta.lista),
      (error) => console.log('no se puede traer la lista')
    );
  }

  login(): void {
    console.log(this.usuario);
    console.log(this.password);

    if (this.buscar()) {
      this.router.navigateByUrl('/administracion-producto');
    } else {
      this.usuario = '';
      this.password = '';
      this.bandera = false;
    }
  }

  buscar(): boolean {
      if (
        'usuario2' == this.usuario
      ) {
        this.loginService.setUsuarioActivo(this.usuario);
        return true;
      }
    return false;
  }
}
