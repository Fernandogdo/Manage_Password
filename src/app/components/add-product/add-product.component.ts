import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProductService } from '../../services/product.service'
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


  product = {} as Product;

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    public productService: ProductService
  ) { }

  ngOnInit() {
  }

  addProduct() {
    if (this.product.servicio !== '' && this.product.password !== '') {
      this.productService.addProduct(this.product);
      this.product = {} as Product;
    }
  }
}
