import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { animate, trigger, state, style, transition, keyframes } from '@angular/animations';
import { Index } from 'app/index/index';

export class Tabs {
  title: string;
  href: string;
  multiple?: boolean;
  original?: Tabs;
}
export class TabsHooks {
  switch?(tar: Tabs): false | null | void;
  create?(tar: Tabs): false | null | void;
  close?(tar: Tabs): false | null | void;
}

@Component({
  selector: 'g-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less'],
  animations: [
    trigger('test', [
      transition('* => void', [
        animate(500),
      ])
    ]),
  ]
})
export class TabsComponent implements OnInit {
  public list: Array<Tabs> = [{
    title: 'Fuck',
    href: 'fuck'
  }, {
    title: 'Shit',
    href: 'shit'
  }];

  @Input() run;
  @Input() hooks: TabsHooks;

  matchID = 'href'; // 标签身份根据
  current: Tabs; // 当前标签
  previous: Tabs; // 来源标签(上一个) 比如说新建标签页会跳转到新标签 那么起跳那个标签就相当于来源标签 新标签关闭后默认跳转来源标签

  gSearchPanel: any;

  constructor(private parentIndex: Index) { }

  ngOnInit() {
    this.gSearchPanel = this.parentIndex.gSearchPanel;
  }

  // 设置为当前标签
  setCurrent(tar: Tabs, savePrevious = true) {
    let hookRes = this.hooks.switch(tar);

    if (hookRes === false) {
      return;
    }

    // 是否存贮来源标签 以供关闭标签页跳回到上一个来源标签
    if (savePrevious || hookRes !== null) {
      this.previous = this.current;
    }

    this.current = tar;

    // 跳路由
  }

  // 是否为当前标签
  isCurrent(tar: Tabs) {
    return this.current === tar;
  }

  // 创建标签
  create(obj: Tabs) {
    let tar: Tabs = this.list.find(v => v[this.matchID] === obj[this.matchID]); // 根据标签数据匹配现有标签看是否存在

    // 如标签存在
    if (tar) {
      // 标签可以允许多开
      if (tar.multiple) {
        obj.multiple = true;

        tar = obj;
      } else if (this.current === tar) {
        return;
      }
    } else {
      tar = obj;
    }

    var hookRes = this.hooks.create(tar);

    if (hookRes === false) {
      return;
    }

    this.list.push(tar);

    if (hookRes === null) {
      return;
    }

    this.setCurrent(tar);
  }

  // 关闭标签
  close(tar: string | number | object) {
    let list: Tabs[] = this.list, // 缓存上
      identity: string = typeof tar === 'object' ? '' : this.matchID, // 标签身份认证
      previous: Tabs = this.previous, // 前一个标签
      currentIndex: number, // 当前标签的下标
      follow: Tabs; // 后续跟进跳转进的标签

    // 匹配
    list.forEach((v, i) => {
      if (v[identity] === tar) {
        tar = i;
      }

      if (v === this.current) {
        currentIndex = i;
      }
    });

    let hookRes = this.hooks.close(currentIndex ? list[currentIndex] : list[<number>tar]);

    if ((tar === void (0) && !currentIndex) || hookRes === false) {
      return;
    }

    list.splice(<number>tar, 1); // 删除

    // 是否从当前标签关闭
    if (currentIndex !== tar || hookRes === null) {
      return;
    }

    // 是否有上一个被记录的起源标签
    if (previous) {
      follow = previous;
    } else if (currentIndex === list.length) { // 当前标签是否为末尾标签
      follow = list[list.length - 1];
    } else {
      follow = list[<number>tar];
    }

    this.setCurrent(follow, false);

    this.previous = null;
  }

  // 关闭全部
  closeAll() {
    this.list.splice(1);

    this.setCurrent(this.list[0]);
  }

  // _self 跳转 不打开新标签 而是在当前标签跳转
  self(data: Tabs, isBack = true, tar?: string | Tabs) {
    let tarIndex; // 目标下标

    // 如果指定目标去匹配 否则默认当前标签为目标
    if (tar) {
      tar = this.list.find(v => v.href === tar); // 匹配目标

      // 如果没匹配到 退出
      if (!tar) {
        return;
      }
    } else {
      tar = this.current;
    }

    // 是否可以返回
    if (isBack) {
      (<Tabs>tar).original = Object.assign({}, tar);
    }

    Object.assign(tar, data);

    // 跳路由 tar.
  }

  // 返回原始标签
  back(tar = this.current) {
    Object.assign(tar, tar.original);

    // 跳路由 tar.
  }

  test(ev) {
    if (ev.fromState === 'void') {
      ev.element.style = "animation-name: flipInX; animation-duration: .5s";
    }

    if (ev.toState === 'void') {
      ev.element.style = "animation-name: flipOutX; animation-duration: .5s";
    }
  }
}
