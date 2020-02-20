import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../models/user.class';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { ShareDataService } from './share-data.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public valorDescuento=Math.floor(Math.random() * (15 - 1 + 1) + 1);
  public isLogged: any = false;
  //public USERID:string;

  constructor(public afAuth:AngularFireAuth, private shareData:ShareDataService,public db:AngularFirestore, private navCtrl:NavController) {
    afAuth.auth.onAuthStateChanged(user=> (this.isLogged=user))
    
   }
   
   //Register
   async onRegister(user: User){
     console.log("user",user.password);
     try {
       return await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
     } catch (error) {
       console.log('Error registrando',error);
     }
   }

   register(nombres:string, apellidos:string, fechaNacimiento:string, email:string, ciudad:string, pais:string, edad:number,password:string){
      return new Promise ((resolve,reject) =>{
        this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(res=>{
          const uid = res.user.uid;
          console.log("Id de usuario:"+uid);
          this.db.collection('usuarios').doc(uid).set({
            uid:uid,
            nombres: nombres,
            apellidos: apellidos,
            fechaNacimiento:this.shareData.getFechaNacimiento(),
            email: email,
            ciudad:ciudad,
            pais:pais,
            edad:edad
          })
          resolve(res)
        }).catch(err => reject(err))
      })
    }
   //Login
   async onLogin(user: User){
    try {
      //this.USERID=this.afAuth.auth.currentUser.uid;
      //this.afAuth.auth.setPersistence("local");
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
    } catch (error) {
      console.log('Error ingresando', error);
    }
  }
  async getUserId(){
    return await this.afAuth.auth.currentUser.uid;
  }
  /*aync getUserData(){

  }*/
}