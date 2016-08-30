import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {Http} from "@angular/http";
import {RestController} from "../common/restController";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../common/globalService";
import {FormBuilder} from "@angular/common";
import {CHART_DIRECTIVES} from "angular2-highcharts/index";

@Component({
    selector: 'home',
    templateUrl: 'app/dashboard/dashboard.html',
    styleUrls: ['app/dashboard/dashboard.css'],
    directives: [ CHART_DIRECTIVES],
})
export class Dashboard extends RestController implements OnInit {


    chart:any=[];

    dataAreaPlot1 = {
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

    constructor(public router:Router, http:Http, public _formBuilder:FormBuilder, public toastr:ToastsManager, public myglobal:globalService) {
        super(http, toastr);
    }


    saveInstance(chartInstance,index) {
        this.chart[index]=[];
        this.chart[index] = chartInstance;
    }


    getPlot()
    {



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



    ngOnInit() {

        this.getPlot();

     }




}


