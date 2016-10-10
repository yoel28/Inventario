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
import {BasicConfiguration} from "../common/basic-configuration";
declare var SystemJS:any;
@Component({
    selector: 'products',
    templateUrl: SystemJS.map.app+'/product/index.html',
    styleUrls: [SystemJS.map.app+'/product/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService,TypeProduct,BrandProduct,ModelProduct]
})


export class Product extends BasicConfiguration implements OnInit {


    public paramsTable:any={};

    public externalSave:any={};
    public rulesSearch:any={};
    public rulesSave:any={}


    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService,  @Inject(TypeProduct) public typesProduct,@Inject(BrandProduct) public brandProduct, @Inject(ModelProduct) public modelProduct) {

        super("PRO","/productos/",http, toastr,myglobal,translate);

        //Search para los objetos en el momento de hacer un Save
        typesProduct.externalRules();
        brandProduct.externalRules();
        modelProduct.externalRules();


    
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


        let tempRules = this.rules;
        this.rules={};



        this.rules["code"] = {
            "update": this.permissions['update'],
            "visible": true,
            "search":this.permissions.filter,
            'required':true,
            'maxLength':50,
            'icon':'fa fa-barcode',
            "type": "text",
            "key": "code",
            "title": "Codigo",
            "placeholder": "ingrese el codigo",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'maxlength':'Maximo numero de caracteres 5'
                },
            },

        };

        this.rules["tipoProductoTitle"] = this.typesProduct.ruleObject;
        this.rules["tipoProductoTitle"].visible=true;

        this.rules["modeloTitle"] = this.modelProduct.ruleObject;
        this.rules["modeloTitle"].visible=true;

        this.rules["marcaTitle"] = this.brandProduct.ruleObject;
        this.rules["marcaTitle"].visible=true;


        this.rules['detail'] = tempRules['detail'];

        this.rules['enabled'] = tempRules['enabled'];

        this.rules['id'] = tempRules['id'];

        this.rules['enabled'].visible=false;

    }
    
    
    
    
    
    initParamsTable(){
        this.paramsTable.endpoint=this.endpoint;
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            "icon": "fa fa-trash",
            "exp": "",
            'title': 'Eliminar',
            'permission': '1',
            'message': 'Esta seguro de eliminar el producto con el codigo ',
            'keyAction':'code'
        };



    }

    initSaveRules() {
        this.paramsSave= {
                        title: "Agregar Productos",
                        idModal: "searchProductos",
                        endpoint: this.endpoint,
                         }


        this.rulesSave["code"] = this.rules['code'];
        this.rulesSave["detail"] = this.rules['detail'];

        this.rulesSave["tipoProducto"] = this.typesProduct.ruleObject;
        this.rulesSave["tipoProducto"].required=true;

        this.rulesSave["marca"] = this.brandProduct.ruleObject;
        this.rulesSave["marca"].required=true;


        this.rulesSave["modelo"] = this.modelProduct.ruleObject;
        this.rulesSave["modelo"].required=true;


    }

    initOptions() {
        this.viewOptions["title"] = 'Productos';
        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });

    }

    initSearch() {

        this.paramsSearch['title']="Producto";
        this.paramsSearch['idModal']="searchProducto";
        this.paramsSearch['placeholder']="Ingrese el producto";
    }


    ngOnInit() {

        this.initExternalSave();
        this.initExternalRulesSearch();
        this.initRules();
        this.initParamsTable();
        this.initSaveRules();
        this.initOptions();
        this.initSearch();

        this.loadData();
    

    }


    externalRules()
    {

    }

    initRuleObject()
    {

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
