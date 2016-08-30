System.register(["@angular/core", "@angular/http", "ng2-toastr/ng2-toastr", "../common/globalService", "../utils/tables/tables", "../utils/save/save", "ng2-translate/ng2-translate", "../common/basic-configuration"], function(exports_1, context_1) {
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
    var core_1, http_1, ng2_toastr_1, globalService_1, tables_1, save_1, ng2_translate_1, basic_configuration_1;
    var Location_product;
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
            function (save_1_1) {
                save_1 = save_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            },
            function (basic_configuration_1_1) {
                basic_configuration_1 = basic_configuration_1_1;
            }],
        execute: function() {
            Location_product = (function (_super) {
                __extends(Location_product, _super);
                function Location_product(http, toastr, myglobal, translate) {
                    _super.call(this, "LO", "/ubicaciones/", http, toastr, myglobal, translate);
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.translate = translate;
                    this.paramsTable = {};
                }
                Location_product.prototype.initRules = function () {
                    var tempRules = this.rules;
                    this.rules = {};
                    this.rules["code"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'required': true,
                        'maxLength': 5,
                        'icon': 'fa fa-barcode',
                        "type": "text",
                        "key": "code",
                        "title": "Código",
                        "placeholder": "ingrese la ubicacion",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                                'maxlength': 'Maximo numero de caracteres 5'
                            },
                        },
                    };
                    this.rules["title"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-barcode',
                        "type": "text",
                        "key": "title",
                        "title": "Titulo",
                        "placeholder": "ingrese el titulo de ubicacion",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        },
                    };
                    this.rules["columna"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'required': true,
                        'maxLength': 5,
                        'icon': 'fa fa-barcode',
                        "type": "text",
                        "key": "columna",
                        "title": "Columna",
                        "placeholder": "ingrese columna",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                                'maxlength': 'Maximo numero de caracteres 5'
                            },
                        },
                    };
                    this.rules["fila"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'required': true,
                        'maxLength': 5,
                        'icon': 'fa fa-barcode',
                        "type": "text",
                        "key": "fila",
                        "title": "Fila",
                        "placeholder": "ingrese la fila",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                                'maxlength': 'Maximo numero de caracteres 5'
                            },
                        },
                    };
                    this.rules["maximo"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "number",
                        "key": "maximo",
                        "title": "Maximo",
                        "placeholder": "Maximo",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                            },
                        },
                    };
                    this.rules["minimo"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "number",
                        "key": "minimo",
                        "title": "Minimo",
                        "placeholder": "Minimo",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                            },
                        },
                    };
                    this.rules["id"] = {
                        "update": this.permissions['update'],
                        "visible": false,
                        'required': true,
                        'icon': 'fa fa-barcode',
                        "type": "text",
                        "key": "id",
                        "title": "Id",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        },
                    };
                };
                Location_product.prototype.initParamsTable = function () {
                    this.paramsTable.endpoint = this.endpoint;
                    this.paramsTable.actions = {};
                    this.paramsTable.actions.delete = {
                        "icon": "fa fa-trash",
                        "exp": "",
                        'title': 'Eliminar',
                        'permission': '1',
                        'message': 'Esta seguro de eliminar la ubicacion con el codigo',
                        'keyAction': 'code'
                    };
                    this.paramsTable.actions.print = {
                        "icon": "fa fa-print",
                        "exp": "",
                        'title': 'Imprimir',
                        'permission': '1',
                        'element': ''
                    };
                };
                Location_product.prototype.initRuleObject = function () {
                    this.ruleObject = {
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "ubicacion",
                        "title": "Ubicacion",
                        'object': true,
                        "placeholder": "Ingrese la Ubicacion",
                        'paramsSearch': this.paramsSearch,
                        'msg': {
                            'errors': {
                                'object': 'El tipo no esta registrado',
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                };
                Location_product.prototype.initSaveRules = function () {
                    this.paramsSave = {
                        title: "Agregar Ubicacion",
                        idModal: "searchLocation",
                        endpoint: this.endpoint,
                    };
                    this.rulesSave = this.rules;
                    delete this.rulesSave['id'];
                };
                Location_product.prototype.initOptions = function () {
                    this.viewOptions["title"] = 'Ubicacion';
                    this.viewOptions["button"].push({
                        'title': 'Agregar',
                        'class': 'btn btn-primary',
                        'icon': 'fa fa-plus',
                        'modal': this.paramsSave.idModal
                    });
                };
                Location_product.prototype.initSearch = function () {
                    this.paramsSearch['title'] = "Ubicacion";
                    this.paramsSearch['idModal'] = "searchlocation";
                    this.paramsSearch['placeholder'] = "Ingrese el ubicacion";
                };
                Location_product.prototype.ngOnInit = function () {
                    this.initRules();
                    this.initParamsTable();
                    this.initSaveRules();
                    this.initOptions();
                    this.initSearch();
                    this.loadData();
                };
                Location_product.prototype.externalRules = function () {
                    this.initRules();
                    this.initSearch();
                    this.initRuleObject();
                    this.initSaveRules();
                };
                Location_product.prototype.asignData = function (data) {
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
                ], Location_product.prototype, "tables", void 0);
                Location_product = __decorate([
                    core_1.Component({
                        selector: 'location_product',
                        templateUrl: 'app/location/index.html',
                        styleUrls: ['app/location/style.css'],
                        pipes: [ng2_translate_1.TranslatePipe],
                        directives: [tables_1.Tables, save_1.Save]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager, globalService_1.globalService, ng2_translate_1.TranslateService])
                ], Location_product);
                return Location_product;
            }(basic_configuration_1.BasicConfiguration));
            exports_1("Location_product", Location_product);
        }
    }
});
//# sourceMappingURL=location.js.map