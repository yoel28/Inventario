System.register(['@angular/core', "./restController", "@angular/http", "./headers", "ng2-toastr/ng2-toastr"], function(exports_1, context_1) {
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
    var core_1, restController_1, http_1, headers_1, ng2_toastr_1;
    var globalService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (restController_1_1) {
                restController_1 = restController_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (headers_1_1) {
                headers_1 = headers_1_1;
            },
            function (ng2_toastr_1_1) {
                ng2_toastr_1 = ng2_toastr_1_1;
            }],
        execute: function() {
            globalService = (function (_super) {
                __extends(globalService, _super);
                function globalService(http, toastr) {
                    _super.call(this, http, toastr);
                    this.http = http;
                    this.toastr = toastr;
                    this.version = "1.0.0";
                    this.user = [];
                    this.params = {};
                    this.permissions = [];
                    this.init = false;
                    if (typeof (Storage) !== "undefined") {
                    }
                    else {
                    }
                    if (localStorage.getItem('bearer')) {
                        this.loadParams();
                        this.getUser();
                    }
                }
                globalService.prototype.getUser = function () {
                    var _this = this;
                    var that = this;
                    var error = function (response) {
                        that.toastr.error('Tu Sesión Expiró', 'Ocurrió un error');
                        localStorage.removeItem('bearer');
                        headers_1.contentHeaders.delete('Authorization');
                        window.location.reload();
                    };
                    var successCallback = function (response) {
                        Object.assign(that.user, response.json());
                        var successCallback2 = function (response) {
                            Object.assign(that.user, that.user, response.json().list[0]);
                            that.myPermissions();
                        };
                        var where = encodeURI('[["op":"eq","field":"username","value":"' + _this.user.username + '"]]');
                        _this.httputils.doGet('/users?where=' + where, successCallback2, error);
                    };
                    this.httputils.doGet('/validate', successCallback, error);
                };
                globalService.prototype.existsPermission = function (id) {
                    var index = this.permissions.findIndex(function (obj) { return obj.id == id; });
                    if (index > -1)
                        return true;
                    return true;
                };
                globalService.prototype.myPermissions = function () {
                    var that = this;
                    var successCallback = function (response) {
                        Object.assign(that.permissions, response.json());
                        that.init = true;
                    };
                    return this.httputils.doGet('/current/permissions/', successCallback, this.error);
                };
                globalService.prototype.loadParams = function () {
                    var that = this;
                    var successCallback = function (response) {
                        Object.assign(that.params, response.json().list);
                    };
                    this.httputils.doGet('/params?max=100', successCallback, this.error);
                };
                globalService.prototype.getParams = function (key) {
                    var that = this;
                    var valor = "";
                    Object.keys(this.params).forEach(function (index) {
                        if (that.params[index].key == key) {
                            valor = that.params[index].value;
                            return;
                        }
                    });
                    return valor;
                };
                globalService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager])
                ], globalService);
                return globalService;
            }(restController_1.RestController));
            exports_1("globalService", globalService);
        }
    }
});
//# sourceMappingURL=globalService.js.map