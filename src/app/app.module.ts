import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FichaClinicaComponent } from './components/ficha-clinica/ficha-clinica.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { ReservaComponent } from './components/reserva/reserva.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { FichaClinicaAgregarComponent } from './components/ficha-clinica/ficha-clinica-agregar/ficha-clinica-agregar.component';
import { ReservaAgregarComponent } from './components/reserva/reserva-agregar/reserva-agregar.component';
import { ServicioAgregarComponent } from './components/servicio/servicio-agregar/servicio-agregar.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { ProductoComponent } from './components/producto/producto.component';
import { LoginComponent } from './components/login/login.component';
import { FichaClinicaModificarComponent } from './components/ficha-clinica/ficha-clinica-modificar/ficha-clinica-modificar.component';
import { SubcategoriaComponent } from './components/categoria/subcategoria/subcategoria.component';
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
    FichaClinicaComponent,
    NavbarComponent,
    ServicioComponent,
    ReservaComponent,
    CategoriaComponent,
    FichaClinicaAgregarComponent,
    ReservaAgregarComponent,
    ServicioAgregarComponent,
    PacienteComponent,
    ProductoComponent,
    LoginComponent,
    FichaClinicaModificarComponent,
    SubcategoriaComponent,
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
