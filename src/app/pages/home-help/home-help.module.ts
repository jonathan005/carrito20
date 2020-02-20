import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeHelpPageRoutingModule } from './home-help-routing.module';

import { HomeHelpPage } from './home-help.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeHelpPageRoutingModule
  ],
  declarations: [HomeHelpPage]
})
export class HomeHelpPageModule {}
