import {Component,Injectable, OnInit,ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";
import {BasicConfiguration} from "../common/basic-configuration";

@Component({
    selector: 'type-product',
    templateUrl: 'app/typeProduct/index.html',
    styleUrls: ['app/typeProduct/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class TypeProduct extends BasicConfiguration implements OnInit {


    public paramsTable:any={};
    
    
    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
        
        super("TIP_PRO","/tipo/productos/",http, toastr,myglobal,translate);
    
    }



    initRules() {

        let tempRules = this.rules;
        this.rules={};

        this.rules["title"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "title",
            "title": "Titulo",
            "placeholder": "ingrese el nombre del titulo",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

        this.rules['detail'] = tempRules['detail'];
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
            'message': '¿ Esta seguro de eliminar el tipo de producto: ',
            'keyAction':'title'
        };
    }

    initSaveRules(){

        this.paramsSave= {
            title: "Agregar de tipo de producto",
            idModal: "saveProductType",
            endpoint: this.endpoint,
        }

        this.rulesSave = {
            'title': {
                'type': this.rules['title'].type,
                'required':true,
                "search":true,
                'title': this.rules['title'].title,
                'placeholder': this.rules['title'].placeholder,
                'msg':this.rules['title'].msg
            },
            'detail': {
                'type': this.rules['detail'].type,
                'title': this.rules['detail'].title,
                "search":true,
                'placeholder': this.rules['detail'].placeholder,
                'msg':this.rules['detail'].msg
            }
        };

    }

    initOptions() {
        this.viewOptions["title"] = 'Tipo de producto';

        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });
    }

    initSearch() {
        this.paramsSearch['title']="Tipo Producto";
        this.paramsSearch['idModal']="searchProducto";
        this.paramsSearch['placeholder']="Ingrese el producto";
    }

    
    
    ngOnInit() {
        
        this.initRules();
        this.initParamsTable();
        this.initSaveRules();
        this.initOptions();
        this.initSearch();
        this.loadData();
    
    }

    
    initRuleObject(){
        this.ruleObject={
            'icon':'fa fa-list',
            "type": "text",
            "key": "tipoProducto",
            "title": "Tipo",
            'object':true,
            "placeholder": "Ingrese el titulo del tipo",
            'paramsSearch':this.paramsSearch,
            'permissions':this.permissions,
            'msg':{
                'errors':{
                    'object':'El tipo no esta registrado',
                    'required':'El campo es obligatorio'
                },
            }
        }
    }

    externalRules(){
        this.initRules();
        this.initSearch();
        this.initRuleObject();
        this.initSaveRules();
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