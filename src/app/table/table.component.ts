import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  @Output () totalValue = new EventEmitter<number>()
  productArr : any[] = [];
  total : number = 0;
  product : {id : number,name : string, quantity : number, price : number} = {
    id : 0,
    name: '',
    quantity: 0,
    price: 0,
  }
  constructor(){

  }
  ngOnInit(): void {
    const localData = localStorage.getItem('productList')
    if(localData != null){
      this.productArr = JSON.parse(localData)
    }
  }
  
  openModal(){
     const modalDiv = document.getElementById('mymodal')
     if(modalDiv!= null){
      modalDiv.style.display = 'block'
     }
     this.product = {
      id : 0,
      name : '',
      quantity : 0,
      price : 0,
    }
  }
  closeModal(){
    const modalDiv = document.getElementById('mymodal')
    if(modalDiv!= null){
     modalDiv.style.display = 'none'
    }
 }
 increase(){
  this.product.quantity++
 }
 decrease(){
  if(this.product.quantity != 0)
  this.product.quantity--
 }


 saveProduct(data : any){
  this.product.id = this.productArr.length + 1
  this.productArr.push(this.product)
  this.totalValue.emit(this.total)
  this.closeModal()
  localStorage.setItem('productList',JSON.stringify(this.productArr))
  this.product = {
    id : 0,
    name : '',
    quantity : 0,
    price : 0,
  }
 }

 editProduct(product : any){
  debugger
  this.openModal()
  this.product = product
  
 }

 updateProduct(){
    const productRecord = this.productArr.find(productID =>productID.id == this.product.id)
    productRecord.name = this.product.name;
    productRecord.quantity = this.product.quantity;
    productRecord.price = this.product.price;
    localStorage.setItem('productList',JSON.stringify(this.productArr))
    this.closeModal()
 }

 deleteProduct(id : number){
    for(let i =0;i <this.productArr.length;i++){
      if(this.productArr[i].id === id){
        this.productArr.splice(i,1)
      }
    }
    localStorage.setItem('productList',JSON.stringify(this.productArr))
 }

}
