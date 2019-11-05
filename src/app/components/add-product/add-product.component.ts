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


  private idUser;

  hide: boolean = false;

  product = {} as Product;
  usuario = {} as Usuario;

  usuarios = [];

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    public productService: ProductService,
    public authservice: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  addProduct(message, action) {
    if (this.product.servicio !== '' && this.product.password !== '') {
      this.usuario.uid = this.idUser;
      console.log(this.usuario.uid);
      
      this.productService.addProduct(this.product);
      this.product = {} as Product;
      this._snackBar.open(message, action, { duration: 2000 });
    }
  }

  getUsers() {
    this.authservice.getUsuarios().subscribe(users => {
      this.usuarios = users;
    });

    this.authservice.getAuth().subscribe(data => {
      this.authservice.getUser(data.uid).subscribe(user => {
        console.log("user :", data.uid);
        this.idUser = data.uid
        this.product.idUser = this.idUser;
        for (let index = 0; index < this.usuarios.length; index++) {
          if (this.usuarios[index].uid === this.idUser) {
            // 
            console.log('encontrado')
          } else {
            console.log("No encontrado");
          }
        }
      })
    })
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


