/* Modulos Angular MAterial */
import { NgModule } from '@angular/core';
import {
  MatTableModule,
  MatStepperModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatRadioModule,
  MatCardModule,
  MatProgressBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatListModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';

const modules = [
  MatTableModule,
  MatStepperModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatOptionModule,
  MatSelectModule,
  MatPaginatorModule,
  MatSortModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatRadioModule,
  MatCardModule,
  MatProgressBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatListModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatDialogModule,
]
@NgModule({
  imports: [...modules],
  exports: [...modules],
  providers: [
    MatDatepickerModule,
    MatDialogModule,
  ]
})
export class MaterialModule { }