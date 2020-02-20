import { Component, OnInit } from '@angular/core';
import { ProductI } from 'src/app/models/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  
  cart: ProductI[] = [];
  public MONTO;
  constructor(private cartService: CartService, private modalCtrl: ModalController, 
    private alertCtrl: AlertController,
    private router:Router,
    private auth:AuthService,
    private shareData:ShareDataService) { }
 
  ngOnInit() {
    this.cart = this.cartService.getCart();
    //console.log(this.cart);
  }
 
  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }
 
  removeCartItem(product) {
    this.cartService.removeProduct(product);
    product.amount=0;
    if (this.cartService.getCartItemCount().value==0){
      this.modalCtrl.dismiss();
    }
  }
 
  getTotal() {
    this.shareData.setSubtTotal(this.cart.reduce((i, j) => i + j.price * j.amount, 0));
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }
  getDescuento() { 
    // min and max included 
    return this.auth.valorDescuento;
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
  removeCart(){
    this.cartService.removeAll();
    this.cartService.restartCart();
    this.modalCtrl.dismiss(); 
  }
 
  async checkout() {
    // Perfom PayPal or Stripe checkout process
 
    /*let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your food as soon as possible',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
    */
    //this.cartService.restartCart();
    this.modalCtrl.dismiss();
    this.shareData.setDetalles(this.cart);
    this.router.navigateByUrl('/checkout');

  }
  getTotalFinal(){
    this.shareData.setData((this.getTotal() - this.getTotal()*(this.getDescuento()/100))*0.12+(this.getTotal() - this.getTotal()*(this.getDescuento()/100)));
    return (this.getTotal() - this.getTotal()*(this.getDescuento()/100))*0.12+(this.getTotal() - this.getTotal()*(this.getDescuento()/100));
  }
}

