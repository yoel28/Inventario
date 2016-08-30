System.register(["@angular/core", "@angular/common", "../../common/restController", "@angular/http", "ng2-toastr/ng2-toastr", "../../common/globalService", "../../common/xeditable", "../search/search", "../filter/filter", "../save/save"], function(exports_1, context_1) {
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
    var core_1, common_1, restController_1, http_1, ng2_toastr_1, globalService_1, xeditable_1, search_1, filter_1, save_1;
    var Tables;
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
            },
            function (xeditable_1_1) {
                xeditable_1 = xeditable_1_1;
            },
            function (search_1_1) {
                search_1 = search_1_1;
            },
            function (filter_1_1) {
                filter_1 = filter_1_1;
            },
            function (save_1_1) {
                save_1 = save_1_1;
            }],
        execute: function() {
            Tables = (function (_super) {
                __extends(Tables, _super);
                function Tables(_formBuilder, http, toastr, myglobal) {
                    _super.call(this, http, toastr);
                    this._formBuilder = _formBuilder;
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.params = {};
                    this.rules = {};
                    this.rulesSearch = {};
                    this.searchId = {};
                    this.data = [];
                    this.keys = [];
                    this.dataDelete = {};
                    this.dataSelect = {};
                    this.externalSave = {};
                    this.dataSave = {};
                    this.keyActions = [];
                    this.rulesFilter = {};
                    this.searchTable = {};
                    this.searchTableData = {};
                    this.paramsFilter = {
                        title: "Filtrar roles",
                        idModal: "modalFilter",
                        endpoint: "",
                    };
                }
                Tables.prototype.ngOnInit = function () {
                    this.initForm();
                    this.keyActions = Object.keys(this.params.actions);
                    this.setEndpoint(this.params.endpoint);
                };
                Tables.prototype.initForm = function () {
                    var that = this;
                    this.keys = Object.keys(this.rules);
                    Object.keys(this.rules).forEach(function (key) {
                        that.data[key] = [];
                        var validators = [];
                        if (that.rules[key].required)
                            validators.push(common_1.Validators.required);
                        if (that.rules[key].maxLength)
                            validators.push(common_1.Validators.maxLength(that.rules[key].maxLength));
                        if (that.rules[key].minLength)
                            validators.push(common_1.Validators.minLength(that.rules[key].minLength));
                        if (that.rules[key].object) {
                            validators.push(function (c) {
                                if (c.value && c.value.length > 0) {
                                    if (that.searchId[key]) {
                                        if (that.searchId[key].detail == c.value)
                                            return null;
                                    }
                                    return { myobject: { valid: false } };
                                }
                                return null;
                            });
                        }
                        that.data[key] = new common_1.Control("", common_1.Validators.compose(validators));
                    });
                    this.form = this._formBuilder.group(this.data);
                };
                Tables.prototype.keyVisible = function () {
                    var data = [];
                    var that = this;
                    Object.keys(this.rules).forEach(function (key) {
                        if (that.rules[key].visible)
                            data.push(key);
                    });
                    return data;
                };
                Tables.prototype.loadSearchTable = function (key, data) {
                    this.searchTable = this.rulesSearch[key];
                    if (this.search) {
                        this.search.setNewModal();
                        this.search.params = this.searchTable;
                    }
                    this.searchTableData = data;
                };
                Tables.prototype.loadSaveTable = function (column, data) {
                    this.dataSave.data = data;
                    this.dataSave.column = column;
                    this.dataSave.params = this.externalSave[column].paramsSave;
                    this.dataSave.rules = this.externalSave[column].rulesSave;
                    if (this.save) {
                        this.save.params = this.externalSave[column].paramsSave;
                        this.save.rules = this.externalSave[column].rulesSave;
                    }
                };
                Tables.prototype.asignData = function (data) {
                    this.onPatch(this.dataSave.column, this.dataSave.data, data.id);
                };
                Tables.prototype.getDataSearch = function (data) {
                    this.onPatch(this.searchTable.field, this.searchTableData, data.id);
                };
                Tables.prototype.actionPermissionKey = function () {
                    var data = [];
                    var that = this;
                    Object.keys(this.params.actions).forEach(function (key) {
                        if (that.myglobal.existsPermission(that.params.actions[key].permission))
                            data.push(key);
                    });
                    return data;
                };
                Tables.prototype.getKeys = function (data) {
                    return Object.keys(data);
                };
                Tables.prototype.existFilter = function () {
                    var flag = false;
                    var that = this;
                    Object.keys(this.rulesFilter).forEach(function (key) {
                        if (that.rulesFilter[key].search && that.rulesFilter[key].search == true)
                            flag = true;
                    });
                    return flag;
                };
                Tables.prototype.loadWhere = function (where) {
                    this.where = where;
                    if (this.myglobal.existsPermission('1')) {
                        this.loadData();
                    }
                };
                __decorate([
                    core_1.ViewChild(search_1.Search), 
                    __metadata('design:type', search_1.Search)
                ], Tables.prototype, "search", void 0);
                __decorate([
                    core_1.ViewChild(save_1.Save), 
                    __metadata('design:type', save_1.Save)
                ], Tables.prototype, "save", void 0);
                Tables = __decorate([
                    core_1.Component({
                        selector: 'tables',
                        templateUrl: 'app/utils/tables/index.html',
                        styleUrls: ['app/utils/tables/style.css'],
                        inputs: ['params', 'rules', 'rulesSearch', 'dataList', 'externalSave', 'rulesFilter'],
                        directives: [xeditable_1.Xeditable, search_1.Search, filter_1.Filter, save_1.Save]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, http_1.Http, ng2_toastr_1.ToastsManager, globalService_1.globalService])
                ], Tables);
                return Tables;
            }(restController_1.RestController));
            exports_1("Tables", Tables);
        }
    }
});
//# sourceMappingURL=tables.js.map