import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdministracionProductoComponent } from './components/administracion-producto/administracion-producto.component';
import { AdministracionProductoModificarComponent } from './components/administracion-producto/administracion-producto-modificar/administracion-producto-modificar.component';
import { AdministracionProductoAgregarComponent } from './components/administracion-producto/administracion-producto-agregar/administracion-producto-agregar.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteAgregarComponent } from './components/cliente/cliente-agregar/cliente-agregar.component';
import { ClienteModificarComponent } from './components/cliente/cliente-modificar/cliente-modificar.component';
import { VentaComponent } from './components/venta/venta.component';
import { VentaAgregarComponent } from './components/venta/venta-agregar/venta-agregar.component';
import { VentaResumidoComponent } from './components/reportes/venta-resumido/venta-resumido.component';
import { VentaDetalladoComponent } from './components/reportes/venta-detallado/venta-detallado.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
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
  { path: 'reporte-ventas-resumidas', component: VentaResumidoComponent },
  { path: 'reporte-ventas-detalladas', component: VentaDetalladoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
