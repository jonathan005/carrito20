import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';
import { PedidodetalleService } from 'src/app/services/pedidodetalle.service';
import {DetalleI} from '../../models/detalle.interface'
import { parse } from 'querystring';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PedidoI } from 'src/app/models/pedido.interface';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.page.html',
  styleUrls: ['./productdetail.page.scss'],
})
export class ProductdetailPage implements OnInit {
  listaPedidos:PedidoI[];
  descuento:number;
  tosinD: number;

  constructor(private shareData:ShareDataService, private pedidoService:PedidosService) { 
    console.log(this.shareData.getPedidoID());
    
  }
  ngOnInit() {
    this.pedidoService.obtenerPedidoID(this.shareData.getPedidoID()).subscribe(
      res =>{
        console.log(res);
        this.listaPedidos = res;
      }
    )
  }
  obtenerDescuento(subtotal:number,descuento:number){
    this.tosinD=parseFloat((subtotal-((subtotal)*descuento/100)).toFixed(2));
    return (((subtotal)*descuento/100)).toFixed(2);
  }
  obtenerIVA(){
    return parseFloat((this.tosinD*0.12).toFixed(2))
  }
  
}
