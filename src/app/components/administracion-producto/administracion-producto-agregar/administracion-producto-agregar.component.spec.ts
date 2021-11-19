import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionProductoAgregarComponent } from './administracion-producto-agregar.component';

describe('AdministracionProductoAgregarComponent', () => {
  let component: AdministracionProductoAgregarComponent;
  let fixture: ComponentFixture<AdministracionProductoAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministracionProductoAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionProductoAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
