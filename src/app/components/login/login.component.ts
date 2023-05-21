import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  timeoutId: any;

  interactionEvents = [
    'mousedown',
    'mousemove',
    'keypress',
    'scroll',
    'touchstart',
  ];

  user = {
    login: '',
    password: '',
  };

  formLogin: FormGroup;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private fb: FormBuilder
  ) {
    this.formLogin = this.fb.group({
      login: ['', [Validators.required, Validators.maxLength(20)]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(8),
        ],
      ],
    });
  }

  ngOnInit() {
    this.initInteractionEvents();
  }

  initInteractionEvents() {
    this.interactionEvents.forEach((event) => {
      window.addEventListener(event, this.resetTimer.bind(this));
    });
  }

  resetTimer() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.startLogoutTimer();
    }, 300000);
  }

  login() {
    this._authService.login(this.user).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this._router.navigate(['/listAlumnos']);
        this.startLogoutTimer();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  startLogoutTimer() {
    this.timeoutId = setTimeout(() => {
      this._authService.logout();
      this._router.navigate(['/login']);
    }, 300000);
  }

  ngOnDestroy() {
    this.interactionEvents.forEach((event) => {
      window.removeEventListener(event, this.resetTimer.bind(this));
    });
  }
}
