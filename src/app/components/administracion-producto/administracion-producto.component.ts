import { Component, OnInit } from '@angular/core';

import {
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-administracion-producto',
  templateUrl: './administracion-producto.component.html',
  styleUrls: ['./administracion-producto.component.css']
})
export class AdministracionProductoComponent implements OnInit {

  closeResult = '';

  constructor(
    public productoService: ProductoService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    //cargar lista personas
  }

  addProducto(producto: Producto): void {
    this.productoService.addProducto(producto);
  }

  deleteProducto(producto: Producto): void {
    this.productoService.deleteProducto(producto);
  }

  openEmpleados(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openClientes(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  parseNumber(number: number): string {
    return number / 10 <= 1 ? '0' + number.toString() : number.toString();
  }
}
