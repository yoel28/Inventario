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
    selector: 'products-available',
    templateUrl: SystemJS.map.app+'/reports/productAvailable/productAvailable.html',
    styleUrls: [SystemJS.map.app+'/reports/productAvailable/style.css'],
    directives:[Reports],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})



export class ProductAvailable extends BasicConfiguration implements OnInit {

    public paramsTable:any={}
    public endPointHis = "/inventario/historico/cantidad";
    public endPointAct = "/inventario/diario/cantidad";
    public defaultGroup={}
    public totalTitle='Total';




    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService,public _formBuilder: FormBuilder) {
        super("RE_PO_AV","/inventario/historico/cantidad/",http, toastr,myglobal,translate);

    }


    
    initOptions() {
        this.viewOptions["title"] = 'Productos en Existencia';
        this.viewOptions["groupOptions"] = false;

    }
    
    initRules() {

        this.rules ={};

        this.rules["code"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "code",
            "title": "Código",
            "placeholder": "Ingrese el código",
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
            "placeholder": "Ingrese la cantidad",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

        
        this.rules["modelo"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "modelo",
            "title": "modelo",
            "placeholder": "Ingrese la cantidad",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["tipoProducto"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "tipoProducto",
            "title": "tipo producto",
            "placeholder": "Ingrese la cantidad",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

        this.rules["tipoOperacion"] = {
            "update": false,
            "visible": false,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "tipoOperacion",
            "title": "tipo operacion",
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
