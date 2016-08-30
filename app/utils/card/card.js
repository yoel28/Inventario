System.register(["@angular/core", "../../common/restController", "@angular/http", "ng2-toastr/ng2-toastr", "../../common/globalService", "../../common/xeditable", "../search/search", "../filter/filter", "../save/save"], function(exports_1, context_1) {
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
    var core_1, restController_1, http_1, ng2_toastr_1, globalService_1, xeditable_1, search_1, filter_1, save_1;
    var Card;
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
            Card = (function (_super) {
                __extends(Card, _super);
                function Card(http, toastr, myglobal) {
                    _super.call(this, http, toastr);
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.params = {};
                    this.rules = {};
                    this.rulesSearch = {};
                    this.searchId = {};
                    this.keys = [];
                    this.dataSelect = {};
                    this.externalSave = {};
                    this.dataSave = {};
                    this.searchTable = {};
                    this.searchTableData = {};
                    this.dataSelectImage = {};
                    this.dataRoles = [];
                    this.roles = false;
                }
                Card.prototype.ngOnInit = function () {
                    this.setEndpoint(this.params.endpoint);
                };
                Card.prototype.keyVisible = function () {
                    var data = [];
                    var that = this;
                    Object.keys(this.rules).forEach(function (key) {
                        if (that.rules[key].visible)
                            data.push(key);
                    });
                    return data;
                };
                Card.prototype.loadSearchTable = function (key, data) {
                    this.searchTable = this.rulesSearch[key];
                    if (this.search) {
                        this.search.setNewModal();
                        this.search.params = this.searchTable;
                    }
                    this.searchTableData = data;
                };
                Card.prototype.loadSaveTable = function (column, data) {
                    this.dataSave.data = data;
                    this.dataSave.column = column;
                    this.dataSave.params = this.externalSave[column].paramsSave;
                    this.dataSave.rules = this.externalSave[column].rulesSave;
                    if (this.save) {
                        this.save.params = this.externalSave[column].paramsSave;
                        this.save.rules = this.externalSave[column].rulesSave;
                    }
                };
                Card.prototype.asignData = function (data) {
                    this.onPatch(this.dataSave.column, this.dataSave.data, data.id);
                };
                Card.prototype.getDataSearch = function (data) {
                    this.onPatch(this.searchTable.field, this.searchTableData, data);
                };
                Card.prototype.actionPermissionKey = function () {
                    var data = [];
                    var that = this;
                    Object.keys(this.params.actions).forEach(function (key) {
                        if (that.myglobal.existsPermission(that.params.actions[key].permission))
                            data.push(key);
                    });
                    return data;
                };
                Card.prototype.getKeys = function (data) {
                    return Object.keys(data);
                };
                Card.prototype.changeImage = function (newImage, id, key) {
                    this.dataSelectImage[id] = {};
                    this.dataSelectImage[id].image = newImage;
                    this.dataSelectImage[id].key = key;
                };
                Card.prototype.loadImage = function (event, data) {
                    event.preventDefault();
                    if (this.dataSelectImage[data.id])
                        this.onPatch(this.dataSelectImage[data.id].key, data, this.dataSelectImage[data.id].image);
                };
                Card.prototype.loadRoles = function () {
                    if (!this.roles) {
                        this.roles = true;
                        var that_1 = this;
                        var successCallback = function (response) {
                            Object.assign(that_1.dataRoles, response.json());
                            that_1.rules.roles['source'] = [];
                            that_1.dataRoles.list.forEach(function (obj) {
                                that_1.rules.roles.source.push({ 'value': obj.id, 'text': obj.authority });
                            });
                        };
                        this.httputils.doGet('/roles/', successCallback, this.error);
                    }
                };
                __decorate([
                    core_1.ViewChild(search_1.Search), 
                    __metadata('design:type', search_1.Search)
                ], Card.prototype, "search", void 0);
                __decorate([
                    core_1.ViewChild(save_1.Save), 
                    __metadata('design:type', save_1.Save)
                ], Card.prototype, "save", void 0);
                Card = __decorate([
                    core_1.Component({
                        selector: 'card',
                        templateUrl: 'app/utils/card/index.html',
                        styleUrls: ['app/utils/card/style.css'],
                        inputs: ['params', 'rules', 'rulesSearch', 'dataList', 'externalSave'],
                        directives: [xeditable_1.Xeditable, search_1.Search, filter_1.Filter, save_1.Save, xeditable_1.Xcropit, xeditable_1.Xfile]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager, globalService_1.globalService])
                ], Card);
                return Card;
            }(restController_1.RestController));
            exports_1("Card", Card);
        }
    }
});
//# sourceMappingURL=card.js.map