import {Component, OnInit,ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";

@Component({
    selector: 'permissions',
    templateUrl: 'app/permissions/index.html',
    styleUrls: ['app/permissions/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})


export class Permissions extends RestController implements OnInit {


    public rules:any = {};
    public viewOptions:any = {};
    public paramsTable:any = {};
    public paramsSave:any = {};
    public rulesSave:any = {};
    public paramsSearch:any ={};
    public permissions:any ={};

    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
        super(http, toastr);
        this.setEndpoint("/permissions/");
    }
    ngOnInit() {
        this.initLang();
        this.initPermissions();
        this.initRules();


        this.initSave();
        this.initOptions();
        this.initParamsTable();

        this.initSearch();
        this.loadData();


    }
    initLang() {
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
    }

    initPermissions(){
        this.permissions['list']=this.myglobal.existsPermission('PE_LIST');
        this.permissions['add']=this.myglobal.existsPermission('PE_ADD');
        this.permissions['update']=this.myglobal.existsPermission('PE_UPDATE');
        this.permissions['delete']=this.myglobal.existsPermission('PE_DELETE');
        this.permissions['filter']=this.myglobal.existsPermission('PE_FILTER');
        this.permissions['lock']=this.myglobal.existsPermission('PE_LOCK');
    }
    initParamsTable() {
        this.paramsTable.endpoint = this.endpoint;
        this.paramsTable.actions = {};
        this.paramsTable.actions.delete = {
            "icon": "fa fa-trash",
            "exp": "",
            'title': 'Eliminar',
            'permission': '1',
            'message': 'Esta seguro de eliminar',
            'keyAction': 'title'
        };

    }



    initOptions() {
        this.viewOptions["title"] = 'Permisos';
        this.viewOptions["errors"] ={};
        this.viewOptions["errors"].title= "ADVERTENCIA";
        this.viewOptions["errors"].notFound= "no se encontraron resultados";
        this.viewOptions["errors"].list="no tiene permisos para ver los productos";
        this.viewOptions["button"]=[];
        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });
    }



    initRules() {
        this.rules["code"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "code",
            "title": "Código",
            "placeholder": "Ingrese el código",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["module"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "module",
            "title": "Modulo",
            "placeholder": "Ingrese el modulo",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["title"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "title",
            "title": "Titulo",
            "placeholder": "Ingrese el titulo",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            }
        };
        this.rules["detail"] = {
            "update": this.permissions['update'],
            "visible": true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "detail",
            "title": "Detalle",
            "placeholder": "ingrese detalle de permiso",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            }
        };
        this.rules["controlador"] = {
            "update": this.permissions['update'],
            "visible": true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "controlador",
            "title": "Controlador",
            "placeholder": "ingrese el controlador",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
        };
        this.rules["accion"] = {
            "update": this.permissions['update'],
            "visible": true,
            'icon':'fa fa-barcode',
            "type": "text",
            "key": "accion",
            "title": "Accion",
            "placeholder": "ingrese la accion",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            },
        };




    }



    initSave() {
        //TODO agregar los permisos

        this.paramsSave= {
            title: "Agregar Permisos",
            idModal: "savePermissions",
            endpoint: this.endpoint,
        }
        this.rulesSave = this.rules;


    }


    initSearch() {

        this.paramsSearch= {

            //TODO apregar el permiso
            'permissions':'1',
            'title': "Permisos",
            'idModal': "searchPermissions",
            'endpoint': "/search/permissions",
            'placeholder': "Ingrese el permiso",
            'label': {name: "Nombre: ", detail: "Detalle: "},
            'msg': {
                'errors': {
                    'noAuthorized': 'No posee permisos para esta accion',
                },
            }
        };
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