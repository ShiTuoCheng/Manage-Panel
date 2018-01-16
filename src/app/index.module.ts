// Lib
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FrameworkModule } from './app/framework.module';

// Page
import { Index, GTabServer, Test } from './index';
import { ROUTES, CanTets } from './index.route';

import { FormModule } from './formDemo/form.module';
import { ListModule } from './listDemo/list.module';


@Injectable()
export class handtest {
  intercept(d, next) {
    var t = d.clone();

    t.body.

      console.warn(d)
    return next.handle(d.clone({ body: Object.assign(d.body, { validate_k: 1 }) }));
  }
}

@NgModule({
  declarations: [
    Index,
    Test
  ],
  imports: [
    RouterModule.forChild(ROUTES),

    FrameworkModule
  ],
  providers: [
    CanTets,
    GTabServer
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: handtest,
    //   multi: true,
    // },
  ],
  exports: [
    RouterModule
  ]
})
export class IndexModule { }
