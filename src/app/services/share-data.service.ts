import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private data:number;
  private FechaNacimiento:string;
  public FECHAMOSTRADA;
  private IDPedido;
  private carrito:any;
  private total;
  private subtotal;
  private valordescuento;
  private valorIVA;
  private lat;
  private lng;
  constructor() { }

  getData(){
    return this.data;
  }
  setData(value: number){
    this.data=value;
  }

  getFechaNacimiento(){
    this.FECHAMOSTRADA=this.FechaNacimiento;
    return this.FechaNacimiento;
  }
  setFechaNacimiento(anio:number,mes:number,dia:number){
    this.FechaNacimiento=dia+"/"+mes+"/"+anio;
  }

  getPedidoID(){
    return this.IDPedido;
  }

  setPedidoID(idPed:string){
    this.IDPedido=idPed;
  }

  setDetalles(carrito:any){
    this.carrito=carrito;
  }
  getDetalles(){
    return this.carrito;
  }

  getTotal(){
    return this.total;
  }
  setTotal(total:number){
    this.total=total;
  }

  setSubtTotal(subtotal:number){
    this.subtotal=subtotal;
  }

  getSubTotal(){
    return this.subtotal;
  }

  setValorDescuento(v:number){
    this.valordescuento=v;
  }
  getValorDescuento(){
    return this.valordescuento;
  }
  setValorIva(iva:number){
    this.valorIVA=iva;
  }
  getValorIva(){
    return this.valorIVA;
  }

  setUbicacion(lat:number,lng:number){
    this.lat=lat;
    this.lng=lng
  }
  getUbicacion(){
    return [this.lat,this.lng];
  }
}
