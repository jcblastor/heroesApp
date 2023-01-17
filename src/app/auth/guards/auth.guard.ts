import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';

import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificaAutenticacion().pipe(
      tap(isAuth => {
        if(!isAuth) this.router.navigate(['./auth/login'])
      })
    )
    /*
    if (this.authService.auth.id) return true;

    console.log('Bloqueado por el authgard - canActivate')
    return false;
     */
  }

  canLoad(
    route: Route, segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificaAutenticacion().pipe(
      tap(isAuth => {
        if(!isAuth) this.router.navigate(['./auth/login'])
      })
    )
    /*
    if (this.authService.auth.id) return true;

    console.log('Bloqueado por el authgard - canLoad')
    return false;
     */
  }
}
