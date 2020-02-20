import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CategoriaI } from '../models/categoria.interface';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriaCollection: AngularFirestoreCollection<CategoriaI>;
  private categorias: Observable<CategoriaI[]>;
  constructor(private db: AngularFirestore) {
    this.categoriaCollection= db.collection<CategoriaI>('categorias');
    this.categorias=this.categoriaCollection.snapshotChanges().pipe(map(
      acctions =>{
        return acctions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        });
      }
    ));
   }
   getCategorias(){
     return this.categorias;
   }
   getCategoria(id:string){
     return this.categoriaCollection.doc<CategoriaI>(id);
   }
   /*
   searchCategory(categoria:CategoriaI){
    return this.db.collection(
    'categorias', ref => ref.where('name', '==', categoria.nombre)).snapshotChanges();
   }*/
}