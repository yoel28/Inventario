import {Component,Injectable, OnInit,ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../../common/globalService";
import {Tables} from "../../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../../utils/save/save";
import {BasicConfiguration} from "../../common/basic-configuration";

@Component({
    selector: 'params',
    templateUrl: 'app/configurations/params/index.html',
    styleUrls: ['app/configurations/params/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class Params extends BasicConfiguration implements OnInit {



    public paramsTable:any={};


    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
        super("PAR","/params/",http, toastr,myglobal,translate);


    }


    initRules() {

        let tempRules = this.rules;
        this.rules={};

        this.rules["key"] = {
            "update": this.permissions["update"],
            "visible": true,
            'required':true,
            "search":true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "key",
            "title": "Titulo",
            "placeholder": "ingrese la clave",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

        this.rules["value"] = {
            "update": this.permissions["update"],
            "visible": true,
            'required':true,
            "search":true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "value",
            "title": "Valor",
            "placeholder": "ingrese el valor",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

        this.rules['detail'] = tempRules['detail'];

        this.rules["type"] = {
            "update": this.permissions["update"],
            "visible": true,
            'required':true,
            "search":true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "type",
            "title": "Tipo",
            "placeholder": "ingrese el tipo",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };



        this.rules['enabled'] = tempRules['enabled'];


    }

    initParamsTable(){
        this.paramsTable.endpoint=this.endpoint;
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            "icon": "fa fa-trash",
            "exp": "",
            'title': 'Eliminar',
            'permission': '1',
            'message': '¿ Esta seguro de eliminar este parametro : ',
            'keyAction':'key'
        };
    }

    initSaveRules(){

        this.paramsSave= {
            title: "Agregar Parametros",
            idModal: "saveProductBrand",
            endpoint: this.endpoint,
        }

        this.rulesSave = {
            'key': {
                'type': this.rules['key'].type,
                'required':true,
                'title': this.rules['key'].title,
                'placeholder': this.rules['key'].placeholder,
                'msg':this.rules['key'].msg
            },
            'value': {
                'type': this.rules['value'].type,
                'required':true,
                'title': this.rules['value'].title,
                'placeholder': this.rules['value'].placeholder,
                'msg':this.rules['value'].msg
            },
            'detail': {
                'type': this.rules['detail'].type,
                'required':true,
                'title': this.rules['detail'].title,
                'placeholder': this.rules['detail'].placeholder,
                'msg':this.rules['detail'].msg
            },
            'type': {
                'type': this.rules['type'].type,
                'required':true,
                'title': this.rules['type'].title,
                'placeholder': this.rules['type'].placeholder,
                'msg':this.rules['type'].msg
            }
        };

    }

    initOptions() {
        this.viewOptions["title"] = 'Parametros';

        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });
    }

    initSearch() {

        this.paramsSearch['title']="Parametros";
        this.paramsSearch['idModal']="searchParamtros";
        this.paramsSearch['placeholder']="Ingrese el parametros";
    }


    ngOnInit() {

        this.initRules();
        this.initParamsTable();
        this.initSaveRules();
        this.initOptions();
        this.initSearch();
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
            "placeholder": "Ingrese el parametros",
            'paramsSearch':this.paramsSearch,
            'permissions':this.permissions,
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