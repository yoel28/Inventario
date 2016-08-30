System.register(["@angular/core", "@angular/common", "../../common/restController", "@angular/http", "ng2-toastr/ng2-toastr", "../../common/globalService", "../../common/xeditable"], function(exports_1, context_1) {
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
    var core_1, common_1, restController_1, http_1, ng2_toastr_1, globalService_1, xeditable_1;
    var Save;
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
            }],
        execute: function() {
            Save = (function (_super) {
                __extends(Save, _super);
                function Save(_formBuilder, http, toastr, myglobal) {
                    _super.call(this, http, toastr);
                    this._formBuilder = _formBuilder;
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.params = {};
                    this.rules = {};
                    this.data = [];
                    this.keys = {};
                    this.findControl = "";
                    this.search = {};
                    this.searchId = {};
                    this.save = new core_1.EventEmitter();
                }
                Save.prototype.ngOnInit = function () {
                    this.initForm();
                };
                Save.prototype.initForm = function () {
                    var _this = this;
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
                                    return { object: { valid: false } };
                                }
                                return null;
                            });
                        }
                        if (that.rules[key].type == 'email') {
                            validators.push(function (c) {
                                var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
                                return EMAIL_REGEXP.test(c.value) ? null : { email: { valid: false } };
                            });
                        }
                        that.data[key] = new common_1.Control("", common_1.Validators.compose(validators));
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
                                        delete that.searchId[key];
                                        that.loadData();
                                    }
                                    else {
                                        _this.findControl = "";
                                        that.search = [];
                                    }
                                }
                            });
                        }
                    });
                    this.form = this._formBuilder.group(this.data);
                };
                Save.prototype.submitForm = function (event) {
                    event.preventDefault();
                    var that = this;
                    var successCallback = function (response) {
                        that.resetForm();
                        that.save.emit(response.json());
                        that.toastr.success('Guardado con éxito', 'Notificación');
                    };
                    this.setEndpoint(this.params.endpoint);
                    var body = this.form.value;
                    Object.keys(body).forEach(function (key) {
                        if (that.rules[key].object) {
                            body[key] = that.searchId[key] ? (that.searchId[key].id || null) : null;
                        }
                        if (that.rules[key].type == 'number' && body[key] != "") {
                            body[key] = parseFloat(body[key]);
                        }
                    });
                    this.httputils.doPost(this.endpoint, JSON.stringify(body), successCallback, this.error);
                };
                Save.prototype.getLoadSearch = function (event, data) {
                    event.preventDefault();
                    this.findControl = "";
                    this.search = data;
                    this.getSearch(event, "");
                };
                Save.prototype.getSearch = function (event, value) {
                    event.preventDefault();
                    this.setEndpoint(this.search.paramsSearch.endpoint + value);
                    this.loadData();
                };
                Save.prototype.searchQuit = function (event) {
                    event.preventDefault();
                    this.search = {};
                    this.dataList = {};
                };
                Save.prototype.getDataSearch = function (data) {
                    this.searchId[this.search.key] = { 'id': data.id, 'title': data.title, 'detail': data.detail };
                    this.form.controls[this.search.key].updateValue(data.detail);
                    this.dataList = [];
                };
                Save.prototype.setValueSelect = function (data, key) {
                    this.form.controls[key].updateValue(data);
                };
                Save.prototype.resetForm = function () {
                    var that = this;
                    this.search = {};
                    this.searchId = {};
                    Object.keys(this.data).forEach(function (key) {
                        that.data[key].updateValue(null);
                        that.data[key].setErrors(null);
                        that.data[key]._pristine = true;
                        if (that.rules[key].readOnly)
                            that.rules[key].readOnly = false;
                    });
                };
                Save.prototype.getKeys = function (data) {
                    return Object.keys(data);
                };
                Save.prototype.changeImage = function (data, key) {
                    this.form.controls[key].updateValue(data);
                };
                Save = __decorate([
                    core_1.Component({
                        selector: 'save',
                        templateUrl: 'app/utils/save/index.html',
                        styleUrls: ['app/utils/save/style.css'],
                        inputs: ['params', 'rules'],
                        outputs: ['save'],
                        directives: [xeditable_1.Xcropit, xeditable_1.Xfile]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, http_1.Http, ng2_toastr_1.ToastsManager, globalService_1.globalService])
                ], Save);
                return Save;
            }(restController_1.RestController));
            exports_1("Save", Save);
        }
    }
});
//# sourceMappingURL=save.js.map