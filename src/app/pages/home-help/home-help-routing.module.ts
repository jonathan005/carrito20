import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeHelpPage } from './home-help.page';

const routes: Routes = [
  {
    path: '',
    component: HomeHelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeHelpPageRoutingModule {}
