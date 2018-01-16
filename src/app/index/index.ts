import {
  Component, ElementRef, ViewChild, SimpleChanges, Input, NgModule, NgZone, Injectable,
  OnInit, AfterViewInit, AfterContentInit, OnChanges, HostBinding, HostListener,
  Pipe, PipeTransform, EventEmitter, forwardRef, Directive
} from '@angular/core';
import { Router, RoutesRecognized, NavigationEnd, ActivatedRoute, Routes, RouterModule, NavigationStart } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { animate, trigger, state, style, transition, keyframes } from '@angular/animations';

import { CommHeaderComponent } from '@framework/Component/Header/header.component';
import { LoadingComponent, LoadingService } from '@framework/Component/Loading/loading.component';
import { NavigationService } from '@framework/Component/Navigation/navigation.component';
import { TabsComponent, TabsHooks } from '@framework/Component/Tabs/tabs.component';
import { FormSelectorComponent } from '@framework/Component/FormSelector/selector.component';
import { SearchPanelHooks } from '@framework/Component/SearchPanel/search.component';

import { ReloadService, LogOutService } from '@framework/Service/control.service.ts';
import { TokenService } from '@framework/Service/token.service';
import { Q } from '@framework/Utils/Q';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

import swal from 'sweetalert2';
import { environment } from 'environments/environment';
import { EventQueue } from '@framework/Utils/EventQueue';
import AdminUsers from '@app/models/adminUsers';
import Advertise from '@app/models/advertise';

import 'rxjs/add/operator/pairwise';


@Injectable()
export class GTabServer {
  obj;

  init(tar) {
    this.obj = tar;
  }
}

@Directive({
  selector: '[test]',
})
export class Test implements OnInit, OnChanges {
  @Input() offset: any;

  private originalHig: number;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.originalHig = this.el.nativeElement.offsetHeight;
  }

  ngOnChanges(ev) {
    if (!ev.offset.currentValue && ev.offset.currentValue !== 0) {

      return;
    }

    this.el.nativeElement.style.height = this.originalHig - +ev.offset.currentValue + 'px';
  }
}

@Component({
  selector: 'index',
  templateUrl: './index.html',
  styleUrls: ['./index.less'],
  providers: [EventQueue]
})
export class Index implements OnInit, AfterViewInit {

  @ViewChild('gTabs') gTabs;
  @ViewChild('gSearchPanel') gSearchPanel;

