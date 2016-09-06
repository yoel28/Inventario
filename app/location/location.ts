import {Component,ViewChild, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {Save} from "../utils/save/save";
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {BasicConfiguration} from "../common/basic-configuration";

@Component({
    selector: 'location_product',
    templateUrl: 'app/location/index.html',
    styleUrls: ['app/location/style.css'],
    pipes: [TranslatePipe],
    directives: [Tables,Save]
})


export class Location_product extends BasicConfiguration implements OnInit {

    public paramsTable:any={};

    
    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService) {
        super("LO","/ubicaciones/",http, toastr,myglobal,translate);
    
    }


    initRules() {

        let tempRules = this.rules;
        this.rules={};


        this.rules["code"] = {
            "update": this.permissions['update'],
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
            "update": this.permissions['update'],
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
            "update": this.permissions['update'],
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
            "update": this.permissions['update'],
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
            "update": this.permissions['update'],
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
            "update": this.permissions['update'],
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
            "update": this.permissions['update'],
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

    initRuleObject(){
        this.ruleObject={
            'icon':'fa fa-list',
            "type": "text",
            "key": "ubicacion",
            "title": "Ubicacion",
            'object':true,
            "placeholder": "Ingrese la Ubicacion",
            'paramsSearch':this.paramsSearch,
            'msg':{
                'errors':{
                    'object':'El tipo no esta registrado',
                    'required':'El campo es obligatorio'
                },
            }


        }
    }

    initSaveRules(){

        this.paramsSave= {
            title: "Agregar Ubicacion",
            idModal: "searchLocation",
            endpoint: this.endpoint,
        }



        this.rulesSave = this.rules;
        delete this.rulesSave['id'];
    }

    initOptions() {

        this.viewOptions["title"] = 'Ubicacion';

        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });
    }

    initSearch() {
        this.paramsSearch['title']="Ubicacion";
        this.paramsSearch['idModal']="searchlocation";
        this.paramsSearch['placeholder']="Ingrese el ubicacion";
    }

    ngOnInit() {
        this.initRules();
        this.initParamsTable();
        this.initSaveRules();
        this.initOptions();
        this.initSearch();
        this.loadData();
    }


    externalRules() {

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