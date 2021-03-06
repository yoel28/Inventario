import {Component,Injectable, OnInit} from "@angular/core";
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
    selector: 'accion-type',
    templateUrl: SystemJS.map.app+'/utils/viewBase/index.html',
    styleUrls: [SystemJS.map.app+'/utils/viewBase/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class AccionType extends BasicConfiguration implements OnInit {



    public paramsTable:any={};


    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService,public router:Router) {
        super("ACC_TYP","/tipo/acciones/",http, toastr,myglobal,translate,router);


    }


    initRules() {

        let tempRules = this.rules;
        this.rules={};

        this.rules["title"] = {
            "update": this.permissions["update"],
            "visible": true,
            'required':true,
            "search":this.permissions.filter,
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
        this.rules["cambio"] = {
            "update": this.permissions["update"],
            "visible": true,
            'required':true,
            "search":this.permissions.filter,
            'icon':'fa fa-list',
            "type": "text",
            "key": "cambio",
            "title": "Cambio",
            "placeholder": "ingrese el nombre del cambio",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

        this.rules['detail'] = tempRules['detail'];
        this.rules["visible"] = {
            "update": (this.permissions['update'] && this.permissions['lock']),
            "visible": this.permissions['lock'],
            'required':true,
            'icon':'fa fa-list',
            "type": "boolean",
            'states':["Visible","Invisible"],
            "key": "visible",
            "title": "Visible",
            "placeholder": "",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            }
        };
        this.rules['enabled'] = tempRules['enabled'];

    }

    initParamsTable(){
        this.paramsTable.title = this.viewOptions.title;
        this.paramsTable.endpoint=this.endpoint;
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            "icon": "fa fa-trash",
            "exp": "",
            'title': 'Eliminar',
            'permission': this.permissions.delete,
            'message': '¿ Esta seguro de eliminar la accion : ',
            'keyAction':'title'
        };
    }

    initSaveRules(){

        this.paramsSave= {
            title: "Agregar marca de producto",
            idModal: "saveProductBrand",
            endpoint: this.endpoint,
        }
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave['enabled'];
        delete this.rulesSave['visible'];
        delete this.rulesSave['id'];

    }

    initOptions() {
        this.viewOptions["title"] = 'Tipo de Acciones';

        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });
    }

    initSearch() {

        this.paramsSearch['title']="Tipo de accion";
        this.paramsSearch['idModal']="searchAccionType";
        this.paramsSearch['placeholder']="Ingrese el tipo de accion";
    }


    ngOnInit() {

        this.initRules();
        this.initSaveRules();
        this.initOptions();
        this.initSearch();
        this.initParamsTable();
        this.ext="&showAll=true";
        this.loadData();
    }


    externalRules(){
        this.initRules();
        this.initSearch();
        this.initRuleObject();
        this.initSaveRules();
    }


    initRuleObject(){
        this.ruleObject={
            'icon':'fa fa-list',
            "type": "text",
            "key": "accionTitle",
            "title": "Tipo de accion",
            'object':true,
            "placeholder": "Ingrese el tipo de accion",
            'paramsSearch':this.paramsSearch,
            'permissions':this.permissions,
            'search':this.permissions.filter,
            'msg':{
                'errors':{
                    'object':'La marca no esta registrado',
                    'required':'El campo es obligatorio'
                },
            }
        }
    }

}