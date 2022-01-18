import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    /**
     * add Bearer token to Http Header
     *
     * @param request HttpRequest
     * @param token string
     * @private
     */
    private static addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: { Authorization: `Bearer ` + token },
            // todo add officialAccountId params
            // params: req.params.set('officialAccountId', 'officialAccountId')
        });
    }

    /**
     * Identifies and handles a given HTTP request.
     *
     * @param request HttpRequest
     * @param next HttpHandler
     */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // 这里加入token值
        return next.handle(HeaderInterceptor.addToken(request, localStorage.getItem('token')));
    }
}
