/**
 * shituocheng
 * debug服务组件
 */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class DebugService {

    private isDebugMode: boolean = environment.debug;

    constructor() {}

    log(title: String, method: String, data?: JSON| Object| Function) {

        if ( this.isDebugMode) {

            if (data === void(0)) {
                if (method === 'log') {

                    console.log(title);
                }else if (method === 'error') {
                    console.error(title);
                }else if (method === "warn") {
                    console.warn(title);
                }
            } else {
                if (data instanceof Object) {
                    if (method === 'log') {

                        console.log(title, JSON.stringify(data, null, 2));
                    }else if (method === 'error') {
                        console.error(title, JSON.stringify(data, null, 2));
                    } else if (method === 'warn') {
                        console.warn(title, JSON.stringify(data, null, 2));
                    }
                }else if (typeof data === "function") {
                    data();
                }else {
                    if (method === 'log') {

                        console.log(title, data);
                    } else if (method === 'error') {
                        console.error(title, data);
                    } else if (method === 'warn') {
                        console.warn(title, data);
                    }
                }
            }
        }
    }
}
