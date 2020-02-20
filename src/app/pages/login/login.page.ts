import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.class';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators,ReactiveFormsModule,FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user:User = new User();
  constructor(private authsrv:AuthService, private router: Router, private toastcontroller: ToastController) { 
    /*this.gForm=new FormGroup({
      mail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
  
    });*/
    
  }
  ngOnInit() {
  }
  async onLogin(){
    
    const user = await this.authsrv.onLogin(this.user);
    //const idUsuario = this.authsrv.getUserId();
    //console.log(this.authsrv.USERID);
    if(user){
      this.presentToast('Ingreso exitoso');
      this.router.navigateByUrl('/home');
    }else {
      this.presentToast('Verifique sus credenciales');
    }
    if(this.user.email==null && this.user.password==null){
      this.presentToast('Ingrese sus credenciales');
    } else if(this.user.password==null && this.user.email!=null){
      this.presentToast('Ingrese su contraseña');
    }else if(this.user.email==null && this.user.password!=null){
      this.presentToast('Ingrese su ccorreo electrónico');
    }
  }

  async presentToast(presentar: string) {
    const toast = await this.toastcontroller.create({
      message: presentar,
      duration: 2000
    });
    toast.present();
  }
  pagRegistrar(){
    this.router.navigateByUrl('/register');
  }
}
