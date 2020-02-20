import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentinfoPageRoutingModule } from './paymentinfo-routing.module';

import { PaymentinfoPage } from './paymentinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentinfoPageRoutingModule
  ],
  declarations: [PaymentinfoPage]
})
export class PaymentinfoPageModule {}
