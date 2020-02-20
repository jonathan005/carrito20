import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { UsuarioI } from 'src/app/models/usuario.interface';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  public usuario:UsuarioI;
  constructor(private authServ: AuthService,private router:Router, private afAuth:AngularFireAuth,
    private dataservice:DataserviceService) {
   }

  ngOnInit() {
    //console.log(this.authServ.USERID);
    /*this.dataservice.getDatosUsuario(this.authServ.USERID).subscribe(
      res=>{
        this.usuario=res;
      }
    )*/
  }
  LogOut(){
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }
  personalInfo(){
    this.router.navigateByUrl('/personalinfo');
    //console.log("USUARIO NOMBRE:"+this.usuario.nombres);
  }
  paymentInfo(){
    this.router.navigateByUrl('/paymentinfo');
  }
  historyInfo(){
    this.router.navigateByUrl('/historyinfo');
  }
}
