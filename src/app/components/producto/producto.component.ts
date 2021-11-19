import { Component, OnInit } from '@angular/core';
import { PresentacionProducto } from 'src/app/models/PresentacionProducto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  productos: PresentacionProducto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(
      (res) => {
        this.productos = res.lista;
      },
      (err) => console.log('No se pudieron obtener los productos')
    );
  }
}
