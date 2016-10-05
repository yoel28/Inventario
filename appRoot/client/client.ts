import {Component,Injectable, OnInit,ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";
import {BasicConfiguration} from "../common/basic-configuration";
import {TypeCompany} from "../typeCompany/typeCompany";
declare var SystemJS:any;
@Component({
    selector: 'client',
    templateUrl: SystemJS.map.app+'/client/index.html',
    styleUrls: [SystemJS.map.app+'/client/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService,TypeCompany]
})
@Injectable()
export class Client extends BasicConfiguration implements OnInit {


    public paramsTable:any={};
    public externalList:any={};




    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService, public typeCompany:TypeCompany) {
        super("CI","/clientes/",http, toastr,myglobal,translate);


        this.typeCompany.externalRules();
    }



    initRules() {

        let tempRules = this.rules;
        this.rules={};

        this.rules["code"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'search':this.permissions.filter,
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
        this.rules["direccion"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'search':this.permissions.filter,
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
        this.rules["title"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'search':this.permissions.filter,
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
        this.rules["ruc"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'search':this.permissions.filter,
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
        this.rules["webPage"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':false,
            'search':this.permissions.filter,
            'icon':'fa fa-list',
            "type": "text",
            "key": "webPage",
            "title": "Webpage",
            "placeholder": "ingrese la direccion web",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["email"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':false,
            'icon':'fa fa-list',
            'search':this.permissions.filter,
            "type": "text",
            "key": "email",
            "title": "Email",
            "placeholder": "ingrese el email",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };



        this.rules["companyTypes"] = this.typeCompany.ruleObject;
        this.rules["companyTypes"].visible =true;
        this.rules["companyTypes"].type="array";
        this.rules["companyTypes"].buttonTitle="Mostrar tipos";


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
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave['enabled'];
        delete this.rulesSave['id'];
        delete this.rulesSave['companyTypes'];
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



        let that = this;
        let successCallback= response => {
            let key =that.typeCompany.ruleObject.key;
            that.externalList[key]={};
            that.externalList[key] = response.json();
            if(that.tables)
                that.tables.externalList=that.externalList;

        }
        this.httputils.doGet("/search"+this.typeCompany.endpoint,successCallback,this.error);


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
            'search':this.permissions.filter,
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