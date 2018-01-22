import { Routes, RouterModule, NavigationEnd, NavigationStart } from '@angular/router';


import { Index } from './index';
import { CommHeaderComponent } from '@framework/Component/Header/header.component';
import { AuthService } from '@framework/Service/auth.service';

import { FormModule } from './formDemo/form.module';
import { ListModule } from './listDemo/list.module';


import { Injectable, NgZone } from '@angular/core';
import {
  Router, ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate, CanActivateChild,
} from '@angular/router';
let isStop = 0;
let prePath: string;
@Injectable()
export class CanTets implements CanActivateChild {
  constructor(private rt: Router, private activatedRoute: ActivatedRoute) {
    // this.rt.events.filter(event => event instanceof NavigationEnd).subscribe((d: NavigationEnd) => {
      // isStop = 0;
      // console.error(d, '嗯 库勒瓦 打某死');
    // });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (isStop) {
      isStop--;
      return true;
    }

    const tarPath = route.url[0].path,
      matchStr = `${tarPath}Search`;

    if (tarPath === prePath) {
      return false;
    }

    isStop = 1;

    prePath = tarPath;

    let routesConfig = Reflect.get(route.routeConfig, '_loadedConfig'),
      isMatch: boolean;

    if (routesConfig) {
      routesConfig = routesConfig.routes;

      isMatch = routesConfig.some(e => e.path.indexOf(matchStr) !== -1);

      isStop = isMatch ? 3 : 2;
    }

    this.rt.navigate([`index/${tarPath}`, { outlets: { search: isMatch ? matchStr : null } }]);

    return false;
  }
}

export const ROUTES: Routes = [
  {
    path: 'index',
    component: Index,
    canActivate: [AuthService],
    canActivateChild: [CanTets],
    canLoad: [AuthService],
    children: [
      { path: 'header', component: CommHeaderComponent },

      { path: 'formDemo', loadChildren: './formDemo/form.module#FormModule' },

      { path: 'listDemo', loadChildren: './listDemo/list.module#ListModule' },
    ]
  }
];
