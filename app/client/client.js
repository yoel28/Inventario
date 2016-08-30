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
    var Client;
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
            Client = (function (_super) {
                __extends(Client, _super);
                function Client(http, toastr, myglobal, translate) {
                    _super.call(this, "CI", "/clientes/", http, toastr, myglobal, translate);
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.translate = translate;
                    this.ruleObject = {};
                    this.paramsTable = {};
                    this.paramsSearch = {};
                    this.paramsSave = {};
                    this.rulesSave = {};
                }
                Client.prototype.initRules = function () {
                    var tempRules = {};
                    tempRules["code"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "code",
                        "title": "Codigo",
                        "placeholder": "ingrese el codigo",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                    tempRules["direccion"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "direccion",
                        "title": "Dirección",
                        "placeholder": "Ingrese la dirección",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                    tempRules["title"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "title",
                        "title": "Empresa",
                        "placeholder": "ingrese el nombre de la empresa",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                    tempRules["ruc"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "ruc",
                        "title": "Ruc",
                        "placeholder": "ingrese el ruc",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                    Object.assign(this.rules, tempRules, this.rules);
                };
                Client.prototype.initParamsTable = function () {
                    this.paramsTable.endpoint = this.endpoint;
                    this.paramsTable.actions = {};
                    this.paramsTable.actions.delete = {
                        "icon": "fa fa-trash",
                        "exp": "",
                        'title': 'Eliminar',
                        'permission': '1',
                        'message': '¿ Esta seguro de eliminar el cliente con el codigo: ',
                        'keyAction': 'code'
                    };
                };
                Client.prototype.initSaveRules = function () {
                    this.paramsSave = {
                        title: "Agregar cliente",
                        idModal: "saveClient",
                        endpoint: this.endpoint,
                    };
                    this.rulesSave = Object.create(this.rules);
                    delete this.rulesSave['enabled'];
                };
                Client.prototype.initOptions = function () {
                    this.viewOptions["title"] = 'Clientes';
                    this.viewOptions["button"].push({
                        'title': 'Agregar',
                        'class': 'btn btn-primary',
                        'icon': 'fa fa-plus',
                        'modal': this.paramsSave.idModal
                    });
                };
                Client.prototype.initSearch = function () {
                    this.paramsSearch['title'] = "Clientes";
                    this.paramsSearch['idModal'] = "searchClientes";
                    this.paramsSearch['placeholder'] = "Ingrese el cliente";
                };
                Client.prototype.ngOnInit = function () {
                    this.initRules();
                    this.initParamsTable();
                    this.initSaveRules();
                    this.initOptions();
                    this.initSearch();
                    this.loadData();
                };
                Client.prototype.externalRules = function () {
                    this.initRules();
                    this.initSearch();
                    this.initRuleObject();
                    this.initSaveRules();
                };
                Client.prototype.initRuleObject = function () {
                    this.ruleObject = {
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "cliente",
                        "title": "cliente",
                        'object': true,
                        "placeholder": "Ingrese el cliente",
                        'paramsSearch': this.paramsSearch,
                        'permissions': this.permissions,
                        'msg': {
                            'errors': {
                                'object': 'El tipo no esta registrado',
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                };
                Client.prototype.asignData = function (data) {
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
                ], Client.prototype, "tables", void 0);
                Client = __decorate([
                    core_1.Component({
                        selector: 'client',
                        templateUrl: 'app/typeProduct/index.html',
                        styleUrls: ['app/typeProduct/style.css'],
                        directives: [tables_1.Tables, save_1.Save],
                        pipes: [ng2_translate_1.TranslatePipe],
                        providers: [ng2_translate_1.TranslateService]
                    }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager, globalService_1.globalService, ng2_translate_1.TranslateService])
                ], Client);
                return Client;
            }(basic_configuration_1.BasicConfiguration));
            exports_1("Client", Client);
        }
    }
});
//# sourceMappingURL=client.js.map