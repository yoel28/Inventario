System.register(["@angular/core", "@angular/router-deprecated", "@angular/http", "../common/restController", "ng2-toastr/ng2-toastr", "../common/globalService", "@angular/common", "angular2-highcharts/index"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_deprecated_1, http_1, restController_1, ng2_toastr_1, globalService_1, common_1, index_1;
    var Dashboard;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (restController_1_1) {
                restController_1 = restController_1_1;
            },
            function (ng2_toastr_1_1) {
                ng2_toastr_1 = ng2_toastr_1_1;
            },
            function (globalService_1_1) {
                globalService_1 = globalService_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }],
        execute: function() {
            Dashboard = (function (_super) {
                __extends(Dashboard, _super);
                function Dashboard(router, http, _formBuilder, toastr, myglobal) {
                    _super.call(this, http, toastr);
                    this.router = router;
                    this._formBuilder = _formBuilder;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.chart = [];
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
                                text: "Yaxis",
                            },
                        },
                        tooltip: {
                            pointFormat: '{series.name} descargadas <b>{point.y:,.0f}</b>'
                        },
                        credits: {
                            enabled: false
                        },
                        series: [],
                        title: { text: 'series' },
                    };
                }
                Dashboard.prototype.saveInstance = function (chartInstance, index) {
                    this.chart[index] = [];
                    this.chart[index] = chartInstance;
                };
                Dashboard.prototype.getPlot = function () {
                    this.dataAreaPlot1.series.push({ "name": "Toneladas", "data": [0, 0, 0, 0, 0, 0, 0, 0, 615.2, 91.0, 14.88, 11.997, 2.55, 0, 0, 0, 107.659, 0, 0, 0, 0, 14.957, 0, 0, 0, 0, 0.0, 0, 0, 0, 0] }, { "name": "Balance", "data": [0, 0, 0, 0, 0, 0, 0, 0, 21889.86, 0, 498.37, 0, 95.62, 0, 0, 0, 5382.95, 0, 13.370000000000001, 0, 0, 112.5, 0, 0, 0, 0, 0, 0, 0, 0, 0] }, { "name": "Vehículos", "data": [0, 0, 0, 0, 0, 0, 0, 0, 8, 2, 2, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0] });
                    this.dataAreaPlot1.xAxis.categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
                };
                Dashboard.prototype.ngOnInit = function () {
                    this.getPlot();
                };
                Dashboard = __decorate([
                    core_1.Component({
                        selector: 'home',
                        templateUrl: 'app/dashboard/dashboard.html',
                        styleUrls: ['app/dashboard/dashboard.css'],
                        directives: [index_1.CHART_DIRECTIVES],
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, http_1.Http, common_1.FormBuilder, ng2_toastr_1.ToastsManager, globalService_1.globalService])
                ], Dashboard);
                return Dashboard;
            }(restController_1.RestController));
            exports_1("Dashboard", Dashboard);
        }
    }
});
//# sourceMappingURL=dashboard.js.map