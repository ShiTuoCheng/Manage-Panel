/**
 * shituocheng
 * 处理队列函数
 */
import {Injectable} from '@angular/core';
import {DebugService} from '@framework/Service/debug.service';

@Injectable()
export class Q {

    public queue = new Array<Function>();

    constructor(private debug?: DebugService) {}

    init() {

        const task = this.queue.shift();
        Promise.resolve(task)
            .then(() => {

                if (task instanceof Function) {
                    Promise.resolve(task())
                        .then(() => {

                            setTimeout(() => this.init());
                        })
                        .catch(err => this.debug.log('task函数出错了', 'error'));
                }
            })
            .catch((err) => {
                layer.msg('出错咯');
                console.warn('q回调函数出错: ' + err);
            });
    }

    push(obj: any) {

        this.queue.push(obj);
    }
}
