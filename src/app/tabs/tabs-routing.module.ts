import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: "/home/home",
        pathMatch: "full"},
        {
          path: 'home',
          loadChildren: () =>
            import('../pages/home/home.module').then(m => m.HomePageModule)
        },
      {
        path: 'info',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/info/info.module').then(m => m.InfoPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
