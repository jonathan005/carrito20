import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { formatDate, Location } from '@angular/common';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  private selected:any;
  private yearSearch:number;
  private monthSearch:number;
  private fecha:number;
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };
 
  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'es-ES',
    
  };
 
  @ViewChild(CalendarComponent, {static: false}) myCal: CalendarComponent;
 
  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,
  private router:Router,
  private navCtrl: NavController,
  private shareDataSrv:ShareDataService,
  private location:Location) { }
 
  ngOnInit() {
    //this.resetEvent();
  }
 /*
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }
 */
  // Create the right event format and reload source
  /*
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }
 
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
 
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }*/
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
   
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
   
  // Change between month/week/day
  /*
  changeMode(mode) {
    this.calendar.mode = mode;
  }*/
   
  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }
   
  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
   
  // Calendar event was clicked
  /*
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
   
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }*/
   
  // Time slot was clicked
  onTimeSelected(ev) {
    this.selected = new Date(ev.selectedTime);
    this.event.startTime = this.selected.toISOString();
    this.selected.setHours(this.selected.getHours() + 1);
    this.event.endTime = (this.selected.toISOString());
    //console.log(selected);
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    return date > current;
  };

  particularDate(){
    this.calendar.currentDate = new Date();
    if(this.monthSearch!=null){
      this.calendar.currentDate.setUTCMonth(this.monthSearch-1);
    }
    if (this.yearSearch!=null){
      this.calendar.currentDate.setUTCFullYear(this.yearSearch);
    }else{
      console.log(this.calendar.currentDate);
    }
  } 
  seleccionar(){
    //this.router.navigateByUrl("/register");
    this.location.back();
    this.fecha=this.selected.getUTCFullYear(),this.selected.getUTCMonth()+1,this.selected.getUTCDate();
    this.shareDataSrv.setFechaNacimiento(this.selected.getUTCFullYear(),this.selected.getUTCMonth()+1,this.selected.getUTCDate());
    console.log(this.shareDataSrv.getFechaNacimiento());
  }
  regresar(){
    this.fecha=null;
    this.location.back();
  }

  obtenerFecha(){
    
  }
}