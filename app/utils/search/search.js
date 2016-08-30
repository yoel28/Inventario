System.register(['@angular/core', "@angular/common", '@angular/http', "../../common/restController"], function(exports_1, context_1) {
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
    var core_1, common_1, http_1, restController_1;
    var Search;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (restController_1_1) {
                restController_1 = restController_1_1;
            }],
        execute: function() {
            Search = (function (_super) {
                __extends(Search, _super);
                function Search(_formBuilder, http) {
                    _super.call(this, http);
                    this._formBuilder = _formBuilder;
                    this.http = http;
                    this.params = {};
                    this.setEndpoint(this.params.endpoint);
                    this.result = new core_1.EventEmitter();
                }
                Search.prototype.ngOnInit = function () {
                    this.initForm();
                };
                Search.prototype.initForm = function () {
                    this.valueInput = new common_1.Control("");
                    this.form = this._formBuilder.group({
                        valueInput: this.valueInput
                    });
                };
                Search.prototype.getSearch = function () {
                    this.endpoint = this.params.endpoint + this.valueInput.value;
                    this.loadData();
                };
                Search.prototype.loadData = function (offset) {
                    if (offset === void 0) { offset = 0; }
                    this.offset = offset;
                    if (this.params.where)
                        this.httputils.onLoadList(this.endpoint + "?max=" + this.max + "&offset=" + this.offset + this.params.where, this.dataList, this.max, this.error);
                    else
                        this.httputils.onLoadList(this.endpoint + "?max=" + this.max + "&offset=" + this.offset, this.dataList, this.max, this.error);
                };
                ;
                Search.prototype.getData = function (data) {
                    this.result.emit(data);
                };
                Search.prototype.setNewModal = function () {
                    this.dataList = {};
                    this.valueInput.updateValue("");
                };
                Search = __decorate([
                    core_1.Component({
                        selector: 'search',
                        templateUrl: 'app/utils/search/index.html',
                        styleUrls: ['app/utils/search/style.css'],
                        inputs: ['params'],
                        outputs: ['result'],
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, http_1.Http])
                ], Search);
                return Search;
            }(restController_1.RestController));
            exports_1("Search", Search);
        }
    }
});
//# sourceMappingURL=search.js.map