import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  products : any[] = [];

  addProduct() : any {
    this.products.push({
      name : String,
      quantity : Number,
      price : Number
    })
  }

}
