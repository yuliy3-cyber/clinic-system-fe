import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MasterService } from './service/master.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private masterService: MasterService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.masterService.isLoggedIn()) {
      const expectedRole = next.data['expectedRole'];
      const currentRole = localStorage.getItem('role');

      if (expectedRole && currentRole !== expectedRole) {
        // If the user's role does not match the expected role, redirect to login
        this.router.navigate(['/login']);
        return false;
      }

      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
