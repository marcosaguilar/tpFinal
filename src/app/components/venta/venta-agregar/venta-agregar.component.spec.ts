import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaAgregarComponent } from './venta-agregar.component';

describe('VentaAgregarComponent', () => {
  let component: VentaAgregarComponent;
  let fixture: ComponentFixture<VentaAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
