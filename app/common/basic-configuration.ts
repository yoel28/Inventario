import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../common/globalService";
import {TranslateService} from "ng2-translate/ng2-translate";
import {RestController} from "./restController";

export abstract class  BasicConfiguration extends RestController{

    public permissions:any={};
    private prefix="";

    public viewOptions:any={};
    public rules:any = {};
    public paramsSearch :any={};
    public paramsSave:any={};
    public rulesSave:any = {};
    public ruleObject:any={};
    
    
    constructor(prefix,endpoint,public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
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
    
    
    private initConfiguration() {
        
        this.rules["detail"] = {
            "update": this.permissions['update'],
            "visible": true,
            'icon':'fa fa-list',
            "search":true,
            "type": "textarea",
            "key": "detail",
            "title": "detalle",
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
        
    }

    private initConfigurationViewOption() {
        this.viewOptions["title"] = 'Default title';
        this.viewOptions["errors"] ={};
        this.viewOptions["button"] =[];
        this.viewOptions["errors"].notFound= "no se encontraron resultados";
        this.viewOptions["errors"].list="no tiene permisos para ver los productos";
    }

    private initPermissions(prefix){
        this.prefix=prefix;
        this.permissions['list']=this.myglobal.existsPermission(this.prefix+'_LIST');
        this.permissions['add']=this.myglobal.existsPermission(this.prefix+'_ADD');
        this.permissions['update']=this.myglobal.existsPermission(this.prefix+'_UPDATE');
        this.permissions['delete']=this.myglobal.existsPermission(this.prefix+'_DELETE');
        this.permissions['filter']=this.myglobal.existsPermission(this.prefix+'_FILTER');
        this.permissions['lock']=this.myglobal.existsPermission(this.prefix+'_LOCK');
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
            'imageGuest':'/assets/img/truck-guest.png'
        };
    }
    
    private initConfigurationSave() {

        this.paramsSave= {
            title: "Agregar Default",
            idModal: "saveDefault",
            endpoint: this.endpoint,
        }
        this.rulesSave = this.rules;


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
            'msg':{
                'errors':{
                    'object':'la referencia no esta registrada',
                    'required':'El campo es obligatorio'
                },
            }
        }
    }

    initLang() {
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
    }


    
   
}