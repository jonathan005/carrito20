import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
//import { MapaPage } from '../mapa/mapa.page';
import { MapService } from 'src/app/services/map.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PedidoI } from 'src/app/models/pedido.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { throwIfEmpty } from 'rxjs/operators';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { DetalleI } from 'src/app/models/detalle.interface';
import { PedidodetalleService } from 'src/app/services/pedidodetalle.service';
import { ProductI } from 'src/app/models/product.interface';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
var currentTime = new Date();
const mpagos = new FormControl();
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  private todo : FormGroup;
  latitud:number;
  longitud:number;
  monto;
  //Campos de Pedido
  public formadepago:string;
  public total:number;
  public estado:string;
  public ubicacion:string;
  public referencia:string;
  public carro:any;
  public fechadepedido=currentTime.getDate()+"/"+(currentTime.getMonth()+1)+"/"+currentTime.getFullYear();
  pedidoNuevo:PedidoI;
  detalleNuevo:DetalleI;
  public latt:number;
  public longg:number;
  constructor(private router: Router,private modalCtrl: ModalController, 
    private alertCtrl: AlertController,private mapService:MapService,
    private pedidoSrv:PedidosService,
    private afAuth:AngularFireAuth,
    private formBuilder: FormBuilder,
    private location: Location,
    private cartService: CartService,
    private shareData: ShareDataService,
    private pedDetalleSRV:PedidodetalleService,
    private db:AngularFirestore,
    private auth:AuthService,
    private toastController:ToastController) {
      this.total=parseFloat((this.shareData.getData()).toFixed(2));
     }

  ionViewWillEnter(){
    //console.log("Latitud: "+ this.lat);
    this.latt=this.shareData.getUbicacion()[0];
    this.longg=this.shareData.getUbicacion()[1];
  }
  ngOnInit() {
   // console.log("UBICACION: "+ this.shareData.getUbicacion());
  }
  async enviarPedido(){
    //this.router.navigateByUrl('/tabs/home');
    let alert = await this.alertCtrl.create({
      header: 'Pedido hecho',
      message: 'Su pedido se encuentra en camino',
      buttons: ['OK']
    });
    alert.present();

  }
  abrirMapa(){
    this.router.navigateByUrl('/mapa')
  }
  
  /*obtenerUbicacion(){
    
    this.latitud=parseFloat((this.mapService.lat).toFixed(3));
    this.longitud=parseFloat((this.mapService.lng).toFixed(3));
    //this.mapaPage.getMyLocation();

    //this.latitud=this.mapaPage.lat;
    //this.longutud=this.mapaPage.lng;
    //console.log("lat"+this.latitud+" long"+this.longutud);
  }*/
  crearPedido(){
    
    this.shareData.setPedidoID(this.db.createId());
    this.pedidoNuevo={
      uid:this.afAuth.auth.currentUser.uid,
      formadepago: this.formadepago,
      fechadepedido: this.fechadepedido,
      subtotal: parseFloat(this.shareData.getSubTotal().toFixed(2)),
      descuento:this.auth.valorDescuento,
      total: parseFloat(this.shareData.getData().toFixed(2)),
      estado:"Procesando",
      lat:this.latt,
      lon: this.longg,
      referencia:this.referencia,
      productos:this.shareData.getDetalles(),
      pedidoID:this.shareData.getPedidoID()
    }
    if (this.pedidoNuevo.formadepago==null){
      this.presentToast("Seleccione una forma de pago");
    }else if(this.pedidoNuevo.referencia==null){
      this.presentToast("Ingrese una referencia");
    }else{
      //this.carro=this.shareData.getDetalles();
      this.pedidoSrv.agregarPedido(this.pedidoNuevo);
      /*this.detalleNuevo={
        productoID:this.carro,
        subtotal: parseFloat(this.shareData.getSubTotal().toFixed(2)),
        descuento:this.auth.valorDescuento,
        total: parseFloat(this.shareData.getData().toFixed(2)),
        pedidoID:this.shareData.getPedidoID()
      }*/
      //this.pedDetalleSRV.agregarDetalles(this.detalleNuevo);
      this.cartService.restartCart();
      this.router.navigateByUrl('/home');
      this.enviarPedido();
    }
  }
  cancelarPedido(){
    this.router.navigateByUrl("/home");
  }
  async presentToast(presentar: string) {
    const toast = await this.toastController.create({
      message: presentar,
      duration: 1000
    });
    toast.present();
  }
}
