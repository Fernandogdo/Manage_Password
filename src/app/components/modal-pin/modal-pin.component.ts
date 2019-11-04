import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProductService } from '../../services/product.service'
import { Product } from '../../models/product';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-modal-pin',
  templateUrl: './modal-pin.component.html',
  styleUrls: ['./modal-pin.component.css']
})
export class ModalPinComponent implements OnInit {

  desencriptado: string;
  product = {} as Product;
  encryptText: string;
  decPassword: string;
  // editingProduct: Product;

  constructor(
    public dialogRef1: MatDialogRef<ModalPinComponent>,
  ) { }

  ngOnInit() {
  }

  desencriptar(conversion: string) {
    if (conversion === 'decrypt') {
      this.desencriptado = CryptoJS.AES.decrypt(this.product.password.trim(), this.product.pin.trim()).toString(CryptoJS.enc.Utf8);
    }
  }
}
