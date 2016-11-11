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
import { Router} from '@angular/router-deprecated';

declare var moment:any;
declare var SystemJS:any;

@Component({
    selector: 'moves-date',
    templateUrl: SystemJS.map.app+'/reports/moveDate/index.html',
    styleUrls: [SystemJS.map.app+'/reports/moveDate/style.css'],
    directives:[Reports],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})



export class MovesByDate extends BasicConfiguration implements OnInit {

    public paramsTable:any={}
    public endPointHis = "/inventario/historico/operacion/fecha";
    public endPointAct = "/inventario/diario/operacion/fecha";
    public defaultGroup={'/inventario/historico/operacion/fecha':'["field":"tipoOperacion","show":["title"]]','/inventario/diario/operacion/fecha':'["field":"tipoOperacion","show":["title"]]'}
    public totalEndPoint:any={};
    public totalTitle='Total';


    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService,public router:Router,public _formBuilder: FormBuilder) {
        super("OP_AC_DE","/inventario/historico/operacion/fecha",http, toastr,myglobal,translate,router);

    }



    initOptions() {
        this.viewOptions["title"] = 'Movimientos por fecha';
        this.viewOptions["groupOptions"] = [{'title':'Dia','value':false,'key':'dia'},{'title':'Mes','value':false,'key':'mes'},{'title':'Año','value':false,'key':'year'}];

    }

    initRules() {

        this.rules ={};

        this.rules["tipoOperacionTitle"] = {
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

    }





}
