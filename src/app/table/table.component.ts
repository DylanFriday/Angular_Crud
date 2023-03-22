import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Validators} from '@angular/forms'
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  totalValue : number = 0

  // @Output() totalValue = new EventEmitter<number>()
  productArr: any[] = [];
  priceArr: any[] = []
  searchProduct = '';
 

  product: { id: number, name: string, quantity: number, price: number, total: number,SumArr : Array<any>} = {
    id: 0,
    name: '',
    quantity: 0,
    price: 0,
    total: 0,
    SumArr : []
  }
  // Total = this.product.total
  constructor() {

  }
  ngOnInit(): void {
    const localData = localStorage.getItem('productList')
    if (localData != null) {
      this.productArr = JSON.parse(localData)
    }
  }

  openModal() {
    const modalDiv = document.getElementById('mymodal')
    if (modalDiv != null) {
      modalDiv.style.display = 'block'
    }
  
    
    this.product = {
      id: 0,
      name: '',
      quantity: 0,
      price: 0,
      total: 0,
      SumArr : []
    }
   const name = document.getElementById('nameValid')
   if(name != null){
    name.style.display = 'none'  
   }
   const quantity = document.getElementById('quantityValid')
   if(quantity != null){
    quantity.style.display = 'none'  
   }
   const price = document.getElementById('priceValid')
   if(price != null){
    price.style.display = 'none'  
   }
   
  }

  closeModal() {
    const modalDiv = document.getElementById('mymodal')
    if (modalDiv != null) {
      modalDiv.style.display = 'none'
    }
  }
  cancelProduct(){
    const localData = localStorage.getItem('productList')
    if (localData != null) {
      this.productArr = JSON.parse(localData)
    }
    this.closeModal();
  }
  increase() {
    this.product.quantity++
  }
  decrease() {
    if (this.product.quantity != 0)
      this.product.quantity--
  }
  getTotal() {
    return this.product.total = this.product.quantity * this.product.price
  }



  saveProduct(data: any) {
    this.product.id = this.productArr.length + 1
    this.productArr.push(this.product)
    console.log(this.getTotal());
    this.priceArr.push(this.product.total)
    this.product.SumArr.push(this.priceArr)
    console.log(this.priceArr);
    console.log(this.product.SumArr);
    console.log(this.product);
    this.closeModal()
    localStorage.setItem('productList', JSON.stringify(this.productArr))
    this.product = {
      id: 0,
      name: '',
      quantity: 0,
      price: 0,
      total: 0,
      SumArr : []
    }
  }
  arrSum(priceArr: number[]) {
    let sum :number = 0;
    for (let i = 0; i < priceArr.length; i++) {
      sum += priceArr[i]
    }
    return sum;
  }
  // arrSum(SumArr :Array<any>) {
  //   debugger
  //   let sum :any = 0;
  //   for (let i = 0; i <SumArr[0].length; i++) {
  //     sum += SumArr[0[i]]
  //   }
  //   return sum;
  // }

  editProduct(product: any) {
   
    this.openModal()
    this.product = product
  }
  ngAfterContentChecked(){
    let total = 0
    for (let i = 0; i < this.productArr.length; i++) {
      total += this.productArr[i].quantity * this.productArr[i].price
    }
    this.totalValue = total
  }
  updateProduct() {
    const productRecord = this.productArr.find(productID => productID.id == this.product.id)
    productRecord.name = this.product.name;
    productRecord.quantity = this.product.quantity;
    productRecord.price = this.product.price;
    localStorage.setItem('productList', JSON.stringify(this.productArr))
    this.closeModal()
  }

  deleteProduct(id: number) {
    for (let i = 0; i < this.productArr.length; i++) {
      if (this.productArr[i].id === id) {
        this.productArr.splice(i, 1)
      }
    }
    localStorage.setItem('productList', JSON.stringify(this.productArr))
  }
}
