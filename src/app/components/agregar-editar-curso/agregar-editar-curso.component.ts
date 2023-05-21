import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-agregar-editar-curso',
  templateUrl: './agregar-editar-curso.component.html',
  styleUrls: ['./agregar-editar-curso.component.css'],
})
export class AgregarEditarCursoComponent implements OnInit {
  formCurso: FormGroup;
  loading: boolean = false;
  title: string = 'Agregar ';
  idCurso: number | undefined;
  dataSource: MatTableDataSource<Curso>;

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarCursoComponent>,
    private fb: FormBuilder,
    private _cursoService: CursoService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formCurso = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      creditos: ['', [Validators.required, Validators.maxLength(2)]],
      descripcion: ['', [Validators.required, Validators.maxLength(50)]],
      temario: ['', Validators.maxLength(50)],
    });
    this.idCurso = data.idCurso;
  }

  ngOnInit(): void {
    this.esEditar(this.idCurso);
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  getCursoById(idCurso: number) {
    this.loading = true;
    this._cursoService.getCurso(idCurso).subscribe((data) => {
      this.loading = false;
      this.formCurso.patchValue({
        codigo: data.data.codigo,
        nombre: data.data.nombre,
        creditos: data.data.creditos,
        descripcion: data.data.descripcion,
        temario: data.data.temario,
      });
    });
  }

  addEditCurso() {
    if (this.formCurso.invalid) {
      return;
    }

    const curso: Curso = {
      codigo: this.formCurso.value.codigo,
      nombre: this.formCurso.value.nombre,
      creditos: this.formCurso.value.creditos,
      descripcion: this.formCurso.value.descripcion,
      temario: this.formCurso.value.temario,
    };
    this.loading = true;

    if (this.idCurso === undefined) {
      this._cursoService.addCurso(curso).subscribe({
        next: (res) => {
          this.mensajeExitoso(curso.nombre + ' agregado');
        },
        error: (err) => {
          this._snackBar.open(err.error.message, '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        },
      });
    } else {
      this._cursoService.editCurso(this.idCurso, curso).subscribe({
        next: (res) => {
          this.mensajeExitoso(curso.nombre + ' actualizado');
        },
        error: (err) => {
          this._snackBar.open(err.error.message, '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        },
      });
    }
    this.loading = false;
    this.dialogRef.close(true);
  }

  mensajeExitoso(title: string) {
    this._snackBar.open(`Alumno ${title} exitosamente`, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  esEditar(idCurso: number) {
    if (idCurso !== undefined) {
      this.title = 'Editar ';
      this.getCursoById(idCurso);
    }
  }
}
