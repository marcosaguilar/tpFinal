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
import { Subcategoria } from './models/Subcategoria';
import { SubcategoriaComponent } from './components/categoria/subcategoria/subcategoria.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
