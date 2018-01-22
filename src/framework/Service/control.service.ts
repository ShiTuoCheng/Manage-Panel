/**
 * shituocheng
 * 顶部路由刷新和退出登录服务的封装
 */
import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { EventQueue } from '@framework/Utils/EventQueue';

@Injectable()
export class ReloadService {

    routerReload = new EventEmitter<any>();

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {
        this.routerReload.subscribe((url?: string) => {
            this.router.routeReuseStrategy.shouldReuseRoute = () => {
                return false;
            };
            this.router.navigated = false;
            this.router.navigateByUrl(url);
        });
    }
}

@Injectable()
export class LogOutService {

    logOut = new EventEmitter<any>();

    constructor(private router: Router, private eventQueue: EventQueue) {

        this.logOut.subscribe(() => {
            this.router.navigateByUrl('/login').then(() => {
                environment.isLogin = false;
                localStorage.setItem('userToken', '');
            });
        });
    }
}
