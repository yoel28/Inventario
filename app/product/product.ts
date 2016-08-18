import {Component, OnInit,ViewChild,ReflectiveInjector,Inject} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";
import {TypeProduct} from "../typeProduct/typeProduct";
import {BrandProduct} from "../brandProduct/brand";
import {ModelProduct} from "../modelProduct/modelProduct";

@Component({
    selector: 'products',
    templateUrl: 'app/product/index.html',
    styleUrls: ['app/product/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService,TypeProduct,BrandProduct,ModelProduct]
})


export class Product extends RestController implements OnInit {


    public rules: any = {};
    public viewOptions: any = {};
    public paramsTable:any={};
    public paramsSave :any ={};
    public rulesSave :any={};
    public paramsSearch :any={};
    public rulesSearch :any={};
    public externalSave :any={};

    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService,  @Inject(TypeProduct) public typesProduct,@Inject(BrandProduct) public brandProduct, @Inject(ModelProduct) public modelProduct) {
        
        super(http, toastr);
        this.setEndpoint("/productos/");

        //Search para los objetos en el momento de hacer un Save
        typesProduct.externalRules();
        brandProduct.externalRules();
        modelProduct.externalRules();


    
    }

    initLang(){
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
    }

    initExternalSave() {

        this.externalSave["tipoProducto"] = {"paramsSave":this.typesProduct.paramsSave,"rulesSave":this.typesProduct.rulesSave}
        this.externalSave["marca"] = {"paramsSave":this.brandProduct.paramsSave,"rulesSave":this.brandProduct.rulesSave}
        this.externalSave["modelo"] = {"paramsSave":this.modelProduct.paramsSave,"rulesSave":this.modelProduct.rulesSave}

    }

    initExternalRulesSearch() {

        this.rulesSearch["tipoProductoTitle"] = this.typesProduct.paramsSearch;
        this.rulesSearch["marcaTitle"] = this.brandProduct.paramsSearch;
        this.rulesSearch["modeloTitle"] = this.modelProduct.paramsSearch;

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
            "placeholder": "ingrese el codigo",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'maxlength':'Maximo numero de caracteres 5'
                },
            },

        };
        this.rules["detail"] = {
            "update": update,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "detail",
            "title": "Nombre Producto",
            "placeholder": "ingrese el nombre del producto",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            }
        };

        this.rules["tipoProductoTitle"] = this.typesProduct.rules['title'];
        this.rules["tipoProductoTitle"].object=true;
        this.rules["tipoProductoTitle"].key="tipoProducto";
        this.rules["tipoProductoTitle"].permissions=this.typesProduct.permissions['list'];;
        this.rules["modeloTitle"] = this.modelProduct.rules['title'];
        this.rules["modeloTitle"].key="modelo";
        this.rules["modeloTitle"].object=true;
        this.rules["modeloTitle"].permissions=this.modelProduct.permissions['list'];
        this.rules["marcaTitle"] = this.brandProduct.rules['title'];
        this.rules["marcaTitle"].object=true;
        this.rules["marcaTitle"].key="marca";
        this.rules["marcaTitle"].permissions=this.brandProduct.permissions['list'];


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

    initSaveRules() {
        //TODO agregar los permisos
        this.paramsSave= {
                        title: "Agregar Productos",
                        idModal: "searchProductos",
                        endpoint: this.endpoint,
                         }


        this.rulesSave["code"] = {
            'required':true,
            'maxLength':this.rules["code"].maxLength,
            'icon':this.rules["code"].icon,
            "type": this.rules["code"].type,
            "key": this.rules["code"].key,
            "title": this.rules["code"].title,
            'msg':this.rules["code"].msg,
            "placeholder": this.rules["code"].placeholder
        };
        
        
        this.rulesSave["detail"] = {
            'required':true,
            'icon':  this.rules["detail"].icon,
            "type":  this.rules["detail"].type,
            "key":   this.rules["detail"].detail,
            "title": this.rules["detail"].title,
            'msg':   this.rules["detail"].msg ,
            "placeholder": this.rules["detail"].placeholder
        };
        this.rulesSave["tipoProducto"] = {
            'required':true,
            'icon':        this.rules['tipoProductoTitle'].icon,
            "type":        this.rules['tipoProductoTitle'].type,
            "object": true,
            'permissions':'1',
            "key": "tipoProducto",
            "title":       this.rules['tipoProductoTitle'].title,
            "placeholder": this.rules['tipoProductoTitle'].placeholder,
            'paramsSaveSearch': this.typesProduct.paramsSearch,
            'msg':this.rules['tipoProductoTitle'].msg,
         };


        this.rulesSave["marca"] = {
            'required':         true,
            'icon':             this.rules['marcaTitle'].icon,
            "type":             this.rules['marcaTitle'].type,
            "object":           true,
            'permissions':'1',
            "key": "marca",
            "title":            this.rules['marcaTitle'].title,
            "placeholder":      this.rules['marcaTitle'].placeholder,
            'paramsSaveSearch': this.brandProduct.paramsSearch,
            'msg':              this.rules['marcaTitle'].msg,

        };


        this.rulesSave["modelo"] = {
            'required':true,
            'icon':    this.rules['modeloTitle'].icon,
            "type":    this.rules['modeloTitle'].type,
            "object": true,
            'permissions':'1',
            "key": "modelo",
            "title": this.rules['modeloTitle'].title,
            "placeholder": this.rules['modeloTitle'].placeholder,
            'paramsSaveSearch': this.modelProduct.paramsSearch,
            'msg':this.rules['modeloTitle'].msg,
        };

    }

    initOptions() {
        this.viewOptions["title"] = 'Productos';
        this.viewOptions["permissions"] = {"list": true};/*TODO PERMISO REAL this.myglobal.existsPermission('10')}*/
        this.viewOptions["errors"] ={};
        this.viewOptions["errors"].notFound= "no se encontraron resultados";
        this.viewOptions["errors"].list="no tiene permisos para ver los productos";
        this.viewOptions["button"]=[];
        this.viewOptions["button"].push({
            'title':'Agegar producto',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });

    }

    initSearch() {

        this.paramsSearch= {

            //TODO apregar el permiso
            'permissions':'1',
            'title': this.viewOptions["title"],
            'idModal': "searchProductos",
            'endpointForm': "/search/productos",
            'placeholderForm': "Ingrese el producto",
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


    ngOnInit() {

        this.initLang();
        this.initExternalSave();
        this.initExternalRulesSearch();
        this.initRules();
        this.initParamsTable();
        this.initSaveRules();
        this.initOptions();
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



}
