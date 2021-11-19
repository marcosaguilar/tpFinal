import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionProductoModificarComponent } from './administracion-producto-modificar.component';

describe('AdministracionProductoModificarComponent', () => {
  let component: AdministracionProductoModificarComponent;
  let fixture: ComponentFixture<AdministracionProductoModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministracionProductoModificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionProductoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
