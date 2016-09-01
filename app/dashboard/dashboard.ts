import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {Http} from "@angular/http";
import {RestController} from "../common/restController";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../common/globalService";
import {FormBuilder} from "@angular/common";
import {CHART_DIRECTIVES} from "angular2-highcharts/index";
import {Tables} from "../utils/tables/tables";

@Component({
    selector: 'home',
    templateUrl: 'app/dashboard/dashboard.html',
    styleUrls: ['app/dashboard/dashboard.css'],
    directives: [Tables, CHART_DIRECTIVES],
})
export class Dashboard extends RestController implements OnInit {


    public chart:any=[];

    public dataAreaPlot1 :any ={};



    public viewOptions:any={};

    public productListLess :any ={}
    public productListMore :any ={}


    public productRulesLess :any ={}
    public productRulesMore :any ={}

    public paramsTableLess :any={};
    public paramsTableMore :any={};
    
    constructor(public router:Router, http:Http, public _formBuilder:FormBuilder, public toastr:ToastsManager, public myglobal:globalService) {
        super(http, toastr);
    }


    initRules() {

        this.paramsTableLess['endpoint']="/inventario/diario/producto/minimo?sort=cantidad&order=desc";
        this.paramsTableLess['actions']={}

        this.paramsTableMore['endpoint']="/inventario/diario/producto/maximo";
        this.paramsTableMore['actions']={}
        
        this.productRulesMore = {
            "idProducto":{
                "visible": false,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "idProducto",
                "title": "idProducto",
                "placeholder": "idProducto"
            },
            "codeProducto":{
            "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "codeProducto",
                "title": "Codigo de producto",
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
            "idProducto":{
                "visible": false,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "idProducto",
                "title": "idProducto",
                "placeholder": "idProducto"
            },
            "codeProducto":{
                "visible": true,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "codeProducto",
                "title": "Codigo de producto",
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
                    text:"Yaxis",
                },
            },
            tooltip: {
                pointFormat: '{series.name} descargadas <b>{point.y:,.0f}</b>'
            },
            credits: {
                enabled: false
            },
            series: [],
            title: {text: 'series'},
        };

        this.dataAreaPlot1.series.push({"name":"Toneladas","data":[0,0,0,0,0,0,0,0,615.2,91.0,14.88,11.997,2.55,0,0,0,107.659,0,0,0,0,14.957,0,0,0,0,0.0,0,0,0,0]},{"name":"Balance","data":[0,0,0,0,0,0,0,0,21889.86,0,498.37,0,95.62,0,0,0,5382.95,0,13.370000000000001,0,0,112.5,0,0,0,0,0,0,0,0,0]},{"name":"Vehículos","data":[0,0,0,0,0,0,0,0,8,2,2,1,1,0,0,0,1,0,0,0,0,3,0,0,0,0,1,0,0,0,0]});

        this.dataAreaPlot1.xAxis.categories =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];



        /*

         {"series":[{"name":"Toneladas","data":[0,0,0,0,0,0,0,0,615.2,91.0,14.88,11.997,2.55,0,0,0,107.659,0,0,0,0,14.957,0,0,0,0,0.0,0,0,0,0]},{"name":"Balance","data":[0,0,0,0,0,0,0,0,21889.86,0,498.37,0,95.62,0,0,0,5382.95,0,13.370000000000001,0,0,112.5,0,0,0,0,0,0,0,0,0]},{"name":"Vehículos","data":[0,0,0,0,0,0,0,0,8,2,2,1,1,0,0,0,1,0,0,0,0,3,0,0,0,0,1,0,0,0,0]}],"categories":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]}

        if(this.chart['plot1']) {
            this.chart['plot1'].series[0].setData(response.json().series[0].data)
            this.chart['plot1'].xAxis[0].setCategories(response.json().categories)
        }
        else {
            if (response.json().categories)
                this.dataAreaPlot1.xAxis.categories = response.json().categories;
            this.dataAreaPlot1.series.push(response.json().series[0]);
        }*/


    }

    initOptions() {

        this.viewOptions["title"] = 'Principal';
    }

        getDataProduct()
    {
        
        let that = this; 
        let maxProduct = response =>{

            Object.assign(that.productListMore, response.json());
            
        };
        
        let minProduct = response =>
        {
            Object.assign(that.productListLess, response.json());
        };
        
        this.httputils.doGet("/inventario/diario/producto/maximo",maxProduct,this.error)
        this.httputils.doGet("/inventario/diario/producto/minimo?sort=cantidad&order=desc",minProduct,this.error)
    }


    ngOnInit() {

        this.initOptions();
        this.getPlot();
        this.initRules();
        this.getDataProduct();

     }




}


