import {Component,Injectable, OnInit,ViewChild} from "@angular/core";
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
    selector: 'lot-recovery',
    templateUrl: SystemJS.map.app+'/lotRecovery/index.html',
    styleUrls: [SystemJS.map.app+'/lotRecovery/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class LotRecovery extends BasicConfiguration implements OnInit {



    public paramsTable:any={};
    public paramsFilter:any = {
        title: "Filtrar Lotes",
        idModal: "modalFilter",
        endpoint: "",
    };


    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
        super("LOT_R","/lote/",http, toastr,myglobal,translate);


    }


    initRules() {

        this.rules ={};

        this.rules["clienteTitle"] = {
            "update": false,
            "visible": true,
            "search": this.permissions.filter,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "clienteTitle",
            "title": "Cliente",
            "placeholder": "ingrese el nombre del cliente",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["tipoAccionTitle"] = {
            "update": false,
            "visible": true,
            "search": this.permissions.filter,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "tipoAccionTitle",
            "title": "Accion",
            "placeholder": "ingrese de la accion",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["clienteRUC"] = {
            "update": false,
            "visible": true,
            'search':this.permissions.filter,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "clienteRUC",
            "title": "Cliente Ruc",
            "placeholder": "ingrese el Ruc del cliente",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["clienteDireccion"] = {
            "update": false,
            "visible": true,
            "search": this.permissions.filter,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "clienteDireccion",
            "title": "Direccion del cliente",
            "placeholder": "ingrese la direccion del cliente",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["clienteTelefono"] = {
            "update": false,
            "visible": true,
            "search": this.permissions.filter,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "clienteTelefono",
            "title": "Telefono del cliente",
            "placeholder": "ingrese el telefono del cliente",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["clienteEmail"] = {
            "update": false,
            "visible": true,
            "search": this.permissions.filter,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "clienteEmail",
            "title": "correo del cliente",
            "placeholder": "ingrese el email del cliente",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["dateCreated"] = {
            "update": false,
            "visible": true,
            "search": this.permissions.filter,
            'required':true,
            'icon':'fa fa-list',
            "type": "date",
            "format":"ll",
            "key": "dateCreated",
            "title": "Fecha",
            "placeholder": "ingrese la fecha",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

    }

    initParamsTable() {
        this.paramsTable.title = this.viewOptions.title;
        this.paramsTable.endpoint = this.endpoint;
        this.paramsTable.actions = {};
        this.paramsTable.actions.print = {
            "icon": "fa fa-print",
            "exp": "",
            'title': 'Imprimir Acta',
            'permission': this.permissions.print,
            'type': 'lotReco',
            'endPoint':'/lote/recovery/',
            'keyAction': 'description'
        };

    }

    initOptions() {
        this.viewOptions["title"] = 'Administracion de lotes';
    }

    initSearch() {

        this.paramsSearch['title']="Lotes";
        this.paramsSearch['idModal']="searchLot";
        this.paramsSearch['placeholder']="Ingrese el lote";
    }


    ngOnInit() {

        this.initRules();
        this.initOptions();
        this.initSearch();
        this.initParamsTable();
        this.loadData();
    }


    externalRules(){
        this.initRules();
        this.initSearch();
        this.initRuleObject();
    }


    initRuleObject(){
        this.ruleObject={
            'icon':'fa fa-list',
            "type": "text",
            "key": "marca",
            "title": "Marca",
            'object':true,
            "placeholder": "Ingrese el titulo de la marca",
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