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


declare var moment:any;

@Component({
    selector: 'products-available',
    templateUrl: 'app/reports/productAvailable/productAvailable.html',
    styleUrls: ['app/reports/productAvailable/style.css'],
    directives:[Reports],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})



export class OfficeSupplier extends BasicConfiguration implements OnInit {

    public paramsTable:any={}
    public endPointHis = "/inventario/historico/proveedor/despacho";
    public endPointAct = "/inventario/diario/proveedor/despacho";
    public defaultGroup={'/inventario/historico/proveedor/despacho':'["field":"cliente"],["field":"producto"]','/inventario/diario/proveedor/despacho':'["field":"cliente"],["field":"producto"]'}



    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService,public _formBuilder: FormBuilder) {
        super("RE_PO_DE","/inventario/historico/proveedor/despacho",http, toastr,myglobal,translate);

    }



    initOptions() {
        this.viewOptions["title"] = 'Despacho por Proveedor';
        this.viewOptions["groupOptions"] = [{'title':'Dia','value':false,'key':'day'},{'title':'Mes','value':false,'key':'month'},{'title':'Año','value':false,'key':'year'},];
        
    }

    initRules() {

        this.rules ={};

        this.rules["rucCliente"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "rucCliente",
            "title": "Ruc de Cliente",
            "placeholder": "Ingrese el ruc cliente",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["nombreCliente"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "nombreCliente",
            "title": "nombre de cliente",
            "placeholder": "Ingrese la cantidad",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

        this.rules["detailProducto"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "detailProducto",
            "title": "Producto",
            "placeholder": "Ingrese la cantidad",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["cantidad"] = {
            "update": false,
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
        
        this.rules["day"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "day",
            "title": "Dia",
            "placeholder": "Ingrese el dia",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };


        this.rules["month"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "month",
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
        this.paramsTable['endpoint']=this.endpoint;
        this.paramsTable['actions']={}

    }

    ngOnInit(){


        this.initOptions();
        this.initParamsTable();
        this.initRules();

    }





}
