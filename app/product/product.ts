import {Component, OnInit,ViewChild,ReflectiveInjector,Inject} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";
import {TypeProduct} from "../typeProduct/typeProduct";

@Component({
    selector: 'products',
    templateUrl: 'app/product/index.html',
    styleUrls: ['app/product/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService,TypeProduct]
})


export class Product extends RestController implements OnInit {


    public rules: any = {};
    public viewOptions: any = {};
    public paramsTable:any={};
    public paramsSave :any ={};
    public rulesSave :any={};
    public paramsSearch :any={};
    public injector:any={};


    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService,  @Inject(TypeProduct) public typesProduct) {
        
        super(http, toastr);
        this.setEndpoint("/productos/");
        typesProduct.initSearch();
        
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
        this.viewOptions["permissions"] = {"list": true};/*TODO PERMISO REAL this.myglobal.existsPermission('10')}*/
        this.viewOptions["errors"] ={};
        this.viewOptions["errors"].notFound= "no se encontraron resultados";
        this.viewOptions["errors"].list="no tiene permisos para ver los productos";
    }

    initRules() {


        //TODO hacer que los update se realcionen con los permisos
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
            "title": "Codigo producto",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'maxlength':'Maximo numero de caracteres 5'
                },
            },
            "placeholder": "ingrese el codigo"
        };
        this.rules["detail"] = {
            "update": update,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "detail",
            "title": "Nombre Producto",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
            "placeholder": "ingrese el nombre del producto"
        };
        this.rules["tipoProductoNombre"] = {
            "update": update,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "object": true,
            'permissions':'1',
            'paramsSearch':
            {
                title: "Tipo de empresa",
                idModal: "searchTipoEmpresa",
                endpointForm: "/search/type/companies/",
                placeholderForm: "Ingrese el tipo de empresa",
                labelForm: {name: "Nombre: ", detail: "Detalle: "}
            },
            "key": "tipoProductoNombre",
            "title": "Tipo Producto",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'object':'Tipo no esta registrado',
                },
            },
            "placeholder": "ingrese el tipo"
        };
        this.rules["marcaTitle"] = {
            "update": update,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "object": true,
            'permissions':'1',
            'paramsSearch':
            {
                title: "Tipo de empresa",
                idModal: "searchTipoEmpresa",
                endpointForm: "/search/type/companies/",
                placeholderForm: "Ingrese el tipo de empresa",
                labelForm: {name: "Nombre: ", detail: "Detalle: "}
            },
            "key": "marcaTitle",
            "title": "Marca de Producto",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'object':'Regla no esta registrada',
                },
            },
            "placeholder": "ingrese la marca"
        };
        this.rules["modeloTitle"] = {
            "update": update,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "object": true,
            'permissions':'1',
            'paramsSearch':
            {
                title: "Tipo de empresa",
                idModal: "searchTipoEmpresa",
                endpointForm: "/search/type/companies/",
                placeholderForm: "Ingrese el tipo de empresa",
                labelForm: {name: "Nombre: ", detail: "Detalle: "}
            },
            "key": "modeloTitle",
            "title": "Tipo modelo",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'object':'Modelo no esta registrado',
                },
            },
            "placeholder": "ingrese el modelo"
        };
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
            "title": "Codigo producto",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'maxlength':'Maximo numero de caracteres 5'
                },
            },
            "placeholder": "ingrese el codigo"
        };
        this.rulesSave["detail"] = {
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "detail",
            "title": "Nombre Producto",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
            "placeholder": "ingrese el nombre del producto"
        };
        
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
        };


        this.rulesSave["marca"] = {
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "object": true,
            'permissions':'1',
            "key": "marca",
            "title": "Marca",
            "placeholder": "ingrese la marca",
            'paramsSaveSearch': {
                'label':{'title':"Placa: ",'detail':"Empresa: "},
                'endpoint':"/search/marcas/",
                'where':'',
                'imageGuest':'/assets/img/truck-guest.png'
            },
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'object':'Tipo no esta registrado',
                },
            },
        };


        this.rulesSave["modelo"] = {
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "object": true,
            'permissions':'1',
            "key": "modelo",
            "title": "Modelo",
            "placeholder": "ingrese el modelo",
            'paramsSaveSearch': {
                'label':{'title':"Placa: ",'detail':"Empresa: "},
                'endpoint':"/search/modelos/",
                'where':'',
                'imageGuest':'/assets/img/truck-guest.png'
            },
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'object':'Tipo no esta registrado',
                },
            },
        };
    }

    initSearch() {

        this.paramsSearch= {

            //TODO apregar el permiso
            'permissions':'1',
            'title': "Productos",
            'idModal': "searchProductos",
            'endpointForm': "/search/productos",
            'placeholderForm': "Ingrese el producto",
            'labelForm': {name: "Nombre: ", detail: "Detalle: "},
            'msg': {
                'errors': {
                    'noAuthorized': 'No posee permisos para esta accion',
                },
            }
        };
    }


    
    ngOnInit()
    {
        let that = this;
        this.initLang();
        this.initOptions();
        this.initRules();
        this.initParamsTable();
        this.initSave();
        this.initSearch();
        this.loadData();


    }



    @ViewChild(Tables)
    tables:Tables;
    asignData(data)
    {
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
