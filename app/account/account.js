System.register(['@angular/core', '@angular/common', '@angular/router-deprecated', '@angular/http', '../common/headers', "../common/restController", "../common/globalService", "ng2-toastr/ng2-toastr"], function(exports_1, context_1) {
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
    var core_1, common_1, router_deprecated_1, http_1, headers_1, restController_1, globalService_1, ng2_toastr_1;
    var AccountLogin, AccountActivate, AccountRecover, AccountRecoverPassword;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (headers_1_1) {
                headers_1 = headers_1_1;
            },
            function (restController_1_1) {
                restController_1 = restController_1_1;
            },
            function (globalService_1_1) {
                globalService_1 = globalService_1_1;
            },
            function (ng2_toastr_1_1) {
                ng2_toastr_1 = ng2_toastr_1_1;
            }],
        execute: function() {
            AccountLogin = (function (_super) {
                __extends(AccountLogin, _super);
                function AccountLogin(router, http, _formBuilder, myglobal, toastr) {
                    _super.call(this, http);
                    this.router = router;
                    this.http = http;
                    this._formBuilder = _formBuilder;
                    this.myglobal = myglobal;
                    this.toastr = toastr;
                    this.submitForm = false;
                    this.setEndpoint("/login");
                }
                AccountLogin.prototype.ngOnInit = function () {
                    this.initForm();
                };
                AccountLogin.prototype.initForm = function () {
                    this.username = new common_1.Control("", common_1.Validators.compose([common_1.Validators.required]));
                    this.password = new common_1.Control("", common_1.Validators.compose([common_1.Validators.required]));
                    this.form = this._formBuilder.group({
                        username: this.username,
                        password: this.password,
                    });
                };
                AccountLogin.prototype.login = function (event) {
                    event.preventDefault();
                    var that = this;
                    var body = JSON.stringify(this.form.value);
                    this.submitForm = true;
                    var errorLogin = function (error) {
                        that.submitForm = false;
                        that.toastr.error('Usuario o contraseña inválida');
                    };
                    var successCallback = function (response) {
                        that.submitForm = false;
                        that.myglobal.init = false;
                        localStorage.setItem('bearer', response.json().access_token);
                        headers_1.contentHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('bearer'));
                        that.myglobal.user = response.json();
                        that.myglobal.getUser();
                        var link = ['Dashboard', {}];
                        that.router.navigate(link);
                    };
                    this.httputils.doPost(this.endpoint, body, successCallback, errorLogin);
                };
                AccountLogin.prototype.recover = function (event) {
                    event.preventDefault();
                    var link = ['AccountRecover', {}];
                    this.router.navigate(link);
                };
                AccountLogin = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: 'app/account/login/index.html',
                        styleUrls: ['app/account/style.css']
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, http_1.Http, common_1.FormBuilder, globalService_1.globalService, ng2_toastr_1.ToastsManager])
                ], AccountLogin);
                return AccountLogin;
            }(restController_1.RestController));
            exports_1("AccountLogin", AccountLogin);
            AccountActivate = (function (_super) {
                __extends(AccountActivate, _super);
                function AccountActivate(params, router, http) {
                    _super.call(this, http);
                    this.params = params;
                    this.router = router;
                    this.http = http;
                    this.setEndpoint('/users/activate/' + params.get('id') + "?access_token=" + params.get('token'));
                    this.validate();
                }
                AccountActivate.prototype.validate = function () {
                    var _this = this;
                    var successCallback = function (response) {
                        _this.mensaje = "Cuenta Activada";
                    };
                    var errorCallback = function (err) {
                        _this.mensaje = "Error al activar la cuenta";
                    };
                    this.httputils.doGet(this.endpoint, successCallback, errorCallback);
                };
                AccountActivate.prototype.onLogin = function (event) {
                    event.preventDefault();
                    var link = ['AccountLogin', {}];
                    this.router.navigate(link);
                };
                AccountActivate = __decorate([
                    core_1.Component({
                        selector: 'activate',
                        templateUrl: 'app/account/activate/index.html',
                        styleUrls: ['app/account/style.css']
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.RouteParams, router_deprecated_1.Router, http_1.Http])
                ], AccountActivate);
                return AccountActivate;
            }(restController_1.RestController));
            exports_1("AccountActivate", AccountActivate);
            AccountRecover = (function (_super) {
                __extends(AccountRecover, _super);
                function AccountRecover(router, http, _formBuilder, toastr) {
                    _super.call(this, http, toastr);
                    this.router = router;
                    this.http = http;
                    this._formBuilder = _formBuilder;
                    this.toastr = toastr;
                    this.setEndpoint(localStorage.getItem('url') + '/users/recover/');
                    this.initForm();
                }
                AccountRecover.prototype.initForm = function () {
                    this.username = new common_1.Control("", common_1.Validators.compose([common_1.Validators.required]));
                    this.form = this._formBuilder.group({
                        username: this.username,
                    });
                };
                AccountRecover.prototype.recoverPassword = function (event) {
                    var _this = this;
                    event.preventDefault();
                    var successCallback = function (response) {
                        _this.toastr.success('Correo Enviado', 'Solicitud Procesada.');
                        var link = ['AccountLogin', {}];
                        _this.router.navigate(link);
                    };
                    this.httputils.doGet(this.endpoint + this.username.value, successCallback, this.error, true);
                };
                AccountRecover.prototype.onLogin = function (event) {
                    event.preventDefault();
                    var link = ['AccountLogin', {}];
                    this.router.navigate(link);
                };
                AccountRecover = __decorate([
                    core_1.Component({
                        selector: 'recover',
                        templateUrl: 'app/account/recover/index.html',
                        styleUrls: ['app/account/style.css']
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, http_1.Http, common_1.FormBuilder, ng2_toastr_1.ToastsManager])
                ], AccountRecover);
                return AccountRecover;
            }(restController_1.RestController));
            exports_1("AccountRecover", AccountRecover);
            AccountRecoverPassword = (function (_super) {
                __extends(AccountRecoverPassword, _super);
                function AccountRecoverPassword(params, router, http, _formBuilder, toastr) {
                    _super.call(this, http, toastr);
                    this.params = params;
                    this.router = router;
                    this.http = http;
                    this._formBuilder = _formBuilder;
                    this.toastr = toastr;
                    this.setEndpoint('/users/' + params.get('id') + "?access_token=" + params.get('token'));
                    this.initForm();
                }
                AccountRecoverPassword.prototype.initForm = function () {
                    this.password = new common_1.Control("", common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(4)]));
                    this.form = this._formBuilder.group({
                        password: this.password,
                    });
                };
                AccountRecoverPassword.prototype.recoverPassword = function (event) {
                    var _this = this;
                    event.preventDefault();
                    var body = JSON.stringify({ 'password': this.password.value });
                    var successCallback = function (response) {
                        _this.toastr.success('Contraseña Actualizada', 'Solicitud Procesada.');
                        var link = ['AccountLogin', {}];
                        _this.router.navigate(link);
                    };
                    this.httputils.doPut(this.endpoint, body, successCallback, this.error);
                };
                AccountRecoverPassword.prototype.onLogin = function (event) {
                    event.preventDefault();
                    var link = ['AccountLogin', {}];
                    this.router.navigate(link);
                };
                AccountRecoverPassword = __decorate([
                    core_1.Component({
                        selector: 'recoverPassword',
                        templateUrl: 'app/account/recoverPassword/index.html',
                        styleUrls: ['app/account/style.css']
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.RouteParams, router_deprecated_1.Router, http_1.Http, common_1.FormBuilder, ng2_toastr_1.ToastsManager])
                ], AccountRecoverPassword);
                return AccountRecoverPassword;
            }(restController_1.RestController));
            exports_1("AccountRecoverPassword", AccountRecoverPassword);
        }
    }
});
//# sourceMappingURL=account.js.map