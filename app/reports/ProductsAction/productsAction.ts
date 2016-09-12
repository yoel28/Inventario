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


declare var moment:any;

@Component({
    selector: 'products-available',
    templateUrl: 'app/reports/ProductsAction/index.html',
    styleUrls: ['app/reports/ProductsAction/style.css'],
    directives:[Reports,Xeditable,Select2],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})



export class ProductsAction extends BasicConfiguration implements OnInit {

    public paramsTable:any={}
    public endPointHis = "/inventario/historico/producto/dia";
    public endPointAct = "/inventario/diario/producto/dia";
    public listType :any={}
    
   
   



    public source = [
        {id: '11', text: 'Great Britain'},
        {id: '12', text: 'United States'},
        {id: '13', text: 'Russia'}
        ];

    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService,public _formBuilder: FormBuilder) {
        super("PRO_AC_RE","/inventario/historico/producto/dia",http, toastr,myglobal,translate);

    }





    initOptions() {
        this.viewOptions["title"] = 'Productos por accion';
        this.viewOptions["gruopOptions"] = false;
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

        this.rules["detailProducto"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "detailProducto",
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

        this.loadData_1("/search/tipo/acciones",this.listType)

    }





}
