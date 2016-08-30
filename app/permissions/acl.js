System.register(["@angular/core", "@angular/http", "ng2-toastr/ng2-toastr", "../common/restController", "../common/globalService", 'ng2-translate/ng2-translate', "../common/xeditable"], function(exports_1, context_1) {
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
    var core_1, http_1, ng2_toastr_1, restController_1, globalService_1, ng2_translate_1, xeditable_1;
    var PermissionsAcl;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng2_toastr_1_1) {
                ng2_toastr_1 = ng2_toastr_1_1;
            },
            function (restController_1_1) {
                restController_1 = restController_1_1;
            },
            function (globalService_1_1) {
                globalService_1 = globalService_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            },
            function (xeditable_1_1) {
                xeditable_1 = xeditable_1_1;
            }],
        execute: function() {
            PermissionsAcl = (function (_super) {
                __extends(PermissionsAcl, _super);
                function PermissionsAcl(http, toastr, myglobal, translate) {
                    _super.call(this, http, toastr);
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.translate = translate;
                    this.viewOptions = {};
                    this.permissions = {};
                    this.permissionsAll = {};
                    this.rolesPermissionsAll = {};
                    this.itemsSelect = [];
                    this.role = {};
                }
                PermissionsAcl.prototype.ngOnInit = function () {
                    this.initLang();
                    this.initOptions();
                    this.initPermissions();
                    this.initPermissionsAll();
                    this.initRolesPermissionsAll();
                };
                PermissionsAcl.prototype.initLang = function () {
                    var userLang = navigator.language.split('-')[0];
                    userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
                    this.translate.setDefaultLang('en');
                    this.translate.use(userLang);
                };
                PermissionsAcl.prototype.initOptions = function () {
                    this.viewOptions["title"] = 'Lista de control de accesso';
                    this.viewOptions["errors"] = {};
                    this.viewOptions["errors"].notFound = "No se encontraron resultados";
                    this.viewOptions["errors"].listPermissions = "No tiene permisos para listar esta pagina";
                    this.viewOptions["errors"].listRoles = "No tiene permisos para listar los roles";
                };
                PermissionsAcl.prototype.initPermissions = function () {
                    this.permissions['listPermissions'] = this.myglobal.existsPermission('1');
                    this.permissions['listRoles'] = this.myglobal.existsPermission('1');
                    this.permissions['list'] = this.myglobal.existsPermission('1');
                    this.permissions['update'] = this.myglobal.existsPermission('1');
                    this.permissions['delete'] = this.myglobal.existsPermission('1');
                    this.permissions['create'] = this.myglobal.existsPermission('1');
                };
                PermissionsAcl.prototype.initPermissionsAll = function () {
                    if (this.permissions['listPermissions']) {
                        var that_1 = this;
                        var successCallback = function (response) {
                            var data = response.json();
                            if (data) {
                                Object.assign(that_1.permissionsAll, that_1.formatAcl(data.list));
                            }
                        };
                        this.httputils.doGet("/permissions/?max=1000", successCallback, this.error);
                    }
                };
                PermissionsAcl.prototype.initRolesPermissionsAll = function () {
                    var _this = this;
                    if (this.permissions['listRoles']) {
                        var successCallback = function (response) {
                            Object.assign(_this.rolesPermissionsAll, response.json());
                            _this.itemsSelect = [];
                            _this.rolesPermissionsAll.list.forEach(function (obj) {
                                _this.itemsSelect.push({ id: obj.id, text: obj.authority });
                            });
                        };
                        this.httputils.doGet('/roles/', successCallback, this.error);
                    }
                };
                PermissionsAcl.prototype.setRole = function (id) {
                    if (id) {
                        if (this.role.id != id) {
                            var index = this.rolesPermissionsAll.list.findIndex(function (obj) { return obj.id == id; });
                            if (index > -1)
                                Object.assign(this.role, this.rolesPermissionsAll.list[index]);
                        }
                    }
                };
                PermissionsAcl.prototype.existsPermission = function (id) {
                    var index = this.role.permissions.findIndex(function (obj) { return obj.id == id; });
                    if (index > -1)
                        return true;
                    return false;
                };
                PermissionsAcl.prototype.assignPermission = function (id) {
                    var index = this.role.permissions.findIndex(function (obj) { return obj.id == id; });
                    if (index > -1)
                        this.role.permissions.splice(index, 1);
                    else
                        this.role.permissions.push({ 'id': id });
                };
                PermissionsAcl.prototype.selectPermission = function (selectAll) {
                    var _this = this;
                    this.role.permissions = [];
                    if (selectAll) {
                        Object.keys(this.permissionsAll).forEach(function (key) {
                            _this.permissionsAll[key].forEach(function (obj) {
                                _this.role.permissions.push({ 'id': obj.id });
                            });
                        });
                    }
                };
                PermissionsAcl.prototype.savePermissions = function () {
                    var _this = this;
                    var permissions = [];
                    this.role.permissions.forEach(function (obj) {
                        permissions.push(obj.id);
                    });
                    var body = JSON.stringify({ 'permissions': permissions });
                    var successCallback = function (response) {
                        var index = _this.rolesPermissionsAll.list.findIndex(function (obj) { return obj.id == _this.role.id; });
                        _this.rolesPermissionsAll.list[index].permissions = _this.role.permissions;
                        _this.toastr.success('Guardado con éxito');
                    };
                    this.httputils.doPost('/role/' + this.role.id + '/permissions/', body, successCallback, this.error);
                };
                PermissionsAcl.prototype.formatAcl = function (value) {
                    var data = {};
                    value.forEach(function (obj) {
                        var modulo = obj.module;
                        data[modulo] = [];
                        value.forEach(function (obj1, index) {
                            if (obj1.module == modulo) {
                                data[modulo].push(obj1);
                                delete value[index];
                            }
                        });
                    });
                    return data;
                };
                PermissionsAcl.prototype.getKeys = function (data) {
                    return Object.keys(data);
                };
                PermissionsAcl = __decorate([
                    core_1.Component({
                        selector: 'permissions-acl',
                        templateUrl: 'app/permissions/acl.html',
                        styleUrls: ['app/permissions/style.css'],
                        pipes: [ng2_translate_1.TranslatePipe],
                        directives: [xeditable_1.SMDropdown],
                        providers: [ng2_translate_1.TranslateService]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager, globalService_1.globalService, ng2_translate_1.TranslateService])
                ], PermissionsAcl);
                return PermissionsAcl;
            }(restController_1.RestController));
            exports_1("PermissionsAcl", PermissionsAcl);
        }
    }
});
//# sourceMappingURL=acl.js.map