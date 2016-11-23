import {Component, OnInit,ViewChild,Injectable} from "@angular/core";
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
    selector: 'event',
    templateUrl: SystemJS.map.app+'/event/index.html',
    styleUrls: [SystemJS.map.app+'/event/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class Event extends BasicConfiguration implements OnInit {


    public paramsTable:any = {};


    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService,public router:Router) {
        super("EVENT", "/events/", http, toastr, myglobal, translate,router);
    }

    initRules() {

        let tempRules = this.rules;
        this.rules={};

        this.rules['code']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'code',
            'icon': 'fa fa-key',
            'title': 'Codigo',
            'placeholder': 'Ingrese el codigo',
            'msg':{
                'error':'Este campo es obligatorio',
            }
        }
        this.rules['actionType']={
            'type': 'select',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'source': [],
            'key': 'actionType',
            'title': 'Tipo de acción',
            'placeholder': 'Selecccione una opcion',
            'msg':{
                'error':'Este campo es obligatorio',
            }
        }
        this.rules['way']={
            'type': 'select',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'source': [],
            'key': 'way',
            'title': 'Canal',
            'placeholder': 'Selecccione una opcion',
            'msg':{
                'error':'Este campo es obligatorio',
            }
        }
        this.rules['over']={
            'type': 'select',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'source':[],
            'key': 'over',
            'title': 'Dominio',
            'placeholder': 'Seleccione un dominio',
            'msg':{
                'error':'Este campo es obligatorio',
            }
        }

        this.rules['message']={
            'type': 'textarea',
            'required':true,
            'showbuttons':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'message',
            'icon': 'fa fa-key',
            'title': 'Mensaje',
            'placeholder': 'Ingrese el mensaje',
            'msg':{
                'error':'Este campo es obligatorio',
            }
        }
        //this.rules['rule']=this._MRegla.ruleObject;
        //this.rules['rule'].required = true;
        this.rules['target']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'target',
            'icon': 'fa fa-key',
            'title': 'Objectivo',
            'placeholder': 'Ingrese el objetivo',
            'msg':{
                'error':'Este campo es obligatorio',
            }
        }
        this.rules['title']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'title',
            'icon': 'fa fa-key',
            'title': 'Titulo',
            'placeholder': 'Ingrese el titulo',
            'msg':{
                'error':'Este campo es obligatorio',
            }
        }
        this.rules['icon']={
            'type': 'text',
            'required':false,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'icon',
            'icon': 'fa fa-key',
            'title': 'Icono',
            'placeholder': 'Ingrese el icono',
            'msg':{
                'error':'Este campo es obligatorio',
            }
        }


        this.rules['detail'] = tempRules['detail'];
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
            'message': 'Esta seguro de eliminar la info  ',
            'keyAction':'code'
        }

    }

    initSaveRules() {
        this.paramsSave= {
            title: "Agregar información",
            idModal: "saveInfo",
            endpoint: this.endpoint,
        }
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave['enabled'];
        delete this.rulesSave['id'];
    }

    initOptions() {

        this.viewOptions["title"] = 'Información';

        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });


    }

    initSearch() {

        this.paramsSearch['title']="Información";
        this.paramsSearch['idModal']="searchInfo";
        this.paramsSearch['placeholder']="Ingrese el info";

    }

    ngOnInit() {

        this.initRules();
        this.initSaveRules();
        this.initOptions();
        this.initSearch();
        this.initParamsTable();
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
            "key": "info",
            "title": "Información",
            'object':true,
            "placeholder": "Ingrese el titulo del info",
            'paramsSearch':this.paramsSearch,
            'permissions':this.permissions,
            'search':this.permissions.filter,
            'msg':{
                'errors':{
                    'object':'el info no esta registrado',
                    'required':'El campo es obligatorio'
                },
            }
        }
    }
}


