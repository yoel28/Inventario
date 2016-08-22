import {Component} from '@angular/core';
import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';
import {Xfile} from "../common/xeditable";
import {globalService} from "../common/globalService";
import {ToastsManager} from "ng2-toastr/ng2-toastr";

@Component({
    selector: 'demo-app',
    templateUrl: 'app/upload/index.html',
    styleUrls: ['app/upload/style.css'],
    directives: [UPLOAD_DIRECTIVES],
})
export class DemoApp {
    uploadFile: any;
    options: Object = {
        //url: 'http://192.168.0.96:8080/api/upload/auditoria?access_token='+localStorage.getItem('bearer'),
       // withCredentials: true,
       // authToken: localStorage.getItem('bearer'),
       // authTokenPrefix: "Bearer" // required only if different than "Bearer"

    };


     constructor(public _formBuilder:FormBuilder, public http:Http, public toastr:ToastsManager, public myglobal:globalService) {
        super(http, toastr);
        //this.options.url=this.endpoint+'/upload/auditoria?access_token='+Storage.getItem('bearer');

        }


    handleUpload(data): void {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
        }
    }
}