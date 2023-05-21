import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno } from 'src/app/models/alumno';
import { AgregarEditarAlumnoComponent } from '../agregar-editar-alumno/agregar-editar-alumno.component';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-list-alumnos',
  templateUrl: './list-alumnos.component.html',
  styleUrls: ['./list-alumnos.component.css'],
})
export class ListAlumnosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nif', 'nombres', 'apellidos', 'accions'];
  dataSource: MatTableDataSource<Alumno>;
  loading: boolean = false;

  alumnos: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _alumnoService: AlumnoService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAlumnos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAlumnos() {
    this.loading = true;
    this._alumnoService.getAllAlumnos().subscribe({
      next: (res) => {
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

  addEditAlumno(idAlumno?: number) {
    const dialogRef = this.dialog.open(AgregarEditarAlumnoComponent, {
      width: '550px',
      disableClose: true,
      data: { idAlumno: idAlumno },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getAlumnos();
      }
      this.getAlumnos();
    });
  }

  //delete alumno
  deleteAlumno(idAlumno: number) {
    this.loading = true;
    this._alumnoService.deleteAlumno(idAlumno).subscribe({
      next: (res) => {
        // console.log(res);
        this.mensajeExito();
        this.getAlumnos();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  mensajeExito() {
    this._snackBar.open('Alumno eliminado con éxito', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
