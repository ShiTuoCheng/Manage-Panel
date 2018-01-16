/**
 * shituocheng
 * 顶部路由刷新和退出登录服务的封装
 */
import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { EventQueue } from '@framework/Utils/EventQueue';

@Injectable()
export class ReloadService {

    routerReload = new EventEmitter<any>();

    constructor(private router: Router) {
        this.routerReload.subscribe((url?: string) => this.router.navigate(['/11111']).then(() => this.router.navigate([url])));
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
