import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlumnoCursoComponent } from './list-alumno-curso.component';

describe('ListAlumnoCursoComponent', () => {
  let component: ListAlumnoCursoComponent;
  let fixture: ComponentFixture<ListAlumnoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAlumnoCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAlumnoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
