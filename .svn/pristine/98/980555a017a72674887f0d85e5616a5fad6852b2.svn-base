/*
  Scc
  模块 - 列表 Demo
*/

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrameworkModule } from '@app/app/framework.module';

import { ListDemoComponent } from './list';
import { listRouter } from './list.route';
import { ListSearch } from './search';

import { PageNumModule } from '@framework/Component/PageNum/pageNum.module';


@NgModule({
  declarations: [
    ListDemoComponent,
    ListSearch
  ],
  imports: [
    RouterModule.forChild(listRouter),

    FrameworkModule
  ]
})
export class ListModule { }
