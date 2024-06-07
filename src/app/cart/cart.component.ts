import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product } from '../product';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products!:any[];
  product!:product;
  quantityInput: any; 
  // product :any = [];
  totalPrice !:number;
  
  
  constructor( private http:HttpClient, private cartsvc:CartService ){}


  ngOnInit():void{
    this.cartsvc.getProducts().subscribe(result=>{
      this.products = result;
      
      this.totalPrice = this.cartsvc.getTotalPrice();
    })

  // tax = (this.totalPrice * this.taxRate).toFixed(2);
  // console.log(tax)
  // subtotal = (this.totalPrice * (this.taxRate+1)).toFixed(2);

  
  }

  // addToCart(product: any) {
  //   const existingProduct = this.cartItems.find(item => item.id === product.id);
  //   if (existingProduct) {
  //     existingProduct.quantity += 1;
  //   } else {
  //     product.quantity = 1;
  //     this.cartItems.push(product);
  //   }
  //   this.productList.next(this.cartItems);
  // }

  addToCart(item:any){
    this.cartsvc.addToCart(item);
    this.updateCart();
  }

  removeItem(item:any){
    this.cartsvc.removeCartItem(item);
    this.updateCart();
  }
  emptyCart(){
    this.cartsvc.removeAllCart()
  }
  updateCart() {
    this.cartsvc.getProducts().subscribe(result => {
      this.products = result;
      this.totalPrice = this.cartsvc.getTotalPrice();
    });
  }
  
 
  increaseQuantity(product: any) {
    if(product.stock<product.quantity){
      this.cartsvc.updateQuantity(product, 1);
    }
    
  }

  decreaseQuantity(product: any) {
    if(product.quantity>1){
      product.quantity -= 1;
      this.cartsvc.updateQuantity(product, -1);
      this.updateCart();
    }
    
  }
  tax(){
    return (this.totalPrice * 0.18).toFixed(2);
  }

  grandTotal(){
    return (this.totalPrice * 1.18).toFixed(2);
  
  }

  checkout(){
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thank You.",
      footer: 'Your order has been placed. Please check your email for the detailed delivery information.',
      showConfirmButton: false,
      timer: 2500
    });
    this.emptyCart();
  }


  
}