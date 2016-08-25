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
            'message': 'Esta seguro de eliminar la ubicacion con el codigo',
            'keyAction':'code'
        };
        this.paramsTable.actions.print = {
            "icon": "fa fa-print",
            "exp": "",
            'title': 'Imprimir',
            'permission': '1',
            'element':''
        };

    }


    initOptions() {
        this.viewOptions["title"] = 'Ubicacion';
        this.viewOptions["permissions"] = {"list": true};/*TODO PERMISO REAL this.myglobal.existsPermission('10')}*/
        this.viewOptions["errors"] ={};
        this.viewOptions["errors"].notFound= "no se encontraron resultados";
        this.viewOptions["errors"].list="no tiene permisos para ver los productos";
        this.viewOptions["button"]=[];
        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });
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
            "title": "Código",
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
            "title": "Titulo",
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
        this.rules["maximo"] = {
            "update": update,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "number",
            "key": "maximo",
            "title": "Maximo",
            "placeholder": "Maximo",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
        };
        this.rules["minimo"] = {
            "update": update,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "number",
            "key": "minimo",
            "title": "Minimo",
            "placeholder": "Minimo",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
        };


        this.rules["id"] = {
            "update": false,
            "visible": false,
            'required': true,
            'icon': 'fa fa-barcode',
            "type": "text",
            "key": "id",
            "title": "Id",
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
        this.rulesSave = this.rules;
        delete this.rulesSave['id'];
    }

    ngOnInit()
    {

        this.initLang();
        this.initRules();
        this.initSave();
        this.initOptions();
        this.initParamsTable();
        this.initSearch();
    
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
    initSearch()
    {

        this.paramsSearch= {
            'permissions':'1',
            'title': "Ubicación",
            'idModal': "searchLocation",
            'endpointForm': "/search/ubicaciones/",
            'placeholderForm': "Ingrese la ubicacion",
            'labelForm': {name: "Nombre: ", detail: "Detalle: "},
            'msg': {
                'errors': {
                    'noAuthorized': 'No posee permisos para esta accion',
                },
            },
            'where':'',
            'imageGuest':'/assets/img/truck-guest.png'
        };
    }
    
    
    

}