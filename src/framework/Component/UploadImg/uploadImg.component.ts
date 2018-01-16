import js_UploadImg from '../../lib/js_UploadImg';
import WaterFall from '../../lib/WaterFall';
import LayerShow from '../../lib/LayerShow';
import { Component, OnInit } from '@angular/core';

@Component({

    selector: 'app-comm-upload-img',
    templateUrl: './uploadImg.component.html'
})

export class UploadImgComponent {

    public uliModel?: any;

    upload () {
        this.uploadHandler();
    }

    cancel () {
        this.uliModel = '';
    }

    private uploadHandler(): void {

        js_UploadImg.show({

            Upload_ajaxUrl: '',
            useLibrary: true,
            Library_ajaxUrl: '',
            LayerShow: LayerShow,
            WaterFall: WaterFall,
            callback_upload: function (fp) {
                this.uliModel = fp;
            }
        });
    }
}


