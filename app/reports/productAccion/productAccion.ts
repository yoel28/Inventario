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
    selector: 'products-accion',
    templateUrl: 'app/reports/productAccion/index.html',
    styleUrls: ['app/reports/productAccion/style.css'],
    directives:[Reports],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})



export class ProductAccion extends BasicConfiguration implements OnInit {

    public paramsTable:any={}
    public endPointHis = "/inventario/historico/operacion/fecha";
    public endPointAct = "/inventario/diario/operacion/fecha";


    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService,public _formBuilder: FormBuilder) {
        super("OP_AC_DE","/inventario/historico/operacion/fecha",http, toastr,myglobal,translate);

    }



    initOptions() {
        this.viewOptions["title"] = 'Movimientos por fecha';
        this.viewOptions["gruopOptions"] = true;

    }

    initRules() {

        this.rules ={};

        this.rules["nombreOperacion"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "nombreOperacion",
            "title": "Nombre de Operacion",
            "placeholder": "Ingrese el ruc cliente",
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
            "title": "Cantidad",
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
