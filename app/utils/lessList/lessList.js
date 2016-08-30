System.register(["@angular/core", "@angular/common", "../../common/restController", "@angular/http", "ng2-toastr/ng2-toastr", "../../common/globalService"], function(exports_1, context_1) {
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
    var core_1, common_1, restController_1, http_1, ng2_toastr_1, globalService_1;
    var LessList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (restController_1_1) {
                restController_1 = restController_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng2_toastr_1_1) {
                ng2_toastr_1 = ng2_toastr_1_1;
            },
            function (globalService_1_1) {
                globalService_1 = globalService_1_1;
            }],
        execute: function() {
            LessList = (function (_super) {
                __extends(LessList, _super);
                function LessList(_formBuilder, http, toastr, myglobal) {
                    _super.call(this, http, toastr);
                    this._formBuilder = _formBuilder;
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.params = {};
                    this.rules = {};
                    this.paramSearch = {};
                    this.externalEndPoint = "";
                    this.rulesDetalis = {};
                    this.dataList = {};
                }
                LessList.prototype.ngOnInit = function () {
                    this.setEndpoint(this.paramSearch.endpoint);
                    this.loadData();
                };
                LessList.prototype.searchDetalles = function (data) {
                    if (!data.detailsSearh) {
                        for (var _i = 0, _a = this.dataList.list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            item.detailsSearh = {};
                        }
                    }
                    if (!data.detailsSearh['id']) {
                        var that = this;
                        var successCallback = function (response) {
                            Object.assign(data.detailsSearh, response.json());
                        };
                        this.httputils.doGet(this.externalEndPoint + data.id, successCallback, this.error);
                    }
                };
                LessList.prototype.getKeys = function (item) {
                    var data = [];
                    var that = this;
                    Object.keys(that.rulesDetalis).forEach(function (key) {
                        if (item.detailsSearh[key] && key != 'image')
                            data.push(key);
                    });
                    return data;
                };
                LessList.prototype.MaxPager = function () {
                    return Math.ceil(this.dataList.count / this.max);
                };
                LessList = __decorate([
                    core_1.Component({
                        selector: 'less-list',
                        templateUrl: 'app/utils/lessList/index.html',
                        styleUrls: ['app/utils/lessList/style.css'],
                        inputs: ['paramSearch', 'externalEndPoint', 'rulesDetalis']
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, http_1.Http, ng2_toastr_1.ToastsManager, globalService_1.globalService])
                ], LessList);
                return LessList;
            }(restController_1.RestController));
            exports_1("LessList", LessList);
        }
    }
});
//# sourceMappingURL=lessList.js.map