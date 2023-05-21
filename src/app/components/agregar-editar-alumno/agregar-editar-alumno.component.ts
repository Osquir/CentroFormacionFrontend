import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-agregar-editar-alumno',
  templateUrl: './agregar-editar-alumno.component.html',
  styleUrls: ['./agregar-editar-alumno.component.css'],
})
export class AgregarEditarAlumnoComponent implements OnInit {
  formAlumno: FormGroup;
  loading: boolean = false;
  title: string = 'Agregar ';
  idAlumno: number | undefined;
  dataSource: MatTableDataSource<Alumno>;


  constructor(
    public dialogRef: MatDialogRef<AgregarEditarAlumnoComponent>,
    private fb: FormBuilder,
    private _alumnoService: AlumnoService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formAlumno = this.fb.group({
      nif: ['', [Validators.required, Validators.maxLength(10)]],
      primerNombre: ['', [Validators.required, Validators.maxLength(20)]],
      segundoNombre: ['', Validators.maxLength(20)],
      primerApellido: ['', [Validators.required, Validators.maxLength(20)]],
      segundoApellido: ['', Validators.maxLength(20)],
    });
    this.idAlumno = data.idAlumno;
  }

  ngOnInit(): void {
    this.esEditar(this.idAlumno);
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  getAlumnoById(idAlumno: number) {
    this.loading = true;
    this._alumnoService.getAlumno(idAlumno).subscribe((data) => {
      this.loading = false;
      this.formAlumno.patchValue({
        nif: data.data.nif,
        primerNombre: data.data.primerNombre,
        segundoNombre: data.data.segundoNombre,
        primerApellido: data.data.primerApellido,
        segundoApellido: data.data.segundoApellido,
      });
    });
  }

  addEditAlumno() {
    if (this.formAlumno.invalid) {
      return;
    }

    const alumno: Alumno = {
      nif: this.formAlumno.value.nif,
      primerNombre: this.formAlumno.value.primerNombre,
      segundoNombre: this.formAlumno.value.segundoNombre,
      primerApellido: this.formAlumno.value.primerApellido,
      segundoApellido: this.formAlumno.value.segundoApellido,
    };
    this.loading = true;

    if (this.idAlumno === undefined) {
      this._alumnoService.addAlumno(alumno).subscribe({
        next: (res) => {
          this.mensajeExitoso('agregado');
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
      this._alumnoService.editAlumno(this.idAlumno, alumno).subscribe({
        next: (res) => {
          this.mensajeExitoso('actualizado');
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

  esEditar(idAlumno: number) {
    if (idAlumno !== undefined) {
      this.title = 'Editar ';
      this.getAlumnoById(idAlumno);
    }
  }
}
