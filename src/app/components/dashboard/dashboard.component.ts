import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddProductComponent } from '../add-product/add-product.component';
import { ModalPinComponent } from '../modal-pin/modal-pin.component'
import { ProductService } from '../../services/product.service'
import { AuthService } from '../../services/auth.service'
import { Product } from '../../models/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private idUsuario;

  productsValidos = [];

  conversionDecryptOutput: string;
  product = {} as Product;
  usuarios = {} as Usuario;

  dialogRoom: MatDialogRef<AddProductComponent>;
  dialogRoom1: MatDialogRef<ModalPinComponent>;
  products = [];
  editing: boolean = false;
  editingProduct: Product; //Variable para editar producto


  step = 0;

  constructor(
    public productService: ProductService,
    public authservice: AuthService,
    public dialog: MatDialog,
    public dialog2: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // this.productService.getProducts().subscribe(products => {
    //   this.products = products;
    // });
    this.getProducts();
  }

  ModalProduct() {
    this.dialogRoom = this.dialog.open(AddProductComponent);
  }

  ModalPin(){
    this.dialogRoom1 = this.dialog2.open(ModalPinComponent);
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
    this._snackBar.open(message, action, { duration: 2000 });
  }

  salir(){
    this.authservice.logout();
  }

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log(this.products);

    });

    this.authservice.getAuth().subscribe(data => {
      this.authservice.getUser(data.uid).subscribe(user => {
        this.idUsuario = data.uid;
        console.log(this.idUsuario);
        
        for (let index = 0; index < this.products.length; index++) {
          if (data.uid == this.products[index].idUser) {
            this.productsValidos.push(this.products[index]);
            console.log("producto", this.products[index].idUser);
            //3kUolKKIa5Yrx3yjrMEUg1k8T932
            console.log(this.productsValidos);
            console.log("Correcto");

          } else {
            console.log("No dashboard");
          }
        }
      })
    })
  }

}
