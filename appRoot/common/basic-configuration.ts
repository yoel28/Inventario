import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../common/globalService";
import {TranslateService} from "ng2-translate/ng2-translate";
import {RestController} from "./restController";
import { Router} from '@angular/router-deprecated';

declare var Table2Excel:any;
export abstract class  BasicConfiguration extends RestController{

    public permissions:any={};
    public prefix="";
    public title:string="";

    public viewOptions:any={};
    public rules:any = {};
    public paramsSearch :any={};
    public paramsSave:any={};
    public rulesSave:any = {};
    public ruleObject:any={};
    
    
    constructor(prefix,endpoint,public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService,public router:Router) {
        super(http, toastr);
        
        this.setEndpoint(endpoint);
        this.initPermissions(prefix);
        this.initConfiguration();
        this.initConfigurationViewOption();
        this.initConfigurationSearch();
        this.initConfigurationSave();
        this.initConfigurationRuleObject();
        this.initLang();
        
    }


    abstract initOptions();
    abstract initRules();
    abstract initSearch();
    abstract initRuleObject();
    abstract externalRules();
    
    private initConfiguration() {
        
        this.rules["detail"] = {
            "update": this.permissions['update'],
            "visible": true,
            'icon':'fa fa-list',
            "search":this.permissions.filter,
            "type": "textarea",
            'showbuttons':true,
            "key": "detail",
            "title": "Detalle",
            "placeholder": "ingrese el detalle",
            'msg':{
                'errors':{
                },
            }
        };
        this.rules["enabled"] = {
            "update": (this.permissions['update'] && this.permissions['lock']),
            "visible": this.permissions['lock'],
            'required':true,
            'icon':'fa fa-list',
            "type": "boolean",
            'states':["Habilitado","Deshabilitado"],
            "key": "enabled",
            "title": "Habilitado",
            "placeholder": "",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            }
        };
        this.rules["id"] = {
            "update": false,
            "visible": this.permissions['audit'],
            'icon':'fa fa-list',
            "search":false,
            "type": "number",
            "key": "id",
            "title": "ID",
            "placeholder": "ID",
        };
        
    }

    private initConfigurationViewOption() {
        this.viewOptions["title"] = 'Default title';
        this.viewOptions["errors"] ={};
        this.viewOptions["button"] =[];
        this.viewOptions["errors"].notFound= "no se encontraron resultados";
        this.viewOptions["errors"].list="no tiene permisos para ver esta página";
    }

    private initPermissions(prefix){
        this.prefix=prefix;
        this.permissions['list']=this.myglobal.existsPermission(this.prefix+'_LIST');
        this.permissions['add']=this.myglobal.existsPermission(this.prefix+'_ADD');
        this.permissions['update']=this.myglobal.existsPermission(this.prefix+'_UPDATE');
        this.permissions['delete']=this.myglobal.existsPermission(this.prefix+'_DELETE');
        this.permissions['filter']=this.myglobal.existsPermission(this.prefix+'_FILTER');
        this.permissions['lock']=this.myglobal.existsPermission(this.prefix+'_LOCK');
        this.permissions['print']=this.myglobal.existsPermission(this.prefix+'_PRINT');
        this.permissions['visible']=true; //this.myglobal.existsPermission(this.prefix+'_VISIBLE');
        this.permissions['audit']=this.myglobal.existsPermission(this.prefix+'_AUD');
        this.permissions['search']=this.myglobal.existsPermission(this.prefix+'_SEARCH');
    }



    private initConfigurationSearch() {

        this.paramsSearch= {

            'title': this.viewOptions["title"],
            'idModal': "searchDefault",
            'endpoint': "/search"+this.endpoint,
            'placeholder': "Placeholder default",
            'label': {'title': "titulo: ", 'detail': "detalle: "},
            'msg': {
                'errors': {
                    'noAuthorized': 'No posee permisos para esta accion',
                },
            },
            'where':'',
            'imageGuest':'/assets/img/image-guest.png'
        };
    }
    
    private initConfigurationSave() {

        this.paramsSave= {
            'title': 'Agregar Default',
            'idModal': 'saveDefault',
            'endpoint': this.endpoint,
            'updateField':false,
        }
    }


    private initConfigurationRuleObject(){
        this.ruleObject={
            'icon':'fa fa-list',
            "type": "text",
            "key": "keyDefault",
            "title": "TipoDefault",
            'object':true,
            "placeholder": "PlaceHolder default",
            'paramsSearch':this.paramsSearch,
            'permissions':this.permissions,
            'search':this.permissions.filter,
            'msg':{
                'errors':{
                    'object':'la referencia no esta registrada',
                    'required':'El campo es obligatorio'
                },
            }
        }
    }

    exportCSV(){
        let table2excel = new Table2Excel({
            'defaultFileName': this.title,
        });
        Table2Excel.extend((cell, cellText) => {
            if (cell) return {
                v:cellText,
                t: 's',
            };
            return null;
        });
        table2excel.export(document.querySelectorAll("table.export"));
    }
    onPrint(id?){
        var printContents = document.getElementById("reporte").innerHTML;
        var popupWin = window.open('', '_blank');
        popupWin.document.open();
        popupWin.document.write('<body onload="window.print()">' + printContents + '</body>');
        popupWin.document.head.innerHTML = (document.head.innerHTML);
        popupWin.document.close();
    }
    

    initLang() {
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
    }
    getObjectKeys(data){
        return Object.keys(data);
    }
    goOperation(event){
        if(event)
            event.preventDefault();
        let link = ['Operation', {}];
        this.router.navigate(link);
    }
}