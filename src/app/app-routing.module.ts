import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { LoginComponent } from './components/login/login.component';
import { ListAlumnosComponent } from './components/list-alumnos/list-alumnos.component';
import { ListCursosComponent } from './components/list-cursos/list-cursos.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListUsuariosComponent } from './components/list-usuarios/list-usuarios.component';
import { ListAlumnoCursoComponent } from "./components/list-alumno-curso/list-alumno-curso.component";
//Guards
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  //Need to be logged in to access these routes (AuthGuard)
  { path: 'listAlumnos', component: ListAlumnosComponent, canActivate: [AuthGuard] },
  { path: 'listCursos', component: ListCursosComponent, canActivate: [AuthGuard] },
  { path: 'listUsuarios', component: ListUsuariosComponent, canActivate: [AuthGuard] },
  { path: 'listInscripciones', component: ListAlumnoCursoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
