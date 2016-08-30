System.register(['@angular/core', "@angular/common", "../../common/xeditable", "../../common/restController", "@angular/http", "ng2-toastr/ng2-toastr", "../../common/globalService"], function(exports_1, context_1) {
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
    var core_1, common_1, xeditable_1, restController_1, http_1, ng2_toastr_1, globalService_1;
    var Filter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (xeditable_1_1) {
                xeditable_1 = xeditable_1_1;
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
            Filter = (function (_super) {
                __extends(Filter, _super);
                function Filter(_formBuilder, http, toastr, myglobal) {
                    _super.call(this, http, toastr);
                    this._formBuilder = _formBuilder;
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.rules = {};
                    this.params = {
                        title: "sin titulo",
                        idModal: "nomodal",
                        endpoint: "sin endpoint",
                        placeholder: "sin placeholder"
                    };
                    this.search = {};
                    this.cond = {
                        'text': [
                            { 'id': 'eq', 'text': 'Igual que' },
                            { 'id': 'ne', 'text': 'Diferente que' },
                            { 'id': '%like%', 'text': 'Contiene' },
                            { 'id': 'like%', 'text': 'Comienza con' },
                            { 'id': '%like', 'text': 'Termina en' },
                            { 'id': '%ilike%', 'text': 'Contiene(i)' },
                            { 'id': 'ilike%', 'text': 'Comienza con(i)' },
                            { 'id': '%ilike', 'text': 'Termina en(i)' }
                        ],
                        'textarea': [
                            { 'id': 'eq', 'text': 'Igual que' },
                            { 'id': 'ne', 'text': 'Diferente que' },
                            { 'id': '%like%', 'text': 'Contiene' },
                            { 'id': 'like%', 'text': 'Comienza con' },
                            { 'id': '%like', 'text': 'Termina en' },
                            { 'id': '%ilike%', 'text': 'Contiene(i)' },
                            { 'id': 'ilike%', 'text': 'Comienza con(i)' },
                            { 'id': '%ilike', 'text': 'Termina en(i)' }
                        ],
                        'number': [
                            { 'id': 'eq', 'text': 'Igual que' },
                            { 'id': 'ne', 'text': 'Diferente que' },
                            { 'id': 'ge', 'text': 'Mayor Igual' },
                            { 'id': 'gt', 'text': 'Mayor que' },
                            { 'id': 'le', 'text': 'Menor Igual' },
                            { 'id': 'lt', 'text': 'Menor que' },
                        ],
                        'object': [
                            { 'id': 'eq', 'text': 'Igual que' },
                            { 'id': 'ne', 'text': 'Diferente que' },
                        ],
                        'date': [
                            { 'id': 'eq', 'text': 'Igual que' },
                            { 'id': 'ne', 'text': 'Diferente que' },
                            { 'id': 'ge', 'text': 'Mayor Igual' },
                            { 'id': 'gt', 'text': 'Mayor que' },
                            { 'id': 'le', 'text': 'Menor Igual' },
                            { 'id': 'lt', 'text': 'Menor que' },
                        ],
                        'email': [
                            { 'id': 'eq', 'text': 'Igual que' },
                            { 'id': 'ne', 'text': 'Diferente que' },
                            { 'id': '%like%', 'text': 'Contiene' },
                            { 'id': 'like%', 'text': 'Comienza con' },
                            { 'id': '%like', 'text': 'Termina en' },
                            { 'id': '%ilike%', 'text': 'Contiene(i)' },
                            { 'id': 'ilike%', 'text': 'Comienza con(i)' },
                            { 'id': '%ilike', 'text': 'Termina en(i)' }
                        ],
                        'select': [
                            { 'id': 'eq', 'text': 'Igual que' },
                            { 'id': 'ne', 'text': 'Diferente que' },
                        ],
                    };
                    this.searchId = {};
                    this.findControl = "";
                    this.data = [];
                    this.keys = {};
                    this.whereFilter = new core_1.EventEmitter();
                }
                Filter.prototype.ngOnInit = function () {
                    this.loadForm();
                };
                Filter.prototype.loadForm = function () {
                    var _this = this;
                    var that = this;
                    Object.keys(this.rules).forEach(function (key) {
                        if (that.rules[key].search) {
                            that.data[key] = [];
                            that.data[key] = new common_1.Control("");
                            that.data[key + 'Cond'] = [];
                            that.data[key + 'Cond'] = new common_1.Control("eq");
                            if (that.rules[key].object) {
                                that.data[key].valueChanges.subscribe(function (value) {
                                    if (value && value.length > 0) {
                                        that.search = that.rules[key];
                                        that.findControl = value;
                                        that.dataList = [];
                                        that.setEndpoint(that.rules[key].paramsSearch.endpoint + value);
                                        if (!that.searchId[key]) {
                                            that.loadData();
                                        }
                                        else if (that.searchId[key].detail != value) {
                                            that.loadData();
                                            delete that.searchId[key];
                                        }
                                        else {
                                            _this.findControl = "";
                                            that.search = [];
                                        }
                                    }
                                    else {
                                        that.findControl = "";
                                        if (that.searchId[key])
                                            delete that.searchId[key];
                                    }
                                });
                            }
                        }
                    });
                    this.form = this._formBuilder.group(this.data);
                    this.keys = Object.keys(this.rules);
                };
                Filter.prototype.getLoadSearch = function (event, data) {
                    event.preventDefault();
                    this.findControl = "";
                    this.search = data;
                };
                Filter.prototype.getSearch = function (event, value) {
                    event.preventDefault();
                    this.setEndpoint(this.search.paramsSearch.endpoint + value);
                    this.loadData();
                };
                Filter.prototype.searchQuit = function (event) {
                    event.preventDefault();
                    this.search = {};
                    this.dataList = {};
                };
                Filter.prototype.getDataSearch = function (data) {
                    this.searchId[this.search.key] = { 'id': data.id, 'title': data.title, 'detail': data.detail };
                    this.form.controls[this.search.key].updateValue(data.detail);
                    this.dataList = [];
                };
                Filter.prototype.submitForm = function (event) {
                    var _this = this;
                    event.preventDefault();
                    var dataWhere = "";
                    var that = this;
                    Object.keys(this.rules).forEach(function (key) {
                        if (_this.form.value[key] && _this.form.value[key] != "") {
                            var value = "";
                            var op = "";
                            value = that.form.value[key];
                            op = that.form.value[key + 'Cond'];
                            if (op.substr(0, 1) == "%") {
                                op = op.substr(1);
                                value = "%" + value;
                            }
                            if (op.substr(-1) == "%") {
                                op = op.slice(0, -1);
                                value = value + "%";
                            }
                            if (that.rules[key].type != 'number')
                                value = "'" + value + "'";
                            if (that.rules[key].double)
                                value = value + "d";
                            if (that.rules[key].object) {
                                value = _this.searchId[key].id || null;
                                key = that.rules[key].paramsSearch.field;
                            }
                            dataWhere += "['op':'" + op + "','field':'" + key + "','value':" + value + "],";
                        }
                    });
                    var where = encodeURI("[" + dataWhere.slice(0, -1) + "]");
                    dataWhere = "&where=" + where;
                    this.whereFilter.emit(dataWhere);
                };
                Filter.prototype.onReset = function (event) {
                    var _this = this;
                    event.preventDefault();
                    this.keys.forEach(function (key) {
                        if (_this.form.controls[key]) {
                            _this.form.controls[key].updateValue("");
                            _this.form.controls[key].setErrors(null);
                            _this.form.controls[key + 'Cond'].updateValue("eq");
                        }
                    });
                    this.whereFilter.emit("");
                };
                Filter.prototype.setCondicion = function (cond, id) {
                    this.form.controls[id + 'Cond'].updateValue(cond);
                };
                Filter.prototype.searchLength = function () {
                    if (this.searchId)
                        return Object.keys(this.searchId).length;
                    return 0;
                };
                Filter.prototype.searchIdKeys = function () {
                    return Object.keys(this.searchId);
                };
                Filter = __decorate([
                    core_1.Component({
                        selector: 'filter',
                        templateUrl: 'app/utils/filter/index.html',
                        styleUrls: ['app/utils/filter/style.css'],
                        directives: [xeditable_1.SMDropdown],
                        inputs: ['rules', 'params'],
                        outputs: ['whereFilter'],
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, http_1.Http, ng2_toastr_1.ToastsManager, globalService_1.globalService])
                ], Filter);
                return Filter;
            }(restController_1.RestController));
            exports_1("Filter", Filter);
        }
    }
});
//# sourceMappingURL=filter.js.map