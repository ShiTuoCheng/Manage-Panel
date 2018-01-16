import { Component, OnInit } from '@angular/core';
import { LoadingService, LoadingComponent } from '../Loading/loading.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { EventQueue } from '@framework/Utils/EventQueue';
import AdminUsers from '@app/models/adminUsers';
import Advertise from '@app/models/advertise';

class HeaderItem {

    private headerKey?: string;
    private headerItem?: string;
}

interface Header {

   readonly data: Array<HeaderItem>;
   readonly headerList: HeaderItem[];
}

@Component({

    selector: 'app-comm-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})

export class CommHeaderComponent implements OnInit {

    public headerList: HeaderItem[];
    public headerItem: Header;
    public headerTitle = '自助建站';

    constructor(private http: HttpClient, private Loadingservice: LoadingService, private eventQueue: EventQueue) {}

    ngOnInit() {
        // this.getHeaderList();

        const test2 = (res) => {

            console.log('第二个回调函数执行了');
        };

        const test3 = (res) => {

            console.log('第三个回调函数执行了');
        };

        const test4 = (res) => {

            console.log('第四个回调函数执行了');
        };

        for (let i = 0; i < 3; i++) {
            this.eventQueue.push(Advertise.list(), test2, environment.handlerAPI, 'post', );
        }

        // setTimeout(() => this.eventQueue.push(environment.handlerAPI, Advertise.list(), 'post', test2), 1000);
    }

    private getHeaderList(): void {
    }
}
