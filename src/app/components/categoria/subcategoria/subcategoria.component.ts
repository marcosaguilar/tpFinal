import { Component, OnInit } from '@angular/core';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css'],
})
export class SubcategoriaComponent implements OnInit {
  idCategoria: number = 0;
  descripcion: string = '';
  constructor(
    private subcategoriaService: SubcategoriaService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idCategoria = Number(this.router.snapshot.params.id);
  }
  createSubCategoria() {
    this.subcategoriaService.postSubcategoria(
      this.idCategoria,
      this.descripcion
    );
  }
}
