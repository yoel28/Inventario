import {Component, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/common";
import {RestController} from "../../common/restController";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../../common/globalService";


@Component({
    selector: 'less-list',
    templateUrl: 'app/utils/lessList/index.html',
    styleUrls: ['app/utils/lessList/style.css'],
    inputs: ['paramSearch', 'externalEndPoint', 'rulesDetalis']
})


export class LessList extends RestController implements OnInit {


    public params:any = {};
    public rules:any = {};
    public paramSearch:any = {};
    public externalEndPoint = "";
    public detailsSearh:any = {};
    public rulesDetalis:any = {};


    constructor(public _formBuilder:FormBuilder, public http:Http, public toastr:ToastsManager, public myglobal:globalService) {
        super(http, toastr);
    }

    ngOnInit() {
        this.setEndpoint(this.paramSearch.endpoint);
        this.loadData();
    }

    searchDetalles(data) {
        if (this.detailsSearh['id']) {
            this.detailsSearh = {}
        }
        else {
            let that = this;
            let successCallback = response => {
                Object.assign(that.detailsSearh, response.json());
            }
            this.httputils.doGet(this.externalEndPoint + "/" + data.id, successCallback, this.error)
        }
    }

    getKeys() {
        let data = [];
        let that = this;
        Object.keys(this.rulesDetalis).forEach((key)=> {
            data.push(key)
        });
        return data;
    }
}