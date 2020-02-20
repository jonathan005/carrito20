import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalinfoPageRoutingModule } from './personalinfo-routing.module';

import { PersonalinfoPage } from './personalinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalinfoPageRoutingModule
  ],
  declarations: [PersonalinfoPage]
})
export class PersonalinfoPageModule {}
