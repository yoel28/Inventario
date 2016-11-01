import {Component, OnInit,ViewChild,Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";
import {BasicConfiguration} from "../common/basic-configuration";
declare var SystemJS:any;
@Component({
    selector: 'roles',
    templateUrl: SystemJS.map.app+'/roles/index.html',
    styleUrls: [SystemJS.map.app+'/roles/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class Roles extends BasicConfiguration implements OnInit {


    public paramsTable:any = {};


    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
        super("RO", "/roles/", http, toastr, myglobal, translate);

    }


    initRules() {

        let tempRules = this.rules;
        this.rules={};

        this.rules["authority"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'search':this.permissions.filter,
            'icon':'fa fa-list-ul',
            "type": "text",
            "key": "authority",
            "title": "Rol",
            "placeholder": "ingrese el rol",
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
            'message': 'Esta seguro de eliminar',
            'keyAction':'authority'
        }

    }

    initSaveRules() {
        this.paramsSave= {
            title: "Agregar rol",
            idModal: "saveRol",
            endpoint: this.endpoint,
        }
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave['enabled'];
        delete this.rulesSave['id'];
    }

    initOptions() {

        this.viewOptions["title"] = 'Marca de roles';

        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });


    }

    initSearch() {

        this.paramsSearch['title']="Roles";
        this.paramsSearch['idModal']="searchroles";
        this.paramsSearch['placeholder']="Ingrese el rol";

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
            "key": "roles",
            "title": "Roles",
            'object':true,
            "placeholder": "Ingrese el titulo del rol",
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


