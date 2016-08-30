import {Component, OnInit,ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";
import {BasicConfiguration} from "../common/basic-configuration";

@Component({
    selector: 'permissions',
    templateUrl: 'app/permissions/index.html',
    styleUrls: ['app/permissions/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})


export class Permissions extends BasicConfiguration {


    public paramsTable:any = {};

    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
        super("PE","/permissions/",http, toastr,myglobal,translate);
    }

    ngOnInit() {
        this.initRules();
        this.initOptions();
        this.initSearch();
        this.loadData();


        this.initParamsTable();
    }



    initParamsTable() {
        this.paramsTable.endpoint = this.endpoint;
        this.paramsTable.actions = {};
        this.paramsTable.actions.delete = {
            "icon": "fa fa-trash",
            "exp": "",
            'title': 'Eliminar',
            'permission': this.permissions['delete'],
            'message': 'Esta seguro de eliminar',
            'keyAction': 'title'
        };
    }



    initOptions() {
        this.viewOptions["title"] = 'Permisos';
        
        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });
    }


    initRuleObject()
    {
        
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


    externalRules()
    {
        
    }



    initSearch() {

        

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