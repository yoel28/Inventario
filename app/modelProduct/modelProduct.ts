import {Component,Injectable, OnInit,ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";

@Component({
    selector: 'model-product',
    templateUrl: 'app/modelProduct/index.html',
    styleUrls: ['app/modelProduct/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class ModelProduct extends RestController implements OnInit {


    public rules: any = {};
    public ruleObject: any = {};
    public paramsTable:any={};
    public paramsSearch:any = {};
    public paramsSave :any ={};
    public rulesSave :any={};
    public viewOptions:any={};
    public permissions:any={};


    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
        super(http, toastr);
        this.setEndpoint("/modelos/");
    }


    initLang() {
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
    }

    initRules() {

        //TODO hacer que los update se realcionen con los permisos

        let update =this.myglobal.existsPermission("1");
        this.rules["title"] = {
            "update": update,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "title",
            "title": "Titulo",
            "placeholder": "ingrese el nombre del titulo",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["detail"] = {
            "update": update,
            "visible": true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "detail",
            "title": "detalle",
            "placeholder": "ingrese el detalle",
            'msg':{
                'errors':{
                },
            }
        };
    }

    initParamsTable(){
        this.paramsTable.endpoint=this.endpoint;
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            "icon": "fa fa-trash",
            "exp": "",
            'title': 'Eliminar',
            'permission': '1',
            'message': '¿ Esta seguro de eliminar el modelo de producto: ',
            'keyAction':'title'
        };
    }

    initSaveRules(){

        this.paramsSave= {
            title: "Agregar de modelo de producto",
            idModal: "saveProductType",
            endpoint: this.endpoint,
        }

        this.rulesSave = {
            'title': {
                'type': this.rules['title'].type,
                'required':true,
                'title': this.rules['title'].title,
                'placeholder': this.rules['title'].placeholder,
                'msg':this.rules['title'].msg
            },
            'detail': {
                'type': this.rules['detail'].type,
                'title': this.rules['detail'].title,
                'placeholder': this.rules['detail'].placeholder,
                'msg':this.rules['detail'].msg
            }
        };

    }

    initOptions() {
        this.viewOptions["title"] = 'Modelo de producto';
        this.viewOptions["permissions"] = {"list": true};/*TODO PERMISO REAL this.myglobal.existsPermission('10')}*/
        this.viewOptions["errors"] ={};
        this.viewOptions["errors"].notFound= "no se encontraron resultados";
        this.viewOptions["errors"].list="no tiene permisos para ver los tipo de productos";
        this.viewOptions["button"]=[];
        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });
    }

    initSearch() {

        this.paramsSearch= {
            'permissions':this.permissions['list'],
            'title': this.viewOptions["title"],
            'idModal': "searchProductModel",
            'endpoint': "/search/modelos",
            'placeholderForm': "Ingrese el modelo de producto",
            'label': {'title': "titulo: ", 'detail': "detalle: "},
            'msg': {
                'errors': {
                    'noAuthorized': 'No posee permisos para esta accion',
                },
            },
            'field':'modelo',
            'where':'',
            'imageGuest':'/assets/img/truck-guest.png'
        };
    }

    initPermissions()
    {
        this.permissions['list']= this.myglobal.existsPermission(1);
        this.permissions['udpate']= this.myglobal.existsPermission(1);
        this.permissions['delete']= this.myglobal.existsPermission(1);
    }
    
    ngOnInit() {
        this.initLang();
        this.initRules();
        this.initParamsTable();
        this.initSaveRules();
        this.initOptions();
        this.initSearch();
        this.loadData();
    }

    
    
    externalRules(){
        this.initRules();
        this.initParamsTable();
        this.initSaveRules();
        this.initSearch();
        this.initPermissions();
        this.initRuleObject();
    }
    initRuleObject(){
        this.ruleObject={
            'icon':'fa fa-list',
            "type": "text",
            "key": "modelo",
            "title": "Modelo",
            'object':true,
            "placeholder": "Ingrese el codigo del modelo",
            'paramsSaveSearch':this.paramsSearch,
            'msg':{
                'errors':{
                    'object':'El modelo no esta registrado',
                    'required':'El campo es obligatorio'
                },
            }
        }
    }
    
    @ViewChild(Tables)
    tables:Tables;
    asignData(data) {
        if(this.dataList.page && this.dataList.page.length>1)
        {
            this.dataList.list.pop();
        }
        this.dataList.list.unshift(data);

        if(this.tables )
        {
            Object.assign(this.tables.dataList,this.dataList);
        }
    }

}