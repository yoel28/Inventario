System.register(["@angular/core", "@angular/http", "ng2-toastr/ng2-toastr", "../common/globalService", "../utils/tables/tables", 'ng2-translate/ng2-translate', "../common/basic-configuration", "../common/xeditable", "@angular/common"], function(exports_1, context_1) {
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
    var core_1, http_1, ng2_toastr_1, globalService_1, tables_1, ng2_translate_1, basic_configuration_1, xeditable_1, common_1;
    var ProductAvailable;
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
            function (basic_configuration_1_1) {
                basic_configuration_1 = basic_configuration_1_1;
            },
            function (xeditable_1_1) {
                xeditable_1 = xeditable_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            ProductAvailable = (function (_super) {
                __extends(ProductAvailable, _super);
                function ProductAvailable(http, toastr, myglobal, translate, _formBuilder) {
                    _super.call(this, "PO_AV", "/inventario/historico/cantidad/", http, toastr, myglobal, translate);
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.translate = translate;
                    this._formBuilder = _formBuilder;
                    this.date = {};
                    this.paramsTable = {};
                    this.formatDateFact = {};
                    this.itemsFecha = [];
                }
                ProductAvailable.prototype.initDates = function () {
                    this.formatDateFact = {
                        format: "dd/mm/yyyy",
                        startView: 2,
                        minViewMode: 0,
                        maxViewMode: 2,
                        language: "es",
                        forceParse: false,
                        autoclose: true,
                        todayBtn: "linked",
                        todayHighlight: true,
                    };
                    this.itemsFecha = [
                        { 'id': '1', 'text': 'Hoy' },
                        { 'id': '2', 'text': 'Semana actual' },
                        { 'id': '3', 'text': 'Mes actual' },
                        { 'id': '4', 'text': 'Mes anterior' },
                        { 'id': '5', 'text': 'Últimos 3 meses' },
                        { 'id': '6', 'text': 'Año actual' },
                    ];
                };
                ProductAvailable.prototype.initForm = function () {
                    this.dateStart = new common_1.Control("", common_1.Validators.compose([common_1.Validators.required]));
                    this.dateEnd = new common_1.Control("");
                    this.form = this._formBuilder.group({
                        dateStart: this.dateStart,
                        dateEnd: this.dateEnd,
                    });
                };
                ProductAvailable.prototype.initOptions = function () {
                    this.viewOptions["title"] = 'Inventario';
                };
                ProductAvailable.prototype.initRules = function () {
                    this.rules = {};
                    this.rules["code"] = {
                        "update": false,
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
                    this.rules["productoDetail"] = {
                        "update": false,
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "productoDetail",
                        "title": "Detalle",
                        "placeholder": "Ingrese la cantidad",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                    this.rules["cantidad"] = {
                        "update": false,
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "cantidad",
                        "title": "cantidad",
                        "placeholder": "Ingrese la cantidad",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                    this.rules["modelo"] = {
                        "update": false,
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "modelo",
                        "title": "modelo",
                        "placeholder": "Ingrese la cantidad",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                    this.rules["tipoProducto"] = {
                        "update": false,
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "tipoProducto",
                        "title": "tipo producto",
                        "placeholder": "Ingrese la cantidad",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                    this.rules["tipoOperacion"] = {
                        "update": false,
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "tipoOperacion",
                        "title": "tipo operacion",
                        "placeholder": "Ingrese la cantidad",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                    this.rules["day"] = {
                        "update": false,
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "day",
                        "title": "Dia",
                        "placeholder": "Ingrese el dia",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                    this.rules["month"] = {
                        "update": false,
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "month",
                        "title": "Meses",
                        "placeholder": "Ingrese el mes",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                    this.rules["year"] = {
                        "update": false,
                        "visible": true,
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "year",
                        "title": "Año",
                        "placeholder": "Ingrese la el año",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                };
                ProductAvailable.prototype.initSearch = function () {
                };
                ProductAvailable.prototype.initRuleObject = function () {
                };
                ProductAvailable.prototype.externalRules = function () {
                };
                ProductAvailable.prototype.initParamsTable = function () {
                    this.paramsTable['endpoint'] = this.endpoint;
                    this.paramsTable['actions'] = {};
                };
                ProductAvailable.prototype.ngOnInit = function () {
                    this.initDates();
                    this.initOptions();
                    this.initParamsTable();
                    this.initRules();
                    this.initForm();
                };
                ProductAvailable.prototype.loadFechaFac = function (data) {
                    if (data.key == "1")
                        this.dateStart.updateValue(data.date);
                    else
                        this.dateEnd.updateValue(data.date);
                };
                ProductAvailable.prototype.setFecha = function (id) {
                    var day = moment().format('lll');
                    var val;
                    this.setEndpoint("/inventario/historico/cantidad/");
                    this.rules['day'].visible = true;
                    this.rules['month'].visible = true;
                    this.rules['year'].visible = true;
                    if (id == 1) {
                        this.setEndpoint("/inventario/diario/cantidad/");
                        this.rules['day'].visible = false;
                        this.rules['month'].visible = false;
                        this.rules['year'].visible = false;
                    }
                    switch (id) {
                        case "1":
                            this.dateStart.updateValue(day);
                            break;
                        case "2":
                            this.dateStart.updateValue(moment(day).startOf('week'));
                            this.dateEnd.updateValue(day);
                            break;
                        case "3":
                            this.dateStart.updateValue(moment().startOf('month'));
                            this.dateEnd.updateValue(day);
                            break;
                        case "4":
                            this.dateStart.updateValue(moment().subtract(1, 'month').startOf('month'));
                            this.dateEnd.updateValue(moment().subtract(1, 'month').endOf('month'));
                            break;
                        case "5":
                            this.dateStart.updateValue(moment().subtract(3, 'month').startOf('month'));
                            this.dateEnd.updateValue(day);
                            break;
                        case "6":
                            this.dateStart.updateValue(moment().startOf('year'));
                            this.dateEnd.updateValue(day);
                            break;
                    }
                    if (id != '-1')
                        this.assignDate();
                };
                ProductAvailable.prototype.assignDate = function (event) {
                    if (event)
                        event.preventDefault();
                    this.where = "";
                    if (this.endpoint != "/inventario/diario/cantidad/") {
                        var start = moment(this.dateStart.value.toString()).format('DD-MM-YYYY').split("-");
                        var end = moment(this.dateEnd.value.toString()).format('DD-MM-YYYY').split("-");
                        var dateWhere = [];
                        dateWhere = [{ 'op': 'ge', 'field': 'fecha', 'type': 'long', 'value': start[2] + start[1] + start[0] }, { 'op': 'le', 'field': 'fecha', 'type': 'long', 'value': end[2] + end[1] + end[0] }];
                        this.where = "&where=" + encodeURI(JSON.stringify(dateWhere).split('{').join('[').split('}').join(']'));
                    }
                    this.loadData();
                };
                ProductAvailable = __decorate([
                    core_1.Component({
                        selector: 'products-available',
                        templateUrl: 'app/reports/productAvailable.html',
                        styleUrls: ['app/reports/style.css'],
                        directives: [tables_1.Tables, xeditable_1.Datepicker],
                        pipes: [ng2_translate_1.TranslatePipe],
                        providers: [ng2_translate_1.TranslateService]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager, globalService_1.globalService, ng2_translate_1.TranslateService, common_1.FormBuilder])
                ], ProductAvailable);
                return ProductAvailable;
            }(basic_configuration_1.BasicConfiguration));
            exports_1("ProductAvailable", ProductAvailable);
        }
    }
});
//# sourceMappingURL=productAvailable.js.map