export interface PedidoI{
    uid:string,
    formadepago:string;
    fechadepedido:string;
    subtotal:number,
    descuento:number,
    total:number;
    estado:string;
    lat:number,
    lon:number,
    referencia:string,
    productos:string,
    pedidoID:string
}