import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { Product } from '../models/product';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class EncriptacionService {

  public passEncript: string;
  product = {} as Product;
  usuario = {} as Usuario;

  constructor() { }

  encriptar(pass, pin) {
    this.passEncript = CryptoJS.AES.encrypt(pass.trim(), pin.trim()).toString();
    return this.passEncript;
  }
}