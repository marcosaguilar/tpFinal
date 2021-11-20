import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { FichaClinicaAgregarComponent } from './components/ficha-clinica/ficha-clinica-agregar/ficha-clinica-agregar.component';
import { FichaClinicaComponent } from './components/ficha-clinica/ficha-clinica.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ReservaAgregarComponent } from './components/reserva/reserva-agregar/reserva-agregar.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ServicioAgregarComponent } from './components/servicio/servicio-agregar/servicio-agregar.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { LoginComponent } from './components/login/login.component';
import { FichaClinicaModificarComponent } from './components/ficha-clinica/ficha-clinica-modificar/ficha-clinica-modificar.component';
import { SubcategoriaComponent } from './components/categoria/subcategoria/subcategoria.component';
import { AdministracionProductoComponent } from './components/administracion-producto/administracion-producto.component';
import { AdministracionProductoModificarComponent } from './components/administracion-producto/administracion-producto-modificar/administracion-producto-modificar.component';
import { AdministracionProductoAgregarComponent } from './components/administracion-producto/administracion-producto-agregar/administracion-producto-agregar.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteAgregarComponent } from './components/cliente/cliente-agregar/cliente-agregar.component';
import { ClienteModificarComponent } from './components/cliente/cliente-modificar/cliente-modificar.component';
import { VentaComponent } from './components/venta/venta.component';
import { VentaAgregarComponent } from './components/venta/venta-agregar/venta-agregar.component';

const routes: Routes = [
  { path: '', component: FichaClinicaComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'servicios', component: ServicioComponent },
  { path: 'agregar-servicio/:id', component: ServicioAgregarComponent },
  {
    path: 'modificar-ficha-clinica/:id',
    component: FichaClinicaModificarComponent,
  },
  { path: 'agregar-ficha-clinica', component: FichaClinicaAgregarComponent },
  { path: 'reserva', component: ReservaComponent },
  { path: 'reserva-agregar', component: ReservaAgregarComponent },
  { path: 'pacientes', component: PacienteComponent },
  { path: 'productos', component: ProductoComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'categoria/agregar-subcategoria/:id',
    component: SubcategoriaComponent,
  },
  { path: 'administracion-producto', component: AdministracionProductoComponent },
  {
    path: 'administracion-producto/modificar-producto/:codigo',
    component: AdministracionProductoModificarComponent,
  },
  {
    path: 'agregar-producto',
    component: AdministracionProductoAgregarComponent,
  },
  { path: 'cliente', component: ClienteComponent },
  { path: 'cliente-agregar', component: ClienteAgregarComponent },
  { path: 'cliente/cliente-modificar/:ruc', component: ClienteModificarComponent },
  { path: 'venta', component: VentaComponent },
  { path: 'venta-agregar', component: VentaAgregarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
