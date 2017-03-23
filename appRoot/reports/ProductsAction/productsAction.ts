import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../../common/globalService";
import {Tables} from "../../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BasicConfiguration} from "../../common/basic-configuration";
import {Datepicker, Xeditable} from "../../common/xeditable";
import {Control,ControlGroup,FormBuilder,Validators} from "@angular/common";
import {Reports} from "../../utils/reports/report";
import {Select2} from "../../common/multiSelect";
import { Router} from '@angular/router-deprecated';

declare var moment:any;
declare var SystemJS:any;

@Component({
    selector: 'products-available',
    templateUrl: SystemJS.map.app+'/reports/ProductsAction/index.html',
    styleUrls: [SystemJS.map.app+'/reports/ProductsAction/style.css'],
    directives:[Reports,Xeditable,Select2],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})



export class ProductsAction extends BasicConfiguration implements OnInit {

    public paramsTable:any={}
    public endPointHis = "/inventario/historico/producto/dia";
    public endPointAct = "/inventario/diario/producto/dia";
    public listType :any={}
    public defaultGroup={'/inventario/historico/producto/dia':'["field":"tipoOperacion","show":["title"]],["field":"producto","show":["detail","code"]]','/inventario/diario/producto/dia':'["field":"tipoOperacion","show":["title"]],["field":"producto","show":["detail","code"]]'}
    public totalTitle='Total';







    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService,public router:Router,public _formBuilder: FormBuilder) {
        super("RE_PRO_AC","/inventario/historico/producto/dia",http, toastr,myglobal,translate,router);

    }





    initOptions() {
        this.viewOptions["title"] = 'Movimiento por productos';
        this.viewOptions["groupOptions"] = [{'title':'Dia','value':false,'key':'dia'},{'title':'Mes','value':false,'key':'mes'},{'title':'Año','value':false,'key':'year'}];
        this.viewOptions["listTypeTitle"] = "Tipo de accion";
        this.viewOptions["multiselect"] = 
        {
            'source':[],
            'placeholder':'Seleccione...',
            'message':'debe seleccionar al menos un tipo de accion'
        };

    }

    initRules() {

        this.rules ={};

        this.rules["productoCode"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "productoCode",
            "title": "Codigo",
            "placeholder": "Ingrese el producto",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

        this.rules["productoDetail"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "productoDetail",
            "title": "Producto",
            "placeholder": "Ingrese el producto",
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


        this.rules["tipoOperacionTitle"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "tipoOperacionTitle",
            "title": "Tipo Accion",
            "placeholder": "Ingrese la tipo de accion",
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
        this.paramsTable.title=this.viewOptions.title;
        this.paramsTable['endpoint']=this.endpoint;
        this.paramsTable['actions']={}

    }

    ngOnInit(){


        this.initOptions();
        this.initParamsTable();
        this.initRules();

        this.loadData_1("/search/tipo/acciones?showAll=true",this.listType)

    }





}
