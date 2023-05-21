import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/usuario';
import { AgregarEditarUsuarioComponent } from '../agregar-editar-usuario/agregar-editar-usuario.component';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css'],
})
export class ListUsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['login', 'nombre', 'email', 'accions'];
  dataSource: MatTableDataSource<Usuario>;
  loading: boolean = false;

  usuarios: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsuarios() {
    this.loading = true;
    this._usuarioService.getAllUsuarios().subscribe({
      next: (res) => {
        // console.log(res)
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditUsuario(idUsuario?: number) {
    const dialogRef = this.dialog.open(AgregarEditarUsuarioComponent, {
      width: '550px',
      disableClose: true,
      data: { idUsuario: idUsuario },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUsuarios();
      }
      this.getUsuarios();
    });
  }

  deleteUsuario(idUsuario: number) {
    this.loading = true;
    this._usuarioService.deleteUsuario(idUsuario).subscribe({
      next: (res) => {
        this.mensajeExito();
        this.getUsuarios();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  mensajeExito() {
    this._snackBar.open('Usuario eliminado con éxito', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
