import {Component, OnInit,ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";
import {BasicConfiguration} from "../common/basic-configuration";
import { Router} from '@angular/router-deprecated';


declare var SystemJS:any;
@Component({
    selector: 'permissions',
    templateUrl: SystemJS.map.app+'/permissions/index.html',
    styleUrls: [SystemJS.map.app+'/permissions/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})


export class Permissions extends BasicConfiguration {


    public paramsTable:any = {};

    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService,public router:Router) {
        super("PE","/permissions/",http, toastr,myglobal,translate,router);
    }

    ngOnInit() {
        this.initRules();
        this.initOptions();
        this.initSearch();
        this.loadData();
        this.initParamsTable();
        this.initSaveRules();
    }



    initParamsTable() {
        this.paramsTable.title = this.viewOptions.title;
        this.paramsTable.endpoint = this.endpoint;
        this.paramsTable.actions = {};
        this.paramsTable.actions.delete = {
            "icon": "fa fa-trash",
            "exp": "",
            'title': 'Eliminar',
            'permission': this.permissions.delete,
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

        let tempRules = this.rules;
        this.rules={};



        this.rules["code"] = {
            "update": this.permissions['update'],
            "visible": true,
            "search": this.permissions.filter,
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
            "search": this.permissions.filter,
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
            "search": this.permissions.filter,
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
            "search": this.permissions.filter,
            'icon':'fa fa-list',
            "type": "text",
            "obligatoryVisible":true,
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
            "search": this.permissions.filter,
            'icon':'fa fa-barcode',
            "type": "text",
            "obligatoryVisible":true,
            "key": "accion",
            "title": "Accion",
            "placeholder": "ingrese la accion",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            },
        };

        this.rules['detail'] = tempRules['detail'];
        this.rules['enabled'] = tempRules['enabled'];

    }


    externalRules() {}

    initSearch() {}

    initSaveRules(){

        this.paramsSave= {
            title: "Agregar Permisos",
            idModal: "saveDefault",
            endpoint: this.endpoint,
        }
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave['enabled'];
        delete this.rulesSave['id'];

    }

}