import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaAgregarComponent } from './reserva-agregar.component';

describe('ReservaAgregarComponent', () => {
  let component: ReservaAgregarComponent;
  let fixture: ComponentFixture<ReservaAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
