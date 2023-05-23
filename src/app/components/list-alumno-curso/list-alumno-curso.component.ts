import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlumnoCurso } from 'src/app/models/alumnoCurso';
import { AlumnoCursoService } from 'src/app/services/alumno-curso.service';

@Component({
  selector: 'app-list-alumno-curso',
  templateUrl: './list-alumno-curso.component.html',
  styleUrls: ['./list-alumno-curso.component.css']
})
export class ListAlumnoCursoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Alumno', 'Curso', 'Curso1', 'Curso2', 'Curso3', 'accions'];
  dataSource: MatTableDataSource<AlumnoCurso>;
  loading: boolean = false;

  alumnosCursos: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _alumnoCursoService: AlumnoCursoService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.getAlumnosCursos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAlumnosCursos() {
    this.loading = true;
    this._alumnoCursoService.getAllAlumnosCursos().subscribe({
      next: (res) => {
        console.log(res.data)
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

  //delete alumno
  deleteAlumno(idAlumnoCurso: number) {
    this.loading = true;
    this._alumnoCursoService.deleteAlumnoCurso(idAlumnoCurso).subscribe({
      next: (res) => {
        // console.log(res);
        this.mensajeExito();
        this.getAlumnosCursos();
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

