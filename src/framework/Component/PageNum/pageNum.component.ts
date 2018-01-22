/*
  苏成闯
  2017/12/07

  组件-分页

  @class  // 应用于组件的 最终被赋予到 ngClass 指令上 所以传参类型遵照 ngClass 表达式
  @total // 总页数
  @process // 分页函数 每次操作页码调用分页函数 分页函数主要写接口请求逻辑等
  @num  // 可以显示出的页码数量

  &build() // 构建函数 主要用于计算页码分布格式等
*/
import {
  Component, EventEmitter, SimpleChanges,
  Input, Output,
  OnInit, OnChanges,
} from '@angular/core';
declare var layer: any;

@Component({
  selector: 'g-page-num',
  templateUrl: './pageNum.component.html',
  styleUrls: ['./pageNum.component.less']
})
export class PageNumComponent implements OnInit, OnChanges {
  @Input() class: object; // Class 类
  @Input() total: number; // 总页数
  @Input() process: Function; // 分页处理函数
  @Input() num = 3; // 页码显示数量

  main: number[] = []; // 遍历页码 DOM 用的
  isRun: boolean | string; // 有个输入属性叫 current(当前页码) 告诉它的 set 函数在组件 ngOnInit 之后再生效

  _current: number; // current 设置为 set 所必须的一个实体
  tempCurrent: number; // 临时 current 组件 ngOnInit 之前如果传入了有效的 current 值 先保存到这里
  @Input() // current 属性的 set get
  set current(v: number) {
    if (!this.isRun) {
      this.tempCurrent = v;

      return;
    }

    if (v === this._current || !v || v > this.total) {
      return;
    }

    // 执行处理程序 进行翻页请求
    this.process(v, () => {
      // 以下是回调函数的内容
      this._current = v;

      this.currentChange.emit(this._current);

      if (!this.total) {

        return;
      }

      this.build(); // 构建页码
    });
  }
  get current() {
    return this._current;
  }
  @Output() currentChange = new EventEmitter();


  ngOnInit() {
    // current 的值在 Init 里取不到 可能是 Angular Bug 这里利用队列延后去取
    Promise.resolve().then(() => {
      setTimeout(() => {
        // 以下为主体代码
        this.isRun = true;

        // 传入了 current
        if (this.tempCurrent) {
          this.current = this.tempCurrent;

          return;
        }

        // current 传入了 0 (传 0 代表分页组件不自动执行 默认自动执行并用页码 1 去调用处理程序 请求第一页数据)
        if (this.current === 0 || this.tempCurrent === 0) {
          return;
        }

        this.current = 1; // 默认自动执行并用页码 1 去调用处理程序 请求第一页数据
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.hasOwnProperty('total')) {

      return;
    }

    const curVal = changes.total.currentValue; // 当前值

    // 以下情况退出
    if (!curVal || curVal === changes.total.previousValue) {
      return;
    }

    if (this.num > curVal) {
      this.num = curVal;
    }

    // 更新了总页数 且目前的页数超过了总页数的范围了 那么重定向当前页为最大页数(也就是总页数)
    if (this.current > curVal) {
      this.current = curVal;

      return;
    }

    this.build();

    this.isRun = 'run';
  }

  // 构建页码
  build() {
    this.main = [];

    const displayNum = this.num; // 缓存显示数量
      // 前 / 后页码预留算法对照值 算法: 预留一些 前 / 后 页码 保证当前页码处所有页码中居中状态
      // 如果显示页码( displayNum : num )为奇数 前 / 后预留相同数量页码 如果为偶数 优先预留 后 页码
    const sild = Math.ceil(displayNum / 2);
    let startNum = (this.current) - sild + 1; // 页码计数开始值

    // 如果超出页码预留算法结果超出页码范围 那么控制到正确范围内
    if (startNum < 1) {
      startNum = 1;
    } else if (this.current + sild > this.total) {
      startNum = displayNum % 2 ? this.total - (sild - 1) * 2 : this.total - ((sild) * 2 - 1);
    }

    for (let i = 0; i < displayNum; i++) {
      this.main.push(startNum + i);
    }
  }

  // 跳页
  jump() {
    layer.prompt({ title: '请输入要跳转到的页数' }, (pass, index) => {
      pass = +pass;

      if (pass < 1 || pass > this.total) {
        layer.msg(`请输入合法页数 总页数: ${this.total}`);

        return;
      }

      layer.close(index);

      this.current = +pass;
    });
  }
}
