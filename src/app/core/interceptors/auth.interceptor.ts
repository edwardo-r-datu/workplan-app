import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // In a real app this token would come from an AuthService
  private readonly mockToken = 'mock-bearer-token-abc123';

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Clone the request — HttpRequest is immutable, so we must clone to modify headers
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.mockToken}`,
        'X-App-Version': '1.0.0',
      },
    });

    return next.handle(authReq);
  }
}
