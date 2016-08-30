import {Component,Injectable, OnInit,ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";
import {BasicConfiguration} from "../common/basic-configuration";

@Component({
    selector: 'client',
    templateUrl: 'app/typeProduct/index.html',
    styleUrls: ['app/typeProduct/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class Client extends BasicConfiguration implements OnInit {


    public ruleObject: any = {};
    public paramsTable:any={};
    public paramsSearch:any = {};
    public paramsSave :any ={};
    public rulesSave :any={};


    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
        super("CI","/clientes/",http, toastr,myglobal,translate);

    }



    initRules() {

        let tempRules={};


        tempRules["code"] = {
            "update": this.permissions['update'],
            "visible": true,
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
        tempRules["direccion"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "direccion",
            "title": "Dirección",
            "placeholder": "Ingrese la dirección",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        tempRules["title"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "title",
            "title": "Empresa",
            "placeholder": "ingrese el nombre de la empresa",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        tempRules["ruc"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "ruc",
            "title": "Ruc",
            "placeholder": "ingrese el ruc",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        

        Object.assign(this.rules,tempRules,this.rules);

    }

    initParamsTable(){
        this.paramsTable.endpoint=this.endpoint;
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            "icon": "fa fa-trash",
            "exp": "",
            'title': 'Eliminar',
            'permission': '1',
            'message': '¿ Esta seguro de eliminar el cliente con el codigo: ',
            'keyAction':'code'
        };
    }

    initSaveRules(){

        this.paramsSave= {
            title: "Agregar cliente",
            idModal: "saveClient",
            endpoint: this.endpoint,
        }
        this.rulesSave = Object.create(this.rules);
        delete this.rulesSave['enabled'];
    }

    initOptions() {

        this.viewOptions["title"] = 'Clientes';

        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });
        
    }

    initSearch() {

        this.paramsSearch['title']="Clientes";
        this.paramsSearch['idModal']="searchClientes";
        this.paramsSearch['placeholder']="Ingrese el cliente";
        
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
            "key": "cliente",
            "title": "cliente",
            'object':true,
            "placeholder": "Ingrese el cliente",
            'paramsSearch':this.paramsSearch,
            'permissions':this.permissions,
            'msg':{
                'errors':{
                    'object':'El tipo no esta registrado',
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