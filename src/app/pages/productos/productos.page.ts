import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProductI } from 'src/app/models/product.interface';
import { BehaviorSubject } from 'rxjs';
import { ModalController, ToastController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartModalPage } from '../cart-modal/cart-modal.page';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit{
  cart = [];
  products: ProductI[];
  cartItemCount: BehaviorSubject<number>;
  dataRecieved:string;
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
 
  constructor(private cartService: CartService, private modalCtrl: ModalController,
    public activeRoute:ActivatedRoute,
    public router:Router,
    private toastController:ToastController) {}
 
  ngOnInit() {
    this.dataRecieved = this.activeRoute.snapshot.paramMap.get('name').toUpperCase();//variable del nombre de categoria
    //console.log(this.dataRecieved);
    this.cartService.getProducts(this.dataRecieved.toLowerCase()).subscribe(
      res =>{
       this.products = res;
      }
    )
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  regresarHome(){
    this.router.navigateByUrl('/home');
  }
 
  addToCart(product) {
    this.cartService.addProduct(product);
    this.animateCSS('tada');
  }
 
  async openCart() {
    if (this.cartItemCount.value==0){
      this.presentToast();
    }else{
    this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Carro vacio",
      duration: 1000
    });
    toast.present();
  }
 
  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)
    
    //https://github.com/daneden/animate.css
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }

}