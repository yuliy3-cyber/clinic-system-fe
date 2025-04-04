import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MasterService } from './service/master.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private masterService: MasterService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.masterService.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
