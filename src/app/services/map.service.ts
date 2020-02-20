import { Injectable } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class MapService {
  public lat:number;
  public lng:number;
  map;
  constructor(private geolocation:Geolocation) {
    this.getMyLocation();
   }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.getMyLocation();
  }
  /*
  loadMap() {
    let latLng = new google.maps.LatLng(this.lat, this.lng);
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });
    new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
  }*/

  getMyLocation() {
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then(location => {
      this.lat = location.coords.latitude;
      this.lng = location.coords.longitude;
      //this.loadMap();
    })
  }

}