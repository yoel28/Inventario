import {Component,ViewChild, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {Save} from "../utils/save/save";
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";

@Component({
    selector: 'location_product',
    templateUrl: 'app/location/index.html',
    styleUrls: ['app/location/style.css'],
    pipes: [TranslatePipe],
    directives: [Tables,Save]
})


export class Location_product extends RestController implements OnInit {

    public rules: any = {};
    public viewOptions: any = {};
    public paramsTable:any={};
    public paramsSave :any ={};
    public rulesSave :any={};
    public paramsSearch :any={};
    public rulesSearch :any={};
    public externalSave :any={};

    
    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService) {
        super(http, toastr);
        this.setEndpoint("/ubicaciones/");
    }



    initLang(){
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
        };
        this.paramsTable.actions.print = {
            "icon": "fa fa-print",
            "exp": "",
            'title': 'Imprimir',
            'permission': '1',
            'message': 'wii imprimir',
            'keyAction':'description'
        };

    }


    initOptions() {
        this.viewOptions["title"] = 'Ubicacion';
        this.viewOptions["permissions"] = {"list": true};/*TODO PERMISO REAL this.myglobal.existsPermission('10')}*/
        this.viewOptions["errors"] ={};
        this.viewOptions["errors"].notFound= "no se encontraron resultados";
        this.viewOptions["errors"].list="no tiene permisos para ver los productos";
    }


    initRules()
    {
        //TODO hacer que los update se realcionen con los permisos
        //todo las claves unicas
        //rules de la clase
        let update =true; /*this.myglobal.existsPermission("1");*/
        this.rules["code"] = {
            "update": update,
            "visible": true,
            'required':true,
            'maxLength':5,
            'icon':'fa fa-barcode',
            "type": "text",
            "key": "code",
            "title": "Codigo de ubicaion",
            "placeholder": "ingrese la ubicacion",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'maxlength':'Maximo numero de caracteres 5'
                },
            },

        };

        this.rules["title"] = {
            "update": update,
            "visible": true,
            'required':true,
            'icon':'fa fa-barcode',
            "type": "text",
            "key": "title",
            "title": "Titulo de ubicacion",
            "placeholder": "ingrese el titulo de ubicacion",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            },

        };

        this.rules["columna"] = {
            "update": update,
            "visible": true,
            'required':true,
            'maxLength':5,
            'icon':'fa fa-barcode',
            "type": "text",
            "key": "columna",
            "title": "Columna",
            "placeholder": "ingrese columna",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'maxlength':'Maximo numero de caracteres 5'
                },
            },

        };

        this.rules["fila"] = {
            "update": update,
            "visible": true,
            'required':true,
            'maxLength':5,
            'icon':'fa fa-barcode',
            "type": "text",
            "key": "fila",
            "title": "Fila",
            "placeholder": "ingrese la fila",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'maxlength':'Maximo numero de caracteres 5'
                },
            },

        };


        this.rules["id"] = {
            "update": false,
            "visible": false,
            'required': true,
            'icon': 'fa fa-barcode',
            "type": "text",
            "key": "fila",
            "title": "Fila",
            'msg': {
                'errors': {
                    'required': 'El campo es obligatorio'
                },
            },

        };


    }

    initOptionsView()
    {
        this.viewOptions["title"] = "Ubicacion";
        this.viewOptions["permissions"] = {"list": this.myglobal.existsPermission('1')};
        this.viewOptions["errors"] = {"notFound": "no se encontraron resultados"};
        this.viewOptions["errors"] = {"list": "no tiene permisos"};
    }



    initSave() {
        //TODO agregar los permisos
        this.paramsSave= {
            title: "Agregar Productos",
            idModal: "searchProductos",
            endpoint: this.endpoint,
        }


        this.rulesSave["code"] = {
            'required':true,
            'maxLength':5,
            'icon':'fa fa-barcode',
            "type": "text",
            "key": "code",
            "title": "Codigo ",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'maxlength':'Maximo numero de caracteres 5'
                },
            },
            "placeholder": "ingrese el codigo"
        };
        this.rulesSave["title"] = {
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "title",
            "title": "Titulo",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
            "placeholder": "ingrese el titulo"
        };

        this.rulesSave["columna"] = {
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "columna",
            "title": "Columna",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
            "placeholder": "ingrese la columna"
        };

        
        this.rulesSave["fila"] = {
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "detail",
            "title": "fila",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
            "placeholder": "ingrese la fila"
        };
    }

    ngOnInit()
    {

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