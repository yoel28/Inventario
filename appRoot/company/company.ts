import {Component,Injectable, OnInit,ViewChild} from "@angular/core";
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
    selector: 'company',
    templateUrl: SystemJS.map.app+'/company/index.html',
    styleUrls: [SystemJS.map.app+'/company/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class Company extends BasicConfiguration implements OnInit {


    public paramsTable:any={};

    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService,public router:Router) {
        super("ACCOUNT","/accounts/",http, toastr,myglobal,translate,router);
    }

    initRules() {
        let tempRules = this.rules;
        this.rules={};


        this.rules["nombre"] = {
            "update": this.permissions["update"],
            "visible": true,
            'required':true,
            "search":this.permissions.filter,
            'icon':'fa fa-list',
            "type": 'text',
            "key": "nombre",
            "title": "Nombre",
            "placeholder": "ingrese el nombre",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["ruc"] = {
            "update": this.permissions["update"],
            "visible": true,
            'required':true,
            "search":this.permissions.filter,
            'icon':'fa fa-list',
            "type": 'text',
            "key": "ruc",
            "title": "RUC",
            "placeholder": "ingrese el RUC",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["direccion"] = {
            "update": this.permissions["update"],
            "visible": true,
            'required':true,
            "search":this.permissions.filter,
            'icon':'fa fa-list',
            "type": 'text',
            "key": "direccion",
            "title": "Dirección",
            "placeholder": "ingrese la dirección",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["url"] = {
            "update": this.permissions["update"],
            "visible": true,
            "search":this.permissions.filter,
            'icon':'fa fa-list',
            "type": 'text',
            "key": "url",
            "title": "URL",
            "placeholder": "ingrese la URL",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["telefono"] = {
            "update": this.permissions["update"],
            "visible": true,
            "required":true,
            "search":this.permissions.filter,
            'icon':'fa fa-list',
            "type": 'text',
            "key": "telefono",
            "title": "Telefono",
            "placeholder": "ingrese el telefono",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["email"] = {
            "update": this.permissions["update"],
            "visible": true,
            "required": true,
            "search":this.permissions.filter,
            'icon':'fa fa-list',
            "type": 'email',
            "key": "email",
            "title": "Correo electronico",
            "placeholder": "ingrese el correo electronico",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["administrador"] = {
            "update": this.permissions["update"],
            "visible": true,
            "required": true,
            "search":this.permissions.filter,
            'icon':'fa fa-list',
            "type": 'text',
            "key": "administrador",
            "title": "Administrador",
            "placeholder": "ingrese el mensaje del administrador",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["usuarios"] = {
            "update": this.permissions["update"],
            "visible": true,
            "required": true,
            "search":this.permissions.filter,
            'icon':'fa fa-list',
            "type": 'number',
            "step":"0",
            "key": "usuarios",
            "title": "Numero de usuarios",
            "placeholder": "ingrese el numero de usuarios",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["logo"] = {
            "update": this.permissions["update"],
            "visible": true,
            "search":this.permissions.filter,
            'icon':'fa fa-list',
            "type": 'image',
            "key": "logo",
            "title": "Logo",
            "placeholder": "ingrese el logo",
            'msg':{
                'errors':{
                },
            }
        };
        this.rules["miniLogo"] = {
            "update": this.permissions["update"],
            "visible": true,
            "search":this.permissions.filter,
            'icon':'fa fa-list',
            "type": 'image',
            "key": "miniLogo",
            "title": "Mini logo",
            "placeholder": "ingrese el mini logo",
            'msg':{
                'errors':{
                },
            }
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
            'message': '¿ Esta seguro de eliminar la compañia: ',
            'keyAction':'nombre'
        };
    }

    initSaveRules(){

        this.paramsSave= {
            title: "Agregar compañia",
            idModal: "saveCompany",
            endpoint: this.endpoint,
        }
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave['enabled'];
        delete this.rulesSave['id'];
        delete this.rulesSave['logo'];
        delete this.rulesSave['miniLogo'];

    }

    initOptions() {
        this.viewOptions["title"] = 'Compañias';

        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });
    }

    initSearch() {
        this.paramsSearch['title']="Compañias";
        this.paramsSearch['idModal']="searchCompany";
        this.paramsSearch['placeholder']="Ingrese la compañia";
        this.paramsSearch.label.title = "Nombre: ";
        this.paramsSearch.label.detail = "RUC: ";
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
            'display':{
                'keys':[
                    {'key':'accountName'},
                    {'key':'accountRUC','pre':'(','post':') '},
                ],
            },
            "key": "account",
            "title": "Compañia",
            'object':true,
            "placeholder": "Ingrese la compañia",
            'paramsSearch':this.paramsSearch,
            'permissions':this.permissions,
            'search':this.permissions.filter,
            'msg':{
                'errors':{
                    'object':'La compañia no esta registrada',
                    'required':'El campo es obligatorio'
                },
            }
        }
    }

}