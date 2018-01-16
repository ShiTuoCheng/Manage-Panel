/*
    开机 iScroll 滚动 指令
*/

import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import iScroll from '@framework/lib/iscroll';
declare var jquery: any;
declare var $: any;


@Directive({
    selector: '[g-scroll]'
})

export class ScrollDirective implements OnInit {

    constructor(private elementRef: ElementRef) {}

    ngOnInit() {

        setTimeout(() => {
            const ele = this.elementRef.nativeElement;

            new iScroll(this.elementRef.nativeElement, {
                mouseWheel: true,
                scrollbars: false
            });
        }, 0);
    }
}
