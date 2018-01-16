// import { Injectable } from '@angular/core';
// import {
//     HttpRequest,
//     HttpResponse,
//     HttpInterceptor,
//     HttpHandler,
//     HttpSentEvent,
//     HttpHeaderResponse,
//     HttpProgressEvent,
//     HttpUserEvent } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

// export abstract class HttpCache {
//     abstract get (request: HttpRequest<any>): HttpResponse<any> | null;

//     abstract put (request: HttpRequest<any>, response: HttpResponse<any>): void;
// }

// @Injectable()
// export class CacheService implements HttpInterceptor {

//     constructor(private cache: HttpCache) {}

//     intercept(req: HttpRequest<any>, next: HttpHandler):
//     Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
//         if (req.method !== 'GET') {
//             return next.handle(req);
//         }
//         const cacheResponse = this.cache.get(req);

//         if (cacheResponse != null) {

//             return Observable.of(cacheResponse);
//         }

//         return next.handle(req).do(event => {

//             if (event instanceof HttpResponse) {
//                 this.cache.put(req, event);
//             }
//         });
//     }
// }

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    private cache = {};

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.method !== 'GET') {
            return next.handle(request);
        }

        const cachedResponse = this.cache[request.urlWithParams] || null;
        if (cachedResponse) {
            return Observable.of(cachedResponse);
        }

        return next.handle(request).do(event => {
            if (event instanceof HttpResponse) {
                this.cache[request.urlWithParams] = event;

                console.log(this.cache);
            }
        });
    }
}
