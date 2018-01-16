/*
  Scc
  模块 - 表单 Demo
*/

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrameworkModule } from '@app/app/framework.module';

import { FromDemoComponent } from './form';
import { formRouter } from './form.route';


@NgModule({
  declarations: [
    FromDemoComponent,
  ],
  imports: [
    RouterModule.forChild(formRouter),

    FrameworkModule
  ]
})
export class FormModule { }
