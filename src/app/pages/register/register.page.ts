import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';
import { async } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public nombres:string;
  public apellidos:string;
  public fechaNacimiento:string;
  public email:string;
  public ciudad:string;
  public pais:string;
  public edad:number;
  public password:string;
  public fecha:any;
  constructor(private authSrv:AuthService, private router:Router, private dataSrv:ShareDataService,
    private toastcontroller:ToastController) {
    
   }

  ngOnInit() {
    
    //console.log(this.fecha);
  }
  ionViewWillEnter(){
    this.fecha=this.dataSrv.FECHAMOSTRADA;
  }
  accionRegistro(){
    if(this.nombres==null || this.apellidos==null|| this.email==null ||
      this.ciudad==null || this.pais==null || this.edad==null || this.password==null){
        this.presentToast("Ingrese correctamente todos los campos");
      }
    this.authSrv.register(
      this.nombres,this.apellidos,this.fechaNacimiento,
      this.email,this.ciudad, this.pais, this.edad,this.password
    ).then(auth=>{
      this.presentToast("Registro exitoso");
      this.router.navigateByUrl('/home');
      this.dataSrv.FECHAMOSTRADA=null;
    }).catch(err=>{if(err.message=="The email address is already in use by another account."){
        this.presentToast("Correo electrónico ya registrado.")
    }})
  }
  abrirCalendario(){
    this.router.navigateByUrl("/calendar");
  }
  async presentToast(presentar: string) {
    const toast = await this.toastcontroller.create({
      message: presentar,
      duration: 2000
    });
    toast.present();
  }
}
