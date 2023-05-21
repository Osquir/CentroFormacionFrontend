import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-agregar-editar-usuario',
  templateUrl: './agregar-editar-usuario.component.html',
  styleUrls: ['./agregar-editar-usuario.component.css'],
})
export class AgregarEditarUsuarioComponent implements OnInit {
  formUsuario: FormGroup;
  loading: boolean = false;
  title: string = 'Agregar ';
  idUsuario: number | undefined;
  dataSource: MatTableDataSource<Usuario>;

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarUsuarioComponent>,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formUsuario = this.fb.group({
      login: ['', [Validators.required, Validators.maxLength(20)]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(8),
        ],
      ],
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      email: [
        '',
        [Validators.required, Validators.maxLength(20), Validators.email],
      ],
    });
    this.idUsuario = data.idUsuario;
  }

  ngOnInit(): void {
    this.esEditar(this.idUsuario);
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  getUsuarioById(idUsuario: number) {
    this.loading = true;
    this._usuarioService.getUsuario(idUsuario).subscribe((data) => {
      this.loading = false;
      this.formUsuario.patchValue({
        login: data.data.login,
        password: data.data.password,
        nombre: data.data.nombre,
        email: data.data.email,
      });
    });
  }

  addEditUsuario() {
    if (this.formUsuario.invalid) {
      return;
    }

    const usuario: Usuario = {
      login: this.formUsuario.value.login,
      password: this.formUsuario.value.password,
      nombre: this.formUsuario.value.nombre,
      email: this.formUsuario.value.email,
    };
    this.loading = true;

    if (this.idUsuario === undefined) {
      this._usuarioService.addUsuario(usuario).subscribe({
        next: (res) => {
          this.mensajeExitoso(usuario.nombre + ' agregado');
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
      this._usuarioService.editUsuario(this.idUsuario, usuario).subscribe({
        next: (res) => {
          this.mensajeExitoso(usuario.nombre + ' editado');
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
    this._snackBar.open(`Usuario ${title} exitosamente`, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  esEditar(idUsuario: number) {
    if (idUsuario !== undefined) {
      this.title = 'Editar ';
      this.getUsuarioById(idUsuario);
    }
  }
}
