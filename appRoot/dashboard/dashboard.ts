import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {Http} from "@angular/http";
import {RestController} from "../common/restController";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../common/globalService";
import {FormBuilder} from "@angular/common";
import {CHART_DIRECTIVES} from "angular2-highcharts/index";
import {Tables} from "../utils/tables/tables";
import {LessTables} from "../utils/lessTables/lessTables";
import {BasicConfiguration} from "../common/basic-configuration";
import {TranslateService} from "ng2-translate/ng2-translate";


declare var moment:any;
declare var SystemJS:any;
@Component({
    selector: 'home',
    templateUrl: SystemJS.map.app+'/dashboard/dashboard.html',
    styleUrls: [SystemJS.map.app+'/dashboard/dashboard.css'],
    directives: [Tables, CHART_DIRECTIVES,LessTables],
})
export class Dashboard extends BasicConfiguration implements OnInit {


    public chart:any=[];

    public dataAreaPlot1 :any ={};


    public dataAreaPlot2 :any ={};



    public viewOptions:any={};

    public productListLess :any ={}
    public productListMore :any ={}
    public productLocationList :any ={}
    public productEnterExitList :any ={}


    public productRulesLess :any ={}
    public productRulesMore :any ={}
    public productLocationRules :any ={}
    public productEnterExitRules :any ={}
    public productEnterExitDetailRules :any ={}

    public paramsTableLess :any={};
    public paramsTableMore :any={};
    public productLocationTables :any={};
    public productEnterExitTables :any={};



    public  extLocationProducto="&group=[['field':'ubicacion','show':['title','fila','columna']]]";
    public  extExitEnterProducto='&group=[["field":"cliente"],["field":"tipoOperacion"]]';

    public externalEndPointEnterExitTables ="/inventario/diario/producto/dia/dashboard/comp/";


    
    
    
    constructor(public router:Router, http:Http, public _formBuilder:FormBuilder, public toastr:ToastsManager, public myglobal:globalService,public translate: TranslateService) {
        super("DASH","",http, toastr,myglobal,translate);

    }




    initSearch(){}
    initRuleObject(){}
    externalRules(){}

    initRules() {

        this.paramsTableLess['endpoint']="/inventario/diario/producto/minimo";
        this.paramsTableLess['actions']={}

        this.paramsTableMore['endpoint']="/inventario/diario/producto/maximo";
        this.paramsTableMore['actions']={}


        this.productLocationTables['endpoint']="/inventario/diario/producto/ubicacion";
        this.productLocationTables['actions']={}



        this.productEnterExitTables['endpoint']="/inventario/diario/producto/dia/dashboard";
        this.productEnterExitTables['actions']={}




        this.productRulesMore = {
            "codeProducto":{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "codeProducto",
                "title": "Codigo",
                "placeholder": "Codigo de producto"
            },
            "detailProducto":{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "detailProducto",
                "title": "Producto",
                "placeholder": "Ingrese el Producto"
            },
            "cantidad":{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "number",
                "key": "cantidad",
                "title": "Cantidad",
                "placeholder": "Ingrese la cantidad"
            },
            'maximoPermitido':{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "number",
                "key": "maximoPermitido",
                "title": "Maximo Permitido"
            }
        };
        
        this.productRulesLess = {
            "codeProducto":{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "codeProducto",
                "title": "Codigo",
                "placeholder": "Codigo de producto"
            },
            "detailProducto":{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "detailProducto",
                "title": "Producto",
                "placeholder": "Ingrese el Producto"
            },
            "cantidad":{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "number",
                "key": "cantidad",
                "title": "Cantidad",
                "placeholder": "Ingrese la cantidad"
            },
            'minimoPermitido':{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "number",
                "key": "minimoPermitido",
                "title": "Minimo Permitido",
            }
        };

        this.productLocationRules={
            'ubicacionTitle':{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "ubicacionTitle",
                "title": "Nombre del casillero",
                "placeholder": "nombre del casillero"
            },
            'ubicacionFila':{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "ubicacionFila",
                "title": "fila",
                "placeholder": "fila"
            },
            'ubicacionColumna':{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "ubicacionColumna",
                "title": "Columna",
                "placeholder": "columna"
            },
            'cantidadProductosUbicacion':{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "cantidadProductosUbicacion",
                "title": "Cantidad de productos",
                "placeholder": "cantidad de producto"
            }
        };




        this.productEnterExitRules={
            'nombreCliente':{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "nombreCliente",
                "title": "Empresa",
                "placeholder": "nombre del producto"
            },
            'nombreOperacion':{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "nombreOperacion",
                "title": "Accion",
                "placeholder": "Accion"
            },
            'cantidad':{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "cantidad",
                "title": "Cantidad",
                "placeholder": "columna"
            },
            'idCliente':{
            "visible": false,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "idCliente",
                "title": "Accion",
                "placeholder": "Accion"
        },
        };



        this.productEnterExitDetailRules = {
            "detailProducto":{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "detailProducto",
                "title": "Producto",
                "placeholder": "idProducto"
            },
            "nombreTipoAccion":{
                "visible": false,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "nombreTipoAccion",
                "title": "Tipo Accion",
                "placeholder": "Codigo de producto"
            },
            "cantidad":{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "number",
                "key": "cantidad",
                "title": "Cantidad",
                "placeholder": "Ingrese la cantidad"
            }
        };
    }

