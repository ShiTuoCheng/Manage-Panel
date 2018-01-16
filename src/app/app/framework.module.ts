/*
  Scc & Stc
  模块 - 框架
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// 组件
import { CommHeaderComponent } from '@framework/Component/Header/header.component';
import { TimeComponent } from '@framework/Component/Timer/time.component';
import { FormSelectorComponent, ValuePipe } from '@framework/Component/FormSelector/selector.component';
import { PageNumModule } from '@framework/Component/PageNum/pageNum.module';
import { SelectorMiniComponent } from '@framework/Component/FormSelector/selectorB.component';
import {
  NavigationComponent,
  NavigationService,
  NavigationPipe
} from '@framework/Component/Navigation/navigation.component';
import {
  LoadingComponent,
  LoadingService
} from '@framework/Component/Loading/loading.component';
import { TabsComponent } from '@framework/Component/Tabs/tabs.component';
import { UploadImgComponent } from '@framework/Component/UploadImg/uploadImg.component';
import { EditorComponent } from '@framework/Component/Editor/editor.component';
import { SearchPanelComponent } from '@framework/Component/SearchPanel/search.component';

// 指令
import { ScrollDirective } from '@framework/Directive/scroll.directive';

// 服务
import { AuthService } from '@framework/Service/auth.service';
import { TokenService } from '@framework/Service/token.service';
import { ReloadService, LogOutService } from '@framework/Service/control.service';
import { EventQueue } from '@framework/Utils/EventQueue';
import { DebugService } from '@framework/Service/debug.service';
import { Q } from '@framework/Utils/Q';


@NgModule({
  declarations: [
    CommHeaderComponent,
    TimeComponent,
    LoadingComponent,
    NavigationComponent, NavigationPipe,
    TabsComponent,
    FormSelectorComponent,
    ScrollDirective,
    ValuePipe,
    UploadImgComponent,
    EditorComponent,
    ScrollDirective,
    SelectorMiniComponent,
    SearchPanelComponent,
  ],
  imports: [
    PageNumModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    LoadingService,
    NavigationService,
    AuthService,
    ReloadService,
    LogOutService,
    TokenService,
    EventQueue,
    LogOutService,
    DebugService,
    Q
  ],
  exports: [
    PageNumModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    CommHeaderComponent,
    TimeComponent,
    LoadingComponent,
    NavigationComponent, NavigationPipe,
    TabsComponent,
    FormSelectorComponent,
    ScrollDirective,
    ValuePipe,
    UploadImgComponent,
    EditorComponent,
    ScrollDirective,
    SelectorMiniComponent,
    SearchPanelComponent,
  ]
})
export class FrameworkModule { }
