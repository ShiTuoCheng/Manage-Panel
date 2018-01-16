/*
  苏成闯
  List Demo 页
*/

import { Component, OnInit } from '@angular/core';
import { animate, trigger, state, style, transition, keyframes } from '@angular/animations';
import { Index } from '@app/index/index';
import { EventQueue } from '@framework/Utils/EventQueue';
import { environment } from 'environments/environment';
import Advertise from '@app/models/advertise';

import swal from 'sweetalert2';


@Component({
  selector: 'list-demo',
  templateUrl: './list.html',
  animations: [
  ]
})
export class ListDemoComponent implements OnInit {
  pageNum: any;
  totalPageNum: number;
  list: any;

  test: any;

  constructor(private parentIndex: Index, private eventQueue: EventQueue) { }

  ngOnInit() {

  }

  pageNumprocess = (num, fn) => {
    this.getList((d) => {
      this.fillList(d);

      fn();
    });
  }

  getList(callBack: Function, param?: any, param2?: any) {
    this.eventQueue.push(Advertise.serverList(), (d) => callBack(d));
  }

  fillList(d) {
    this.list = d.result[0].list;

    this.backMember(this.list, ['Layer', 'Alive']);

    this.totalPageNum = d.result[0].page.Pc;
  }

  backMember(tar, key) {
    tar.forEach((v) => {
      key.forEach((j) => {
        v[`_${j}_`] = v[j];
      });
    });
  }

  modify() {
    const res = [],
      delItem = [];

    this.list.forEach((v, i) => {
      if (v._selectAll_) {
        res.push(Advertise.del({
          Ssid: v.Ssid
        }));

        delItem.push(i);

        return;
      }

      if (v._Layer_ !== v.Layer) {

        res.push(Advertise.layer({
          d_Ssid: v.Ssid,
          Layer: v.Layer
        }));
      }

      if (v._Alive_ !== v.Alive) {
        res.push(Advertise.alive({
          d_Ssid: v.Ssid
        }));
      }
    });

    this.eventQueue.push(res, () => {
      swal({
        title: '可爱',
        text: '想太阳',
        type: 'success'
      });

      delListItem();
    });


    const delListItem = () => {
      delItem.forEach(v => {
        this.list.splice(v, 1);
      });
    }
  }

  selectAll(tar) {
    if (!tar)
      return;

    return tar.some(el => !el._selectAll_);
  }

  clickSelectAll(tar, val) {
    tar.forEach(v => v._selectAll_ = val)
  }
}
