import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Curso } from 'src/app/models/curso';
import { AgregarEditarCursoComponent } from '../agregar-editar-curso/agregar-editar-curso.component';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-list-cursos',
  templateUrl: './list-cursos.component.html',
  styleUrls: ['./list-cursos.component.css'],
})
export class ListCursosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'creditos',
    'descripcion',
    'temario',
    'accions',
  ];
  dataSource: MatTableDataSource<Curso>;
  loading: boolean = false;

  cursos: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _cursoService: CursoService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getCursos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCursos() {
    this.loading = true;
    this._cursoService.getAllCursos().subscribe({
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

  addEditCurso(idCurso?: number) {
    const dialogRef = this.dialog.open(AgregarEditarCursoComponent, {
      width: '550px',
      data: { idCurso: idCurso },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCursos();
      }
      this.getCursos();
    });
  }

  deleteCurso(idCurso: number) {
    this._cursoService.deleteCurso(idCurso).subscribe({
      next: (res) => {
        this.mensajeExito();
        this.getCursos();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  mensajeExito() {
    this._snackBar.open('Curso eliminado con éxito', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
