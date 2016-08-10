import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'tables',
    templateUrl: 'app/product/index.html',
    styleUrls: ['app/product/style.css'],
    directives: [Tables],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})


export class Product extends RestController implements OnInit {


    public rules: any = {};
    public viewOptions: any = {};
    public paramsTable:any={};

    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService) {
        super(http, toastr);
        this.setEndpoint("/consulta/variables.json");
    }
    initLang(){
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
    }
    initParamsTable(){
        this.paramsTable.endpoint=this.endpoint;
        this.paramsTable.actions=[];
        this.paramsTable.actions.delete={"icon":"fa fa-trash","exp":""};
        this.paramsTable.actions.print={"icon":"fa fa-print","exp":""};

    }
    initOptions() {
        this.viewOptions["title"] = 'products';
        this.viewOptions["permissions"] = {"list": this.myglobal.existsPermission('1')};
        this.viewOptions["errors"] = {"notFound": "no se encontraron resultados"};
        this.viewOptions["errors"] = {"list": "no tiene permisos"};
    }
    initRules() {
        this.rules["code"]={"update":true,"visible":true,"type":"text","key":"code","title":"code","placeholder":"ingrese el codigo"};
        this.rules["description"]={"update":true,"visible":false,"type":"textarea","key":"description","title":"descripcion","placeholder":"ingrese el descripcion"};
        this.rules["type"]={"update":false,"visible":true,"type":"text","object":true,"key":"type","title":"tipo","placeholder":"ingrese el tipo"};
        this.rules["brand"]={"update":true,"visible":true,"type":"text","object":true,"key":"brand","title":"marca","placeholder":"ingrese la marca"};
        this.rules["model"]={"update":true,"visible":true,"type":"text","object":true,"key":"model","title":"modelo","placeholder":"ingrese el modelo"};
    }
    ngOnInit()
    {
        let that = this;
        this.initLang();
        this.initOptions();
        this.initRules();
        this.initParamsTable();

        //this.loadData();
        let successCallback= response => {
            Object.assign(that.dataList,response.json())
        }
        this.httputils.doGet(this.endpoint,successCallback,this.error,true)
    }





}
