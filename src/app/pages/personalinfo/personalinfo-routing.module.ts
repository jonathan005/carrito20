import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalinfoPage } from './personalinfo.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalinfoPageRoutingModule {}
