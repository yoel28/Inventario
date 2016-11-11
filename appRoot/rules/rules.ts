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
    selector: 'rules',
    templateUrl: SystemJS.map.app+'/rules/index.html',
    styleUrls: [SystemJS.map.app+'/rules/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class Rules extends BasicConfiguration implements OnInit {


    public paramsTable:any = {};


    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService,public router:Router) {
        super("RULE", "/rules/", http, toastr, myglobal, translate,router);
    }

    initRules() {

        let tempRules = this.rules;
        this.rules={};

        this.rules['rule']={
            'type':'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key':'rule',
            'icon': 'fa fa-key',
            'title':'Regla',
            'placeholder':'Regla',
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
        };
        this.rules['name']={
            'type':'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key':'name',
            'icon': 'fa fa-list',
            'title':'Nombre',
            'placeholder':'Nombre',
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
        };

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
            'message': 'Esta seguro de eliminar la regla ',
            'keyAction':'rule'
        }

    }

    initSaveRules() {
        this.paramsSave= {
            title: "Agregar regla",
            idModal: "saveRegla",
            endpoint: this.endpoint,
        }
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave['enabled'];
        delete this.rulesSave['id'];
    }

    initOptions() {

        this.viewOptions["title"] = 'Reglas';

        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });


    }

    initSearch() {

        this.paramsSearch['title']="Reglas";
        this.paramsSearch['idModal']="searchRules";
        this.paramsSearch['placeholder']="Ingrese la regla";

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
            "key": "rule",
            "title": "Regla",
            'object':true,
            "placeholder": "Ingrese el titulo de la regla",
            'paramsSearch':this.paramsSearch,
            'permissions':this.permissions,
            'search':this.permissions.filter,
            'msg':{
                'errors':{
                    'object':'La regla no esta registrado',
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

        this.dataList.count++;
    }



}


