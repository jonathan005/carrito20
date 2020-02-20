import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ProductI } from '../models/product.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private productoCollection: AngularFirestoreCollection<ProductI>;
  private data: Observable<ProductI[]>;
  constructor(public db:AngularFirestore) {

   }
 
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  getProducts(nombreCat:string) {
    this.productoCollection= this.db.collection<ProductI>('productos',ref => ref.where('categoria', '==', nombreCat));
    this.data=this.productoCollection.snapshotChanges().pipe(map(
      acctions =>{
        return acctions.map(a =>{
          const datass = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...datass};
        });
      }
    ));
    //console.log(this.nombreCat);
    return this.data;
  }
 
  getCart() {
    //console.log(this.cart.length);
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  addProduct(product) {
    let added = false;
    //console.log(product.id);
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount += 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value+1);
  }
 
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.amount>1){
        if (p.id === product.id) {
          p.amount -= 1;
          this.cartItemCount.next(this.cartItemCount.value - 1);
        }
      }
      
      /*
      if(this.cartItemCount.value==1){
        this.cartItemCount.next(1);
      }else{
        this.cartItemCount.next(this.cartItemCount.value - 1);
      }*/
      }
      
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
    product.amount=0;
  }

  removeAll(){
    let num=0;
    //console.log(this.cart.length);
    while(num<this.cart.length){
      this.removeProduct(this.cart[num]);
      num=num+1;
    }
    this.cartItemCount.next(0);
    this.cart=[];
    //console.log(this.cart[0]);
    //this.cartItemCount.value=0;
    /*while(this.cart.length > 0) {
      this.cart.pop();
    }
    
    this.cart=[];
    this.cartItemCount.next(0);*/
  }
  restartCart(){
    this.cart=[];
    this.cartItemCount.next(0);
  }
}