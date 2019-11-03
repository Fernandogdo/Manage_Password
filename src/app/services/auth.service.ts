import { Injectable } from '@angular/core';
//Servicio de mensajes de alerta
import { ToastrService } from 'ngx-toastr';

// Firebase
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Usuario } from '../models/usuario';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;
  public user: Observable<Usuario>;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private fAuth: AngularFireAuth,
    private fFirestore: AngularFirestore,

  ) {
    //Comprueba si el usuario existe en Firestore
    this.user = this.fAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.fFirestore.doc<Usuario>(`usuario/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  mensajeExito(titulo, mensaje) {
    this.toastr.success(mensaje, titulo);
  }
  mensajeError(titulo, mensaje) {
    this.toastr.error(mensaje, titulo);
  }

  loginCorreo(data: any) {
    return new Promise((resolve, reject) => {
      this.fAuth.auth.signInWithEmailAndPassword(data.correo, data.clave).
        then(userData => resolve(userData),
          err => reject(err));
    });
  }

  /* Metodo para salir de la cuenta */
  logout(){
    return this.fAuth.auth.signOut().then(() => {
      console.log('sign out')
      this.router.navigate(['/login']);
    });
  }

  /* Metodo para resetear contraseña de usuario */
  resetPassword(email: string) {
    return this.fAuth.auth.sendPasswordResetEmail(email)
      .then(() => console.log("email reset enviado"))
      .catch((error) => console.log(error))
  }


  registerUser(userForm) {
    // Asigna valor del formulario a variable
    const usuarioForm = userForm;
    return new Promise((resolve, reject) => {
      // Registra al usuario en Authentication
      this.fAuth.auth.createUserWithEmailAndPassword(userForm.correo, userForm.clave)
        .then(userData => {
          resolve(userData),
            console.log('¡Usuario creado!', userData);
          this.createUserRegisterBD(userData.user, usuarioForm);
        }).catch(err => {
          console.log(reject(err))
          this.mensajeError('Error', err);
        })
    });
  }

  // Metodo que regisrado un usuario en firestore
  private createUserRegisterBD(user: any, userForm) {
    // si se registra por el formulario de registro asigna valor a la variable formulario,
    const usuarioForm = userForm;
    const userRef: AngularFirestoreDocument<Usuario> = this.fFirestore.doc(`usuario/${user.uid}`);
    const data: Usuario = {
      uid: user.uid,
      correo: user.email,
      clave: usuarioForm.clave,
      pin: usuarioForm.pin
    }
    userRef.set(data, { merge: true }).then(() => {
      this.mensajeExito('Exito!', 'Usuario registrado correctamente');
      this.router.navigate(['/dashboard']);
    });
  }

}
