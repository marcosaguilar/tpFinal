import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria';
import { Subcategoria } from 'src/app/models/Subcategoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  categoria: string = '';
  subcategoria: string = '';

  constructor(
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService
  ) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(
      (response) => (this.categorias = response.lista),
      (error) => console.log('No se pudieron obtener las categorias')
    );
  }

  obtenerSubcategorias(categoria: Categoria) {
    this.subcategoriaService.getSubCategorias(categoria).subscribe(
      (response) => (this.subcategorias = response.lista),
      (err) => console.log('No se pudieron obtener las subcategorias')
    );
  }

  createCategoria(): void {
    this.categoriaService.postCategoria(this.categoria);
    this.categoria = '';
    this.subcategoria = '';
  }
}
