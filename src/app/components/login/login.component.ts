import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  password: string = '';
  bandera: boolean = true;
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
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
