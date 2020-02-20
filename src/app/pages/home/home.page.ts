import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { CategoriaI } from 'src/app/models/categoria.interface';
import { CartService } from 'src/app/services/cart.service';
import { ModalController, ToastController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public USERID;
  categorias: CategoriaI[];
  categoria: CategoriaI;
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  constructor(private categorysrv: CategoryService, private router: Router, 
    public cartService:CartService,
    private modalCtrl: ModalController,
    private toastController:ToastController ){}
  ngOnInit(){
    this.categorysrv.getCategorias().subscribe(
      res =>{
        this.categorias = res;
        //console.log(this.categorias);
      }
    )
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }
  categoryclicked(str:string){
    this.router.navigateByUrl('/productos/'+str);
    //console.log(this.categoria);
    //console.log('/listaproductos/parametrospasado');
  }
  
  addToCart(product) {
    this.cartService.addProduct(product);
    this.animateCSS('wobble');
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