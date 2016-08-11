import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";

@Component({
    selector: 'tables',
    templateUrl: 'app/product/index.html',
    styleUrls: ['app/product/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})


export class Product extends RestController implements OnInit {


    public rules: any = {};
    public viewOptions: any = {};
    public paramsTable:any={};

    
    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService) {
        super(http, toastr);
        this.setEndpoint("/consulta/variables.json");
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
        this.viewOptions["title"] = 'products';
        this.viewOptions["permissions"] = {"list": this.myglobal.existsPermission('1')};
        this.viewOptions["errors"] =[];
        this.viewOptions["errors"].push({"notFound": "no se encontraron resultados"});
        this.viewOptions["errors"].push({"list": "no tiene permisos"});
    }


    public params = {
        title: "Agregar Productos",
        idModal: "searchProductos",
        endpoint: "/consulta",
        //TODO: Cambiar  endpoint
    }
    initRules() {
        this.rules["code"] = {
            "update": true,
            "visible": true,
            'required':true,
            'icon':'fa fa-barcode',
            "type": "text",
            "key": "code",
            "title": "code",
            'msg':{
                'error':'El peso debe ser numerico',
            },
            "placeholder": "ingrese el codigo"
        };
        this.rules["description"] = {
            "update": true,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "textarea",
            "key": "description",
            "title": "descripcion",
            'msg':{
                'error':'El peso debe ser numerico',
            },
            "placeholder": "ingrese el descripcion"
        };
        this.rules["type"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "object": true,
            'permissions':'1',
            'paramsSearch': {
                'label':{'title':"Placa: ",'detail':"Empresa: "},
                'endpoint':"/tipo/productos",
                'where':'',
                'imageGuest':'/assets/img/truck-guest.png',
                'field':'vehicle.id',
            },
            "key": "type",
            "title": "tipo",
            'msg':{
                'error':'El peso debe ser numerico',
            },
            "placeholder": "ingrese el tipo"
        };
        this.rules["brand"] = {
            "update": true,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "object": true,
            'permissions':'1',
            'paramsSearch': {
                'label':{'title':"Placa: ",'detail':"Empresa: "},
                'endpoint':"modelos",
                'where':'',
                'imageGuest':'/assets/img/truck-guest.png',
                'field':'vehicle.id',
            },
            "key": "brand",
            "title": "marca",
            'msg':{
                'error':'El peso debe ser numerico',
            },
            "placeholder": "ingrese la marca"
        };
        this.rules["model"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "object": true,
            'permissions':'1',
            'paramsSearch': {
                'label':{'title':"Placa: ",'detail':"Empresa: "},
                'endpoint':"/search/marcas",
                'where':'',
                'imageGuest':'/assets/img/truck-guest.png',
                'field':'vehicle.id',
            },
            "key": "type",
            "title": "modelo",
            'msg':{
                'error':'El peso debe ser numerico',
            },
            "placeholder": "ingrese el modelo"
        };
    }
    ngOnInit()
    {
        let that = this;
        this.initLang();
        this.initOptions();
        this.initRules();
        this.initParamsTable();

        //this.loadData();
        let successCallback= response => {
            Object.assign(that.dataList,response.json())
        }
        this.httputils.doGet(this.endpoint,successCallback,this.error,true)
    }





}
