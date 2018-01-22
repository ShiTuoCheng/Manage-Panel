/**
 * shituocheng
 * 导航栏组件
 */
import { Component, OnInit, Input, Output, EventEmitter, Injectable, Pipe, PipeTransform, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { animate, trigger, state, style, transition, keyframes, query, group } from '@angular/animations';
import { log } from 'util';
import { TabsComponent, TabsHooks } from '@framework/Component/Tabs/tabs.component';
import iScroll from '@framework/lib/iscroll';

@Injectable()
export class NavigationService {
  // 导航栏事件分发
  // public navigationClick = new EventEmitter<any>();
  // 子导航栏点击事件分发
  public hasSub = new EventEmitter<any>();
  // 重新计算高度事件分发
  public resetHeight = new EventEmitter<any>();
}

@Pipe({ name: 'navigationPipe' })
export class NavigationPipe implements PipeTransform {
  transform(value: string, ...args: any[]) {
    if (value) {
      return value.charAt(0);
    }
  }
}

@Component({
  selector: 'app-nav-component',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
  animations: [
    trigger('visibility', [
      transition(':enter', [style({ height: 0, overflow: 'hidden' }), animate('.2s ease', style({ height: '*' }))]),
      transition(':leave', [style({ height: '*', overflow: 'hidden' }), animate('.2s ease', style({ height: 0 }))])
    ]),

    trigger('miniMode', [
      state('true', style({
        width: '56px'
      })),

      transition('true => false', [
        style({ width: '56px' }),

        query('.c-nav_logoWrap', style({
          opacity: 0
        })),

        animate('.2s ease-in', style({ width: '16%' })),

        query('.c-nav_logoWrap', [
          animate(200, style({
            opacity: 1
          }))
        ])
      ]),
      transition('false => true', [
        query('.c-nav_logoWrap', animate(200, style({
          opacity: 0
        }))),

        animate('.2s ease-in')
      ])
    ]),

    trigger('arrow', [
      state('true', style({
        opacity: 0
      }))
    ]),

    trigger('logo', [
      state('true', style({
        opacity: 0
      }))
    ])
  ]
})
export class NavigationComponent implements OnInit, AfterViewInit {

  @Input() public nav = []; // 导航栏数据结构
  @Input() public miniMode: boolean;  // 导航栏缩小模式
  private activeNav: any;
  private visibility;
  private isScroll?: any;
  private isClick = false;
  private subActiveNav: any;
  @Output() isExtend = false; // 是否为展开模式

  constructor(
    private navigationService: NavigationService,
    private elementRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // setInterval(() => {
    //   this.miniMode = !this.miniMode;
    // }, 1000);
  }

  ngAfterViewInit() {
    this.isScroll = new iScroll(this.elementRef.nativeElement.querySelector('.c-nav_body'), {
      mouseWheel: true,
      scrollbars: true
    });
  }

  // 动画结束监听
  animationDone() {
    this.navigationService.resetHeight.emit(this.isScroll);
  }

  // 主导航栏点击事件
  navSlide(act?: any): void {
    if (act === this.activeNav) {
      this.isClick = this.isClick ? false : true;
      this.navigationService.hasSub.emit(act.sub && this.isClick ? true : false);
      return;
    }

    this.activeNav = act;
    this.isClick = true;
    this.subActiveNav = null;
    if (act.href) {

      const str = act.href;
      // 事件分发，具体实现逻辑需引入导航栏服务
      // this.navigationService.navigationClick.emit(str);
      this.router.navigate([str], { relativeTo: this.route });
    }

    // 事件分发，具体实现逻辑需引入导航栏服务
    this.navigationService.hasSub.emit(act.sub && this.isClick ? true : false);
  }

  // 子导航栏点击事件
  subSlide(act?: any) {
    this.subActiveNav = act;
    if (act.href) {

      const str = typeof act.href === 'string' ? [act.href] : act.href;
      this.router.navigate(str, { relativeTo: this.route });
    }
  }
}
