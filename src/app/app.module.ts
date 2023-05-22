import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

//Routing
import { AppRoutingModule } from './app-routing.module';

//Modulo
import { SharedModule } from './shared/shared.module';

//componentes
import { AppComponent } from './app.component';
import { ListAlumnosComponent } from './components/list-alumnos/list-alumnos.component';
import { AgregarEditarAlumnoComponent } from './components/agregar-editar-alumno/agregar-editar-alumno.component';
import { ListCursosComponent } from './components/list-cursos/list-cursos.component';
import { AgregarEditarCursoComponent } from './components/agregar-editar-curso/agregar-editar-curso.component';
import { ListUsuariosComponent } from './components/list-usuarios/list-usuarios.component';
import { AgregarEditarUsuarioComponent } from './components/agregar-editar-usuario/agregar-editar-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component'; // Importar FormsModule

//guards
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AlumnoCursoComponent } from './components/alumno-curso/alumno-curso.component';
import { ListAlumnoCursoComponent } from './components/list-alumno-curso/list-alumno-curso.component';



@NgModule({
  declarations: [
    AppComponent,
    ListAlumnosComponent,
    AgregarEditarAlumnoComponent,
    LoginComponent,
    NotFoundComponent,
    ListCursosComponent,
    AgregarEditarCursoComponent,
    ListUsuariosComponent,
    AgregarEditarUsuarioComponent,
    AlumnoCursoComponent,
    ListAlumnoCursoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
