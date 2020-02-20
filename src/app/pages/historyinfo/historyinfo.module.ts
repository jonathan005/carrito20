import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryinfoPageRoutingModule } from './historyinfo-routing.module';

import { HistoryinfoPage } from './historyinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryinfoPageRoutingModule
  ],
  declarations: [HistoryinfoPage]
})
export class HistoryinfoPageModule {}