  public userName: string;
  public yqwv: TabsComponent;
  public viewMainHig: number;
  public viewHig: number;
  public url: string;
  public navControl: boolean;
  public navMini = false; // 导航栏缩小模式
  public isExtend = false; // 子导航栏是否为展开模式
  // 导航栏数据结构
  public fuck = [
    {
      'navName': '大佬',
      'sub': [
        {
          'subName': '子导航栏1',
          'href': 'formDemo'
        },
        {
          'subName': '子导航栏2',
          'href': 'listDemo'
        }
      ]
    },
    {
      'navName': '带带我',
      'href': '/index/header'
    },
    {
      'navName': '牛逼',
      'sub': [
        {
          'subName': '子导航栏1',
          'href': { outlets: { popup: null } }
        },
        { 'subName': '子导航栏2' },
        { 'subName': '子导航栏3' },
        { 'subName': '子导航栏4' },
        { 'subName': '子导航栏5' },
        { 'subName': '子导航栏6' },
        { 'subName': '子导航栏7' },
        { 'subName': '子导航栏8' },
        { 'subName': '子导航栏9' }
      ]
    },
    {
      'navName': 'Shit',
      'href': '/index'
    },
    {
      'navName': 'Fuck',
      'sub': [
        { 'subName': '子导航栏1' },
        { 'subName': '子导航栏2' },
        { 'subName': '子导航栏3' },
        { 'subName': '子导航栏4' },
        { 'subName': '子导航栏5' },
        { 'subName': '子导航栏6' },
        { 'subName': '子导航栏7' },
        { 'subName': '子导航栏8' },
        { 'subName': '子导航栏9' }
      ]
    },
    {
      'navName': 'Fuck',
      'sub': [
        { 'subName': '子导航栏1' },
        { 'subName': '子导航栏2' },
        { 'subName': '子导航栏3' },
        { 'subName': '子导航栏4' },
        { 'subName': '子导航栏5' },
        { 'subName': '子导航栏6' },
        { 'subName': '子导航栏7' },
        { 'subName': '子导航栏8' },
        { 'subName': '子导航栏9' }
      ]
    },
    {
      'navName': 'Fuck',
      'sub': [
        { 'subName': '子导航栏1' },
        { 'subName': '子导航栏2' },
        { 'subName': '子导航栏3' },
        { 'subName': '子导航栏4' },
        { 'subName': '子导航栏5' },
        { 'subName': '子导航栏6' },
        { 'subName': '子导航栏7' },
        { 'subName': '子导航栏8' },
        { 'subName': '子导航栏9' }
      ]
    },
    {
      'navName': 'Fuck',
      'sub': [
        { 'subName': '子导航栏1' },
        { 'subName': '子导航栏2' },
        { 'subName': '子导航栏3' },
        { 'subName': '子导航栏4' },
        { 'subName': '子导航栏5' },
        { 'subName': '子导航栏6' },
        { 'subName': '子导航栏7' },
        { 'subName': '子导航栏8' },
        { 'subName': '子导航栏9' }
      ]
    },
    {
      'navName': 'Fuck',
      'sub': [
        { 'subName': '子导航栏1' },
        { 'subName': '子导航栏2' },
        { 'subName': '子导航栏3' },
        { 'subName': '子导航栏4' },
        { 'subName': '子导航栏5' },
        { 'subName': '子导航栏6' },
        { 'subName': '子导航栏7' },
        { 'subName': '子导航栏8' },
        { 'subName': '子导航栏9' }
      ]
    },
    {
      'navName': 'Fuck',
      'sub': [
        { 'subName': '子导航栏1' },
        { 'subName': '子导航栏2' },
        { 'subName': '子导航栏3' },
        { 'subName': '子导航栏4' },
        { 'subName': '子导航栏5' },
        { 'subName': '子导航栏6' },
        { 'subName': '子导航栏7' },
        { 'subName': '子导航栏8' },
        { 'subName': '子导航栏9' }
      ]
    },
    {
      'navName': 'Fuck',
      'sub': [
        { 'subName': '子导航栏1' },
        { 'subName': '子导航栏2' },
        { 'subName': '子导航栏3' },
        { 'subName': '子导航栏4' },
        { 'subName': '子导航栏5' },
        { 'subName': '子导航栏6' },
        { 'subName': '子导航栏7' },
        { 'subName': '子导航栏8' },
        { 'subName': '子导航栏9' }
      ]
    },
    {
      'navName': 'Fuck',
      'sub': [
        { 'subName': '子导航栏1' },
        { 'subName': '子导航栏2' },
        { 'subName': '子导航栏3' },
        { 'subName': '子导航栏4' },
        { 'subName': '子导航栏5' },
        { 'subName': '子导航栏6' },
        { 'subName': '子导航栏7' },
        { 'subName': '子导航栏8' },
        { 'subName': '子导航栏9' }
      ]
    },
  ];

  sha() {
    return this.gTabs;
  }

