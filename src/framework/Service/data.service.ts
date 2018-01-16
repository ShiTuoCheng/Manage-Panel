/**
 * shituocheng
 * 借口请求耗时服务
 */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DebugService } from './debug.service';

@Injectable()
export class DataIntercepter implements HttpInterceptor {

    constructor(private debug: DebugService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        return next
            .handle(req)
            .do(event => {
                if (event instanceof HttpResponse) {

                    const elapsed = Date.now() - started;
                    this.debug.log(`请求接口 ${req.urlWithParams} 花了这么多时间: ${elapsed} ms.`, 'log');
                }
            });
    }
}
