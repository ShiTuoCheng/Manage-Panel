/*
    shituocheng
    loading动画组件
*/
import { Component, OnInit, EventEmitter, Injectable, Input, Output } from '@angular/core';

@Injectable()
export class LoadingService {

    show = new EventEmitter<any>();
    hide = new EventEmitter<any>();
}

@Component({

    selector: 'app-comm-loading',
    template: '<div class="c_loading" *ngIf="isShow">' +
                '<span class="line"></span>' +
                '<div class="loader"></div>' +
              '</div>',
    styleUrls: ['./loading.component.less']
})

export class LoadingComponent implements OnInit {

    public isShow: boolean;

    constructor(private loadingService: LoadingService) {}

    ngOnInit() {
        this.loadingService.show.subscribe((result?: any) => setTimeout(() => this.isShow = true, 0));
        this.loadingService.hide.subscribe((result?: any) => setTimeout(() => this.isShow = false, 0));
    }
}
