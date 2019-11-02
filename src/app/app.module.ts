import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';

//Material
import { MaterialModule } from './material.module';

//Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire' //Conectrase a firebase
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';


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
    FormsModule,
    //Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    // Material
    MaterialModule,
    MatPasswordStrengthModule,
  ],
  entryComponents:[AddProductComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
