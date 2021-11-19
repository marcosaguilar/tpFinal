import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionProductoComponent } from './administracion-producto.component';

describe('AdministracionProductoComponent', () => {
  let component: AdministracionProductoComponent;
  let fixture: ComponentFixture<AdministracionProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministracionProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
