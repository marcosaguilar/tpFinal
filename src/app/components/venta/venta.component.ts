import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/models/Venta';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  closeResult = '';

  constructor(
    public ventaService: VentaService,
  ) {}

  ngOnInit(): void {
    //cargar lista personas
  }

  addVenta(venta: Venta): void {
    this.ventaService.addVenta(venta);
  }

  deleteVenta(venta: Venta): void {
    this.ventaService.deleteVenta(venta);
  }


  parseNumber(number: number): string {
    return number / 10 <= 1 ? '0' + number.toString() : number.toString();
  }
}