    saveInstance(chartInstance,index) {
        this.chart[index]=[];
        this.chart[index] = chartInstance;
    }

    getPlot() {

        this.dataAreaPlot1 = {
            chart: {
                renderTo: 'chartcontainer1',
                type: 'area',
            },
            xAxis: {
                categories: [],
            },
            yAxis: {
                title: {
                    text:"Cantidad",
                },
            },
            tooltip: {
                pointFormat: '{series.name} <b>{point.y:,.0f}</b>'
            },
            credits: {
                enabled: false
            },
            series: [],
            title: {text: 'Entrada y Salida de productos en el año actual'},
        };


        this.dataAreaPlot2 = {
            chart: {
                renderTo: 'chartcontainer2',
                type: 'area',
            },
            xAxis: {
                categories: [],
            },
            yAxis: {
                title: {
                    text:"Cantidad",
                },
            },
            tooltip: {
                pointFormat: '{series.name}  <b>{point.y:,.0f}</b>'
            },
            credits: {
                enabled: false
            },
            series: [],
            title: {text: 'Entrada y Salida de productos Mes'},
        };



        let  currentDay=moment().format('DD-MM-YYYY').split('-');

        let that =this;
        let successGra = response=>{
            that.dataAreaPlot1.xAxis.categories = response.json().categories;
            that.dataAreaPlot1.series.push(response.json().series[0]);
            that.dataAreaPlot1.series.push(response.json().series[1]);
        }

        this.httputils.doGet("/inventario/historico/grafica/operaciones/?where=[['field':'year','value':"+currentDay[2]+"]]",successGra,this.error);


        let successGra2 = response=>{
            that.dataAreaPlot2.xAxis.categories = response.json().categories;
            that.dataAreaPlot2.series.push(response.json().series[0]);
            that.dataAreaPlot2.series.push(response.json().series[1]);

        }


        this.httputils.doGet("/inventario/historico/grafica/operaciones/?where=[['field':'month','value':"+parseInt(currentDay[1])+"],['field':'year','value':"+currentDay[2]+"]]",successGra2,this.error);


    }

    initOptions() {

        this.viewOptions["title"] = 'Principal';
    }

    getDataProduct() {
        this.loadData_1("/inventario/diario/producto/maximo",this.productListMore);
        this.loadData_1("/inventario/diario/producto/minimo",this.productListLess);
        this.loadData_1("/inventario/diario/producto/ubicacion",this.productLocationList,this.extLocationProducto);
        this.loadData_1("/inventario/diario/producto/dia/dashboard",this.productEnterExitList,this.extExitEnterProducto);
    }
    
    ngOnInit() {

        this.initOptions();
        this.getPlot();
        this.initRules();
        this.getDataProduct();

     }




}


