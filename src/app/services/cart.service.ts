import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: any[] = [];
  productList = new BehaviorSubject<any[]>([]);

  constructor() {}

  getProducts() {
    return this.productList.asObservable();
  }

  addToCart(product: any) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }
    this.productList.next(this.cartItems);
    
  }

   // addToCart(data:product){
  //   this.cartItems.push(data);
  //   this.subject.next(this.cartItems);
  //   console.log(this.cartItems)
  // }

  
  removeCartItem(product: any) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.productList.next(this.cartItems);
  }

  removeAllCart() {
    this.cartItems = [];
    this.productList.next(this.cartItems);
  }

  updateQuantity(product: any, quantity: number) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
      if (existingProduct.quantity <= 0) {
        this.removeCartItem(existingProduct);
      }
    }
    this.productList.next(this.cartItems);

  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity,0);
  }

}
