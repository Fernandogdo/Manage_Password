import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddProductComponent } from '../add-product/add-product.component';
import { LoginComponent } from '../login/login.component'
import { ProductService } from '../../services/product.service'
import { Product } from '../../models/product';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dialogRoom: MatDialogRef<AddProductComponent>;
  dialogRoom1: MatDialogRef<LoginComponent>;
  products = [];
  editing: boolean = false;
  editingProduct: Product; //Variable para editar producto


  step = 0;

  constructor(
    public productService: ProductService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  ModalProduct() {
    this.dialogRoom = this.dialog.open(AddProductComponent);
  }

  deleteProduct(event, product) {
    this.productService.deleteProduct(product);
  }

  editProduct(event, product) {
    this.editing = !this.editing;
    this.editingProduct = product; 
    // console.log(product);
  }

  updateProduct() {
    this.productService.updateProduct(this.editingProduct);
    this.editingProduct = {} as Product;
    this.editing = false;
  }

  ActualizarSnackBar(message, action) {
    this._snackBar.open(message, action, {duration: 2000});
  }
}
