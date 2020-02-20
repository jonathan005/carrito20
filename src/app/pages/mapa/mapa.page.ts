import { Component, OnInit } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ThrowStmt } from '@angular/compiler';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  lat;
  lng;
  map;
  public marker:any;
  private ub;
  constructor(private geolocation:Geolocation,
    private dataShare:ShareDataService,
    private navCtrl:NavController,
    private router:Router) { }

  ngOnInit() {
    //this.ionViewDidEnter();
  }


  ionViewDidEnter() {
    this.getMyLocation();
    //this.loadMap();
  }
  loadMap() {

    let latLng={
      lat: this.lat,
      lng: this.lng
    }

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      draggable:true
    });
    this.marker.addListener('dragend', function async(ev: any) {
      let ubicacion = ev.latLng;
      //console.log("Su nueva ubicación es "+ ubicacion);
    });
    //console.log("Posicion:" + this.marker.position.lat());
    
  }
  getMyLocation() {
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then(location => {
      this.lat = location.coords.latitude;
      this.lng = location.coords.longitude;
      //console.log("Ubicacion actualizada "+this.lat,this.lng);
      //this.dataShare.setUbicacion(this.lat,this.lng);
      this.loadMap();
    })
  }
  confirmar(){
    this.dataShare.setUbicacion(this.marker.position.lat(),this.marker.position.lng());
    this.router.navigateByUrl('/checkout'); 
  }

}
