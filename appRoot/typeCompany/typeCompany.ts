import {Component,Injectable, OnInit,ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";
import {BasicConfiguration} from "../common/basic-configuration";
import { Router} from '@angular/router-deprecated';

declare var SystemJS:any;
@Component({
    selector: 'type-company',
    templateUrl: SystemJS.map.app+'/typeProduct/index.html',
    styleUrls: [SystemJS.map.app+'/typeProduct/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class TypeCompany extends BasicConfiguration implements OnInit {


    public paramsTable:any={};


    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService,public router:Router) {

        super("TIP_COM","/type/company/",http, toastr,myglobal,translate,router);

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
            "title": "Codigo",
            "placeholder": "ingrese el codigo",
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
            "title": "Nombre",
            "placeholder": "ingrese el Nombre",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

        this.rules['detail'] = tempRules['detail'];
        this.rules['enabled'] = tempRules['enabled'];

    }

    initRuleObject(){
        this.ruleObject={
            'icon':'fa fa-list',
            "type": "text",
            "key": "companyTypes",
            "title": "Tipo Cliente",
            'object':true,
            "placeholder": "Ingrese el tipo de cliente",
            'paramsSearch':this.paramsSearch,
            'permissions':this.permissions,
            'search':this.permissions.filter,
            'msg':{
                'errors':{
                    'object':'El tipo no esta registrado',
                    'required':'El campo es obligatorio'
                },
            }


        }
    }

    externalRules() {

        this.initRules();
        this.initSearch();
        this.initRuleObject();
        this.initSaveRules();

    }

    initOptions() {
        this.viewOptions["title"] = 'Tipo de Compañia';

        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });
    }

    initSearch() {
        this.paramsSearch['title']="Tipo de Compañia";
        this.paramsSearch['idModal']="searchTypeCompany";
        this.paramsSearch['placeholder']="Ingrese la compañia";
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
            'message': '¿ Esta seguro de eliminar el tipo de compañia: ',
            'keyAction':'companies'
        };
    }

    initSaveRules(){

        this.paramsSave= {
            title: "Agregar de tipo de compañia",
            idModal: "saveProductType",
            endpoint: this.endpoint,
        }

        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave['enabled'];
        delete this.rulesSave['id'];

    }




    ngOnInit() {

        this.initRules();
        this.initSaveRules();
        this.initOptions();
        this.initSearch();
        this.initParamsTable();
        this.loadData();

    }
}