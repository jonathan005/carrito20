import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { DetalleI } from '../models/detalle.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShareDataService } from './share-data.service';

@Injectable({
  providedIn: 'root'
})
export class PedidodetalleService {
  private detalleCollection:AngularFirestoreCollection<DetalleI>;
  private detalles:Observable<DetalleI[]>;
  constructor(private db:AngularFirestore, private sharedata:ShareDataService) {
    
   }
   
   obtenerDetalles(){
    this.detalleCollection= this.db.collection<DetalleI>('detalles',ref => ref.where('pedidoID', '==', this.sharedata.getPedidoID()));
    this.detalles=this.detalleCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        });
      }
    ));
    return this.detalles;
  }
  agregarDetalles(detalle:DetalleI){
    this.detalleCollection= this.db.collection<DetalleI>('detalles');
    this.detalles=this.detalleCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        });
      }
    ));
    console.log("Agregando detalles");
    this.detalleCollection.add(detalle);
  }
}
