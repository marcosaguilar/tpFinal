import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { AdministracionProductoComponent } from './components/administracion-producto/administracion-producto.component';
import { AdministracionProductoAgregarComponent } from './components/administracion-producto/administracion-producto-agregar/administracion-producto-agregar.component';
import { AdministracionProductoModificarComponent } from './components/administracion-producto/administracion-producto-modificar/administracion-producto-modificar.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteAgregarComponent } from './components/cliente/cliente-agregar/cliente-agregar.component';
import { ClienteModificarComponent } from './components/cliente/cliente-modificar/cliente-modificar.component';
import { VentaComponent } from './components/venta/venta.component';
import { VentaAgregarComponent } from './components/venta/venta-agregar/venta-agregar.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AdministracionProductoComponent,
    AdministracionProductoAgregarComponent,
    AdministracionProductoModificarComponent,
    ClienteComponent,
    ClienteAgregarComponent,
    ClienteModificarComponent,
    VentaComponent,
    VentaAgregarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
