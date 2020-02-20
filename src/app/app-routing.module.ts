import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import { OtherGuardGuard } from './guards/other-guard.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo:"login", pathMatch: 'full'
  },
  {
    path: 'home2',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [OtherGuardGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [OtherGuardGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home-help',
    loadChildren: () => import('./pages/home-help/home-help.module').then( m => m.HomeHelpPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/productos.module').then( m => m.ProductosPageModule),
    canActivate: [OtherGuardGuard]
  },
  {
    path: 'productos/:name',
    loadChildren: () => import('./pages/productos/productos.module').then( m => m.ProductosPageModule),
    canActivate: [OtherGuardGuard]
  },
  {
    path: 'cart-modal',
    loadChildren: () => import('./pages/cart-modal/cart-modal.module').then( m => m.CartModalPageModule),
    canActivate: [OtherGuardGuard]
  },
  {
    path: 'info',
    loadChildren: () => import('./pages/info/info.module').then( m => m.InfoPageModule),
    canActivate: [OtherGuardGuard]
  },
  {
    path: 'personalinfo',
    loadChildren: () => import('./pages/personalinfo/personalinfo.module').then( m => m.PersonalinfoPageModule),
    canActivate: [OtherGuardGuard]
  },
  {
    path: 'paymentinfo',
    loadChildren: () => import('./pages/paymentinfo/paymentinfo.module').then( m => m.PaymentinfoPageModule),
    canActivate: [OtherGuardGuard]
  },
  {
    path: 'historyinfo/:historia',
    loadChildren: () => import('./pages/productdetail/productdetail.module').then( m => m.ProductdetailPageModule),
    canActivate: [OtherGuardGuard]
  },
  {
    path: 'historyinfo',
    loadChildren: () => import('./pages/historyinfo/historyinfo.module').then( m => m.HistoryinfoPageModule)
    ,canActivate: [OtherGuardGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
    ,canActivate: [OtherGuardGuard]
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
    ,canActivate: [OtherGuardGuard]
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)

  },
  {
    path: 'productdetail',
    loadChildren: () => import('./pages/productdetail/productdetail.module').then( m => m.ProductdetailPageModule)
    ,canActivate: [OtherGuardGuard]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
