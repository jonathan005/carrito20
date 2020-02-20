import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class OtherGuardGuard implements CanActivate  {
  constructor(private AFAuth: AngularFireAuth, private navController: NavController) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.AFAuth.authState.pipe(map(auth => {
      if (isNullOrUndefined(auth)) {
        this.navController.navigateRoot("/login");
        return false;
      }
      return true;
    }));
  }
}

