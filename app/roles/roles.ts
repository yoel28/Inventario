import {Component, OnInit,ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";

@Component({
    selector: 'roles',
    templateUrl: 'app/roles/index.html',
    styleUrls: ['app/roles/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})

export class Roles extends RestController implements OnInit {


    public rules:any = {};
    public viewOptions:any = {};
    public paramsTable:any = {};
    public paramsSave:any = {};
    public rulesSave:any = {};
    public paramsSearch:any = {};
    public rulesSearch:any = {};


    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {

        super(http, toastr);
        this.setEndpoint("/roles/");

    }

    initLang() {
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
    }

    initParamsTable(){
        this.paramsTable.endpoint=this.endpoint;
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            "icon": "fa fa-trash",
            "exp": "",
            'title': 'Eliminar',
            'permission': '1',
            'message': 'Esta seguro de eliminar',
            'keyAction':'description'
        }

    }


    initOptions() {
        this.viewOptions["title"] = 'Roles';
        this.viewOptions["permissions"] = {"list": true};/*TODO PERMISO REAL this.myglobal.existsPermission('10')}*/
        this.viewOptions["errors"] ={};
        this.viewOptions["errors"].notFound= "no se encontraron resultados";
        this.viewOptions["errors"].list="no tiene permisos para ver los productos";
    }


    initRules() {


        //TODO hacer que los update se realcionen con los permisos
        //rules de la clase
        let update =true; /*this.myglobal.existsPermission("1");*/
        this.rules["authority"] = {
            "update": update,
            "visible": true,
            'required':true,
            'icon':'fa fa-list-ul',
            "type": "text",
            "key": "authority",
            "title": "Nombre de rol",
            "placeholder": "ingrese el rol",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },

        };
        this.rules["detail"] = {
            "update": update,
            "visible": true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "detail",
            "title": "Detalles",
            "placeholder": "ingrese detalles del rol",
            'msg':{
                'errors':{},
            }
        };
        /*
        this.rules["permissions"] = {
            "update": update,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "object": true,
            'permissions':'1',
            "key": "tipoProducto",
            "title": "Tipo Producto",
            "placeholder": "ingrese el tipo",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'object':'Tipo no esta registrado',
                },
            },
        };
        */

        this.rules["enabled"] = {
            "update": update,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            'permissions':'1',
            "key": "enabled",
            "title": "Habilitado",
            "placeholder": "",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            }
        };


    }


    initSave() {
        //TODO agregar los permisos
        //todo falta agregar los permisos
        this.paramsSave= {
            title: "Agregar rol",
            idModal: "saveRol",
            endpoint: this.endpoint,
        }


        this.rulesSave["authority"] = {
            'required':true,
            'icon':'fa fa-list-ul',
            "type": "text",
            "key": "authority",
            "title": "Nombre del rol",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
            "placeholder": "ingrese el nombre"
        };
        
        this.rulesSave["detail"] = {
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "detail",
            "title": "descripcion del rol",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
            "placeholder": "ingrese el nombre del producto"
        };

        /* PERMISOS
        
        this.rulesSave["tipoProducto"] = {
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "object": true,
            'permissions':'1',
            "key": "tipoProducto",
            "title": "Tipo Producto",
            "placeholder": "ingrese el tipo",
            'paramsSaveSearch': {
                'label':{'title':"Placa: ",'detail':"Empresa: "},
                'endpoint':"/search/tipo/productos/",
                'where':'',
                'imageGuest':'/assets/img/truck-guest.png'
            },
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'object':'Tipo no esta registrado',
                },
            },
        };*/



    }



    ngOnInit() {

//        let that = this;
        this.initLang();
        this.initOptions();
        this.initRules();
        this.initParamsTable();
        this.initSave();
     
        this.loadData();


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


