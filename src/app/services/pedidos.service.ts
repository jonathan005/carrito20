import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PedidoI } from '../models/pedido.interface';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { ShareDataService } from './share-data.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private pedidoCollection: AngularFirestoreCollection<PedidoI>;
  private pedidos: Observable<PedidoI[]>;
  public IDPedidoBase:string;
  constructor(private db:AngularFirestore, private afAuth:AngularFireAuth,
    private shareData:ShareDataService) { 

    
  }

  agregarPedido(pedido:PedidoI){
    this.pedidoCollection= this.db.collection<PedidoI>('pedidos');
    /*
    this.pedidos=this.pedidoCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        });
      }
    ));

    */

    return this.pedidoCollection.doc(this.shareData.getPedidoID()).set(pedido);
  }

  obtenerPedidos(){
    this.pedidoCollection= this.db.collection<PedidoI>('pedidos',ref => ref.where('uid', '==', this.afAuth.auth.currentUser.uid));
    this.pedidos=this.pedidoCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        });
      }
    ));
    return this.pedidos;
  }

  obtenerPedidoID(idPed:string){
    this.pedidoCollection= this.db.collection<PedidoI>('pedidos',ref => ref.where('pedidoID', '==', idPed));
    this.pedidos=this.pedidoCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        });
      }
    ));
    return this.pedidos;
  }
  /*
  resolverID(){
    return this.IDPedidoBase;
  }*/

}
