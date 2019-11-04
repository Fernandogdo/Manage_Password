import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProductService } from '../../services/product.service'
import { AuthService } from '../../services/auth.service'
import { Product } from '../../models/product';
import { Usuario } from '../../models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  // @Input() conversionEncryptOutput: string;
  conversionEncryptOutput: string;
  conversionDecryptOutput: string;


  product = {} as Product;
  usuario = {} as Usuario;

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    public productService: ProductService,
    public authservice: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  addProduct(message, action) {
    if (this.product.servicio !== '' && this.product.password !== '') {
      this.productService.addProduct(this.product);
      this.product = {} as Product;
      this._snackBar.open(message, action, {duration: 2000});
    }
  }

  //Metodo para encriptar
  convertText(conversion: string) {
    if (conversion === 'encrypt') {
      this.product.password = CryptoJS.AES.encrypt(this.product.password.trim(), this.product.pin.trim()).toString();
      // this.product.password = CryptoJS.AES.encrypt(this.product.password.trim(), this.usuario.pin.trim()).toString();
      // this.encriptacionService.encriptar(this.product.password, this.product.pin)
    }
  }
}


