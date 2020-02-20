import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UsuarioI } from '../models/usuario.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  private usuarioCollection: AngularFirestoreCollection<UsuarioI>;
  private categorias: Observable<UsuarioI[]>;
  constructor(db: AngularFirestore) {
    this.usuarioCollection= db.collection<UsuarioI>('usuarios');
    this.categorias=this.usuarioCollection.snapshotChanges().pipe(map(
      acctions =>{
        return acctions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        });
      }
    ));
   }
   getDatosUsuario(id:string){
    return this.usuarioCollection.doc<UsuarioI>(id).valueChanges();
  }
}
