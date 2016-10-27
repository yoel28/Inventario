import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../../common/globalService";
import {Tables} from "../../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BasicConfiguration} from "../../common/basic-configuration";
import {Datepicker} from "../../common/xeditable";
import {Control,ControlGroup,FormBuilder,Validators} from "@angular/common";
import {Reports} from "../../utils/reports/report";

declare var SystemJS:any;
declare var moment:any;

@Component({
    selector: 'office-supplier',
    templateUrl: SystemJS.map.app+'/reports/productAvailable/productAvailable.html',
    styleUrls: [SystemJS.map.app+'/reports/productAvailable/style.css'],
    directives:[Reports],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})



export class OfficeSupplier extends BasicConfiguration implements OnInit {

    public paramsTable:any={}
    public endPointHis = "/inventario/historico/proveedor/despacho";
    public endPointAct = "/inventario/diario/proveedor/despacho";
    public defaultGroup={'/inventario/historico/proveedor/despacho':'["field":"cliente","show":["title","ruc"]],["field":"producto","show":["detail"]]','/inventario/diario/proveedor/despacho':'["field":"cliente","show":["title","ruc"]],["field":"producto","show":["detail"]]'}
    public totalEndPoint:any={};
    public totalTitle='Total';
    public paramsFilter:any = {
        title: "Despacho por Proveedor",
        idModal: "modalFilter",
        endpoint: "",
    };


    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService,public _formBuilder: FormBuilder) {
        super("RE_OF_SU","/inventario/historico/proveedor/despacho",http, toastr,myglobal,translate);

    }



    initOptions() {
        this.viewOptions["title"] = 'Despacho por Proveedor';
        this.viewOptions["groupOptions"] = [{'title':'Dia','value':false,'key':'dia'},{'title':'Mes','value':false,'key':'mes'},{'title':'Año','value':false,'key':'year'}];
        
    }

    initRules() {

        this.rules ={};

        this.rules["clienteRuc"] = {
            "update": false,
            "search":true,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "ruc",
            "join":"cliente",
            "title": "Ruc de proveedor",
            "placeholder": "Ingrese el ruc del proveedor",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["clienteTitle"] = {
            "update": false,
            "search":true,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "title",
            "join":"cliente",
            "title": "Proveedor",
            "placeholder": "proveedor",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

        this.rules["productoDetail"] = {
            "update": false,
            "search":true,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "detail",
            "join":"producto",
            "title": "Detalle de producto",
            "placeholder": "Detalle del producto",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["cantidad"] = {
            "update": false,
            "search":false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "cantidad",
            "title": "cantidad",
            "placeholder": "Ingrese la cantidad",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        
        this.rules["dia"] = {
            "update": false,
            "visible": true,
            'required':true,
            "search":true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "dia",
            "title": "Dia",
            "placeholder": "Ingrese el dia",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };


        this.rules["mes"] = {
            "update": false,
            "visible": true,
            'required':true,
            "search":true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "mes",
            "title": "Meses",
            "placeholder": "Ingrese el mes",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };


        this.rules["year"] = {
            "update": false,
            "visible": true,
            'required':true,
            "search":true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "year",
            "title": "Año",
            "placeholder": "Ingrese la el año",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

    }

    initSearch() {

    }

    initRuleObject() {

    }

    externalRules() {

    }

    initParamsTable(){
        this.paramsTable.title = this.viewOptions.title;
        this.paramsTable['endpoint']=this.endpoint;
        this.paramsTable['actions']={}

    }


    ngOnInit(){


        this.initOptions();
        this.initParamsTable();
        this.initRules();

    }





}
