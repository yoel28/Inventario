System.register(["@angular/core", "@angular/http", "ng2-toastr/ng2-toastr", "../common/globalService", "../utils/tables/tables", 'ng2-translate/ng2-translate', "../utils/save/save", "../common/basic-configuration"], function(exports_1, context_1) {
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
    var core_1, http_1, ng2_toastr_1, globalService_1, tables_1, ng2_translate_1, save_1, basic_configuration_1;
    var Permissions;
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
            function (globalService_1_1) {
                globalService_1 = globalService_1_1;
            },
            function (tables_1_1) {
                tables_1 = tables_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            },
            function (save_1_1) {
                save_1 = save_1_1;
            },
            function (basic_configuration_1_1) {
                basic_configuration_1 = basic_configuration_1_1;
            }],
        execute: function() {
            Permissions = (function (_super) {
                __extends(Permissions, _super);
                function Permissions(http, toastr, myglobal, translate) {
                    _super.call(this, "PE", "/permissions/", http, toastr, myglobal, translate);
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.translate = translate;
                    this.paramsTable = {};
                }
                Permissions.prototype.ngOnInit = function () {
                    this.initRules();
                    this.initOptions();
                    this.initSearch();
                    this.loadData();
                    this.initParamsTable();
                };
                Permissions.prototype.initParamsTable = function () {
                    this.paramsTable.endpoint = this.endpoint;
                    this.paramsTable.actions = {};
                    this.paramsTable.actions.delete = {
                        "icon": "fa fa-trash",
                        "exp": "",
                        'title': 'Eliminar',
                        'permission': this.permissions['delete'],
                        'message': 'Esta seguro de eliminar',
                        'keyAction': 'title'
                    };
                };
                Permissions.prototype.initOptions = function () {
                    this.viewOptions["title"] = 'Permisos';
                    this.viewOptions["button"].push({
                        'title': 'Agregar',
                        'class': 'btn btn-primary',
                        'icon': 'fa fa-plus',
                        'modal': this.paramsSave.idModal
                    });
                };
                Permissions.prototype.initRuleObject = function () {
                };
                Permissions.prototype.initRules = function () {
                    this.rules["code"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "code",
                        "title": "Código",
                        "placeholder": "Ingrese el código",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                    this.rules["module"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "module",
                        "title": "Modulo",
                        "placeholder": "Ingrese el modulo",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                    this.rules["title"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "title",
                        "title": "Titulo",
                        "placeholder": "Ingrese el titulo",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                            },
                        }
                    };
                    this.rules["controlador"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "controlador",
                        "title": "Controlador",
                        "placeholder": "ingrese el controlador",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                            },
                        },
                    };
                    this.rules["accion"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'icon': 'fa fa-barcode',
                        "type": "text",
                        "key": "accion",
                        "title": "Accion",
                        "placeholder": "ingrese la accion",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        },
                    };
                };
                Permissions.prototype.externalRules = function () {
                };
                Permissions.prototype.initSearch = function () {
                };
                Permissions.prototype.asignData = function (data) {
                    if (this.dataList.page && this.dataList.page.length > 1) {
                        this.dataList.list.pop();
                    }
                    this.dataList.list.unshift(data);
                    if (this.tables) {
                        Object.assign(this.tables.dataList, this.dataList);
                    }
                };
                __decorate([
                    core_1.ViewChild(tables_1.Tables), 
                    __metadata('design:type', tables_1.Tables)
                ], Permissions.prototype, "tables", void 0);
                Permissions = __decorate([
                    core_1.Component({
                        selector: 'permissions',
                        templateUrl: 'app/permissions/index.html',
                        styleUrls: ['app/permissions/style.css'],
                        directives: [tables_1.Tables, save_1.Save],
                        pipes: [ng2_translate_1.TranslatePipe],
                        providers: [ng2_translate_1.TranslateService]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager, globalService_1.globalService, ng2_translate_1.TranslateService])
                ], Permissions);
                return Permissions;
            }(basic_configuration_1.BasicConfiguration));
            exports_1("Permissions", Permissions);
        }
    }
});
//# sourceMappingURL=permissions.js.map