  gTabsHooks: TabsHooks = {
    // 切换时
    switch: (tar) => {
      // 如果切换的目标标签的 href 属性为 fuck 切换后不将其记录为来源标签
      if (tar.href === 'fuck') {
        return null;
      }
    },
    // 创建时
    create: (tar) => {
      // 如果要创建的标签 title 属性为 loli 阻止创建
      if (tar.title === 'loli') {
        return false;
      }

      // 如果要创建的标签 title 属性为 白又白 创建后不自动跳转过去
      if (tar.title === '白又白') {
        return null;
      }
    },
    // 关闭时
    close: (tar) => {
      // 如果要关闭的标签 title 属性为 耳朵 阻止关闭
      if (tar.title === '耳朵') {
        return false;
      }

      // 如果要创建的标签 title 属性为 竖起来 关闭后不自动跳转标签
      if (tar.title === '竖起来') {
        return null;
      }
    }
  };
  test: any;
  gSearchPanelHooks: SearchPanelHooks = {
    open: () => {
      var el = this.elementRef.nativeElement;

      this.test = (window.innerHeight - el.querySelector('.c-header').offsetHeight - el.querySelector('.c-tabBar').offsetHeight) * 0.5;
    },

    close: () => {
      this.test = 0;
    }
  };

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone,
    private loadingService: LoadingService,
    private navigationService: NavigationService,
    private reloadService: ReloadService,
    private logOutService: LogOutService,
    private eventQueue: EventQueue,
    private gTab: GTabServer,
    private q: Q
  ) {
    this.eventQueue.push(AdminUsers.detail({ "d_Token": localStorage.getItem('userToken') }), (res) => {
      this.userName = environment.user.Aname = res.result[0].detail.Aname;
      environment.user.Auid = res.result[0].detail.Auid;
      environment.user.Aulid = res.result[0].detail.Aulid;
      console.log('第一个回调函数执行了');
    });

    const test2 = (res) => console.log('第二个回调函数执行了');
    this.eventQueue.push([Advertise.list(), Advertise.list(), Advertise.list()], test2);

    const test3 = (res) => setTimeout(() => console.log('第0个回调函数执行了'), 1000);
    // const test3 = (res) => console.log('第0个回调函数执行了');

    this.q.queue = [test3, test3, test3];

    this.q.init();
  }

  ngAfterViewInit() {
    // this.loadingService.show.emit(null);
    // 实现子导航栏点击逻辑
    this.navigationService.hasSub.subscribe((result?: boolean) => {
      result === true ? this.isExtend = true : this.isExtend = false;
      if (result === true) {
        this.navMini = false;
      }
    });
  }

  ngOnInit() {
    this.gTab.init(this.gTabs);

    console.error(this.gTab, '是不是已经附上了');

    this.navigationService.resetHeight.subscribe((iscroll) => {
      iscroll.refresh();
    });

    // this.matchSearchRoute();
  }

  signOut() {
    this.logOutService.logOut.emit(null);
  }

  reloadPage() {

    this.url = this.router.url;

    this.reloadService.routerReload.emit(this.url);
  }

  private choseDom(dom: string): any {
    const selectedDom = this.elementRef.nativeElement.querySelector(dom);
    return selectedDom;
  }

  private match(tar, id) {
    let result;
    tar.forEach((v?: any) => {
      const identityMark = v.name.split('-');

      if (identityMark.length === 1 && identityMark[0] === id) {
        result = v;
      }
    });

    return result;
  }

  openSearchPanel() {
    alert('open');
  }
  closeSearchPanel() {
    alert('close');
  }
  isStop: any;
  matchSearchRoute() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((d: NavigationEnd) => {
      console.warn(d);
    });

    // this.router.events.filter(event => event instanceof NavigationStart).subscribe((d: NavigationStart) => {
    //   if (this.isStop) {
    //     this.isStop = false;
    //
    //     return;
    //   }
    //
    //   this.isStop = true;
    //
    //   const curPath = d.url,
    //     urlSegment = curPath.split('/'),
    //     excludeSegment = curPath.match(/\([\w:]+\)/);
    //
    //   let tar, isMatchedSearch: boolean;
    //
    //   tar = excludeSegment ? urlSegment[urlSegment.length - excludeSegment.length - 1] : urlSegment[urlSegment.length - 1];
    //
    //   // if (curPath.indexOf('//') !== -1) {
    //   //   tar = curPath.match(/\(\D+\/\//)[0];
    //   //
    //   //   tar = tar.substr(1, tar.length - 3);
    //   // } else if (curPath.indexOf('(') !== -1) {
    //   //   tar = curPath.substr(curPath.indexOf('(') + 1, curPath.indexOf(')') - curPath.indexOf('(') - 1);
    //   // } else {
    //   //   tar = curPath.split('/');
    //   //
    //   //   tar = tar[tar.length - 1];
    //   // }
    //   isMatchedSearch = this.activatedRoute.routeConfig.children.some(e => e.path.indexOf(tar + 'Search') !== -1);
    //   console.error(urlSegment, excludeSegment, this.activatedRoute.routeConfig.children, tar, isMatchedSearch, 233)
    //   this.router.navigate(
    //     [tar, { outlets: { search: isMatchedSearch ? `${tar}Search` : null } }],
    //     { relativeTo: this.activatedRoute }
    //   );
    // });
  }
}
