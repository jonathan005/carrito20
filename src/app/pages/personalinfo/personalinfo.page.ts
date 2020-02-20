import { Component, OnInit } from '@angular/core';
import { UsuarioI } from 'src/app/models/usuario.interface';
import { DataserviceService } from 'src/app/services/dataservice.service';
//import { AuthService } from 'src/app/services/auth.service';
import {HomePage} from '../home/home.page';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.page.html',
  styleUrls: ['./personalinfo.page.scss'],
})
export class PersonalinfoPage implements OnInit {
  public usuario:UsuarioI;
  nombre:string;
  fechaNac:string;
  edad:number;
  ciudad:string;
  pais:string;
  correo:string;
  constructor(private datasrv:DataserviceService, private afAuth:AngularFireAuth) {
  }
  ngOnInit() {
    this.datasrv.getDatosUsuario(this.afAuth.auth.currentUser.uid).subscribe(
      res=>{
        this.usuario=res;
        this.nombre=this.usuario.nombres+" "+this.usuario.apellidos;
        this.fechaNac=this.usuario.fechaNacimiento;
        this.edad=this.usuario.edad;
        this.ciudad=this.usuario.ciudad;
        this.pais=this.usuario.pais;
        this.correo=this.usuario.email;
      }
    )
  }
  
}
