import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarCursoComponent } from './agregar-editar-curso.component';

describe('AgregarEditarCursoComponent', () => {
  let component: AgregarEditarCursoComponent;
  let fixture: ComponentFixture<AgregarEditarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
