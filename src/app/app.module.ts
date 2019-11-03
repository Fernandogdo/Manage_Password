import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';

//Material
import { MaterialModule } from './material.module';

import { ToastrModule } from 'ngx-toastr';
//Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire' //Conectrase a firebase
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    //Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    // Material
    MaterialModule,
    //Alertas
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    MatPasswordStrengthModule,

  ],
  entryComponents: [AddProductComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
