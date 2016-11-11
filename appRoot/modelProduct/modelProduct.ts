import {Component,Injectable, OnInit,ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";
import {BasicConfiguration} from "../common/basic-configuration";
import { Router} from '@angular/router-deprecated';


declare var SystemJS:any;
@Component({
    selector: 'model-product',
    templateUrl: SystemJS.map.app+'/modelProduct/index.html',
    styleUrls: [SystemJS.map.app+'/modelProduct/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class ModelProduct extends BasicConfiguration implements OnInit {


    public paramsTable:any={};

    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService,public router:Router) {

        super("MO_PRO","/modelos/",http, toastr,myglobal,translate,router);

    }



    initRules() {

        let tempRules = this.rules;
        this.rules={};

        this.rules["title"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            "search":this.permissions.filter,
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
        this.paramsTable.title = this.viewOptions.title;
        this.paramsTable.endpoint=this.endpoint;
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            "icon": "fa fa-trash",
            "exp": "",
            'title': 'Eliminar',
            'permission': this.permissions.delete,
            'message': '¿ Esta seguro de eliminar el modelo de producto: ',
            'keyAction':'title'
        };
    }

    initSaveRules(){

        this.paramsSave= {
            title: "Agregar de modelo de producto",
            idModal: "saveProductType",
            endpoint: this.endpoint,
        }
        
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave['enabled'];
        delete this.rulesSave['id'];

    }

    initOptions() {

        this.viewOptions["title"] = 'Modelo de producto';

        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });
        
    }



    initSearch() {
        this.paramsSearch['title']="Modelo Producto";
        this.paramsSearch['idModal']="searchModelProducto";
        this.paramsSearch['placeholder']="Ingrese el modelo de producto";
    }
    
    ngOnInit() {


        this.initRules();
        this.initSaveRules();
        this.initOptions();
        this.initSearch();
        this.initParamsTable();
        this.loadData();
    }

    
    
    
    initRuleObject(){
        this.ruleObject={
            'icon':'fa fa-list',
            "type": "text",
            "key": "modelo",
            "title": "Modelo",
            'object':true,
            "placeholder": "Ingrese el codigo del modelo",
            'paramsSearch':this.paramsSearch,
            'permissions':this.permissions,
            'search':this.permissions.filter,
            'msg':{
                'errors':{
                    'object':'El modelo no esta registrado',
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