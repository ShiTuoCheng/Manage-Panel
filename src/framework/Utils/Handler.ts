import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from '../Component/Loading/loading.component';
import { environment } from '../../environments/environment';
import PromptLayer from '@framework/lib/PromptLayer';
import { Utilities } from '@framework/Utils/Utli';

export interface DataType {
    [propName: string]: any;
}

abstract class HttpHandler {

    abstract post (url: string, template: string): any;

    abstract get (url: string): any;
}

@Injectable()
export class Handler implements OnInit {

    private httpTemplate?: string;
    private httpUrl: string;
    private data: any;
    public promise;
    // public hasData = new EventEmitter<any>();


    constructor(
        private http?: HttpClient,
        private loadingService?: LoadingService,
        private router?: Router
    ) {}

    ngOnInit() {
    }
}
