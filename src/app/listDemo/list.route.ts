/*
  Scc
  路由 - 列表 Demo
*/

import { Routes } from '@angular/router';

import { ListDemoComponent } from './list';
import { CommHeaderComponent } from '@framework/Component/Header/header.component';
import { ListSearch } from './search';

import { Login } from '../login/login';


export const listRouter: Routes = [
  {
    path: '', component: ListDemoComponent
  },
  {
    path: 'listDemoSearch', component: ListSearch, outlet: 'search'
  },
  {
    path: 'listDemoSearchj', component: ListSearch, outlet: 'search'
  }
];
