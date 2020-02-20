import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryinfoPage } from './historyinfo.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryinfoPageRoutingModule {}
