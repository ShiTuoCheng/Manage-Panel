import { Component, OnInit, Input } from '@angular/core';
import { Utilities } from '../../Utils/Utli';

@Component({

    selector: 'app-comm-timer',
    template: '{{currentTime}}',
    styles: ['div.timing {' +
            'color: #ffffff;' +
            'margin: 0 auto;' +
            'display: inline-block;}'
    ]
})

export class TimeComponent implements OnInit {

    public currentTime?: string;
    @Input() showWeek?: boolean;
    @Input() showSecond?: boolean;

    ngOnInit() {
        setInterval(() => this.timer(), 1000);
    }

    private timer(): void {

        let date = new Date();
        this.currentTime = `${date.getFullYear()}年${Utilities.formatNum(date.getMonth() + 1)}月${Utilities.formatNum(date.getDate())}日${this.showWeek ? ' 星期' + Utilities.formateData(date.getDay()) : ''}${Utilities.formatNum(date.getHours())}:${Utilities.formatNum(date.getMinutes())}${this.showSecond ? ':' + Utilities.formatNum(date.getSeconds()) : ''}`;
        date = null; // gc
    }
}
