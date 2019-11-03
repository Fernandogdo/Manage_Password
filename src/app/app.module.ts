import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';

//Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

//Services
import { AuthService } from './services/auth.service';
import { ToastrModule } from 'ngx-toastr';

//Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire' //Conectrase a firebase
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ProductService } from './services/product.service';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    //Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // Material
    MaterialModule,
    //Alertas
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    MatPasswordStrengthModule.forRoot(),

  ],
  entryComponents: [AddProductComponent],
  providers: [AuthService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
