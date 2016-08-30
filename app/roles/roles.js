System.register(["@angular/core", "@angular/http", "ng2-toastr/ng2-toastr", "../common/restController", "../common/globalService", "../utils/tables/tables", 'ng2-translate/ng2-translate', "../utils/save/save"], function(exports_1, context_1) {
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
    var core_1, http_1, ng2_toastr_1, restController_1, globalService_1, tables_1, ng2_translate_1, save_1;
    var Roles;
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
            function (tables_1_1) {
                tables_1 = tables_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            },
            function (save_1_1) {
                save_1 = save_1_1;
            }],
        execute: function() {
            Roles = (function (_super) {
                __extends(Roles, _super);
                function Roles(http, toastr, myglobal, translate) {
                    _super.call(this, http, toastr);
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.translate = translate;
                    this.rules = {};
                    this.viewOptions = {};
                    this.paramsTable = {};
                    this.paramsSave = {};
                    this.rulesSave = {};
                    this.paramsSearch = {};
                    this.rulesSearch = {};
                    this.setEndpoint("/roles/");
                }
                Roles.prototype.initLang = function () {
                    var userLang = navigator.language.split('-')[0];
                    userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
                    this.translate.setDefaultLang('en');
                    this.translate.use(userLang);
                };
                Roles.prototype.initParamsTable = function () {
                    this.paramsTable.endpoint = this.endpoint;
                    this.paramsTable.actions = {};
                    this.paramsTable.actions.delete = {
                        "icon": "fa fa-trash",
                        "exp": "",
                        'title': 'Eliminar',
                        'permission': '1',
                        'message': 'Esta seguro de eliminar',
                        'keyAction': 'authority'
                    };
                };
                Roles.prototype.initOptions = function () {
                    this.viewOptions["title"] = 'Roles';
                    this.viewOptions["permissions"] = { "list": true };
                    this.viewOptions["errors"] = {};
                    this.viewOptions["errors"].notFound = "no se encontraron resultados";
                    this.viewOptions["errors"].list = "no tiene permisos para ver los productos";
                    this.viewOptions["button"] = [];
                    this.viewOptions["button"].push({
                        'title': 'Agregar',
                        'class': 'btn btn-primary',
                        'icon': 'fa fa-plus',
                        'modal': this.paramsSave.idModal
                    });
                };
                Roles.prototype.initRules = function () {
                    var update = true;
                    this.rules["authority"] = {
                        "update": update,
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list-ul',
                        "type": "text",
                        "key": "authority",
                        "title": "Rol",
                        "placeholder": "ingrese el rol",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                            },
                        },
                    };
                    this.rules["detail"] = {
                        "update": update,
                        "visible": true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "detail",
                        "title": "Detalle",
                        "placeholder": "ingrese detalles del rol",
                        'msg': {
                            'errors': {},
                        }
                    };
                    this.rules["enabled"] = {
                        "update": update,
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "boolean",
                        'states': ["Habilitado", "Deshabilitado"],
                        'permissions': '1',
                        "key": "enabled",
                        "title": "Habilitado",
                        "placeholder": "",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                            },
                        }
                    };
                };
                Roles.prototype.initSave = function () {
                    this.paramsSave = {
                        title: "Agregar rol",
                        idModal: "saveRol",
                        endpoint: this.endpoint,
                    };
                    this.rulesSave["authority"] = this.rules["authority"];
                    this.rulesSave["detail"] = this.rules["detail"];
                };
                Roles.prototype.ngOnInit = function () {
                    this.initLang();
                    this.initRules();
                    this.initSave();
                    this.initOptions();
                    this.initParamsTable();
                    this.initSearch();
                    this.loadData();
                };
                Roles.prototype.asignData = function (data) {
                    if (this.dataList.page && this.dataList.page.length > 1) {
                        this.dataList.list.pop();
                    }
                    this.dataList.list.unshift(data);
                    if (this.tables) {
                        Object.assign(this.tables.dataList, this.dataList);
                    }
                };
                Roles.prototype.initSearch = function () {
                    this.paramsSearch = {
                        'permissions': '1',
                        'title': "Roles",
                        'idModal': "searchRol",
                        'endpoint': "/search/roles/",
                        'placeholder': "Ingrese el rol",
                        'label': { name: "Nombre: ", detail: "Detalle: " },
                        'msg': {
                            'errors': {
                                'noAuthorized': 'No posee permisos para esta accion',
                            },
                        },
                        'where': '',
                        'imageGuest': '/assets/img/truck-guest.png'
                    };
                };
                __decorate([
                    core_1.ViewChild(tables_1.Tables), 
                    __metadata('design:type', tables_1.Tables)
                ], Roles.prototype, "tables", void 0);
                Roles = __decorate([
                    core_1.Component({
                        selector: 'roles',
                        templateUrl: 'app/roles/index.html',
                        styleUrls: ['app/roles/style.css'],
                        directives: [tables_1.Tables, save_1.Save],
                        pipes: [ng2_translate_1.TranslatePipe],
                        providers: [ng2_translate_1.TranslateService]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager, globalService_1.globalService, ng2_translate_1.TranslateService])
                ], Roles);
                return Roles;
            }(restController_1.RestController));
            exports_1("Roles", Roles);
        }
    }
});
//# sourceMappingURL=roles.js.map