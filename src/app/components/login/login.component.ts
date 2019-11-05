import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

/* Firebase */
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    // servicio creado donde esta la logia de autenticacion
    private authService: AuthService,
    private formbuild: FormBuilder,
  ) { }
  passReset: boolean = false;
  correoReset: string;
  showDetails: boolean;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  /* Forms */
  loginForm: FormGroup;
  registroForm: FormGroup;

  // Mensajes de validacion de inputs en tiempo real.
  account_validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'correo': [
      { type: 'required', message: 'El email es requerido' },
      { type: 'pattern', message: 'Ingrese un email válido' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'clave': [
      { type: 'required', message: 'La contraseña es requerida' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
  }

  ngOnInit() {
    this.buildForm();
  }

  /* Validador de formulario */
  buildForm(): void {
    this.loginForm = this.formbuild.group({
      correo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      clave: ['', Validators.required],
    });

    this.registroForm = this.formbuild.group({
      correo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      clave: ['', Validators.required,]
      //pin: ['', Validators.required,]
    });
  }

  /* Login Correo electronico */
  login() {
    this.authService.loginCorreo(this.loginForm.value).then((res) => {
      this.authService.mensajeExito('¡Éxito!', 'Acceso al sistema.');
      this.router.navigate(['dashboard/']);
    }).catch(err => {
      this.authService.mensajeError('¡Error!', '¡Los campos ingresados son incorrectos o no existe una cuenta registrada!');
      console.log('Algo salio mal :/ :', err.message);
    });

  }
  /* Registro usuario */
  registro() {
    this.authService.registerUser(this.registroForm.value);
  }


  /* Metodo para redirigir ruta tras logeo */
  onLoginRedirect(): void {
    this.router.navigate(['dashboard']);
  }

  /* Metodo para resetear contraseña usuario */
  resetPassword(emailReset: string) {
    this.authService.resetPassword(emailReset)
      .then(() => this.passReset = true)
  }

}
