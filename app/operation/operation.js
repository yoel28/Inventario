System.register(["@angular/core", "@angular/common", "@angular/http", "ng2-toastr/ng2-toastr", "../common/restController", "../common/globalService", 'ng2-translate/ng2-translate', "../common/xeditable"], function(exports_1, context_1) {
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
    var core_1, common_1, http_1, ng2_toastr_1, restController_1, globalService_1, ng2_translate_1, xeditable_1;
    var Operation;
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
            function (ng2_toastr_1_1) {
                ng2_toastr_1 = ng2_toastr_1_1;
            },
            function (restController_1_1) {
                restController_1 = restController_1_1;
            },
            function (globalService_1_1) {
                globalService_1 = globalService_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            },
            function (xeditable_1_1) {
                xeditable_1 = xeditable_1_1;
            }],
        execute: function() {
            Operation = (function (_super) {
                __extends(Operation, _super);
                function Operation(http, toastr, myglobal, translate, formBuilder) {
                    _super.call(this, http, toastr);
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.translate = translate;
                    this.formBuilder = formBuilder;
                    this.positionForm = 1;
                    this.tipe_actions = {};
                    this.listClient = {};
                    this.lastLocaltion = {};
                    this.listAccion = [];
                    this.accionList = "";
                    this.form_operation = [];
                    this.listResult = {};
                    this.setEndpoint('/search/tipo/acciones');
                }
                Operation.prototype.onDelete = function () {
                    this.positionForm = 1;
                    this.lastLocaltion = {};
                    this.listAccion = [];
                    this.accionList = "";
                    this.user.updateValue(null);
                    this.tipoAccion.updateValue(null);
                    this.producto.updateValue(null);
                    this.ubicacion.updateValue(null);
                    this.listResult = {};
                    this.initSearchTypeActions();
                };
                Operation.prototype.inc = function (data, position) {
                    if (data === void 0) { data = null; }
                    if (position === void 0) { position = 0; }
                    var flag = true;
                    switch (this.positionForm) {
                        case 1:
                            if (!this.form_operation[0].valid) {
                                this.toastr.error("por favor selccione una accion y un cliente valido");
                                flag = false;
                            }
                            break;
                        case 2:
                            if (this.getValidateList().length == 0 && (data == 1 || position == 3)) {
                                this.toastr.warning("la lista de acciones valida es nula");
                                flag = false;
                            }
                            break;
                        case 4:
                            if (position != 0 && position != 1) {
                                this.toastr.warning("debe realizar una lista de acciones nueva");
                                flag = false;
                            }
                            break;
                        default:
                            this.toastr.warning("no abarcado");
                            break;
                    }
                    if (flag) {
                        if (data && this.positionForm != 4)
                            this.positionForm = data == 1 ? (this.positionForm + 1) : (this.positionForm - 1);
                        else if (data)
                            this.onDelete();
                        else
                            this.positionForm = position;
                    }
                };
                Operation.prototype.getResult = function (event) {
                    var _this = this;
                    event.preventDefault();
                    var that = this;
                    if (!this.producto.valid) {
                        this.toastr.error("por favor ingrese un codigo de barras");
                    }
                    else {
                        var successCallback = function (response) {
                            if (response.status == 200) {
                                if (that.lastLocaltion && that.lastLocaltion.id)
                                    that.listAccion.push({ "Producto": { "code": response.json().code, "id": response.json().id }, "Ubicacion": that.lastLocaltion, "Accion": that.accionList, "Status": true, "Validate": true, "Mensaje": "" });
                                else
                                    that.toastr.error("por favor ingrese una ubicacion primero");
                            }
                            else if (response.status == 202) {
                                that.toastr.success("Ubicacion cargada");
                                that.ubicacion.updateValue(response.json().id);
                                that.lastLocaltion.name = response.json().title;
                                that.lastLocaltion.id = response.json().id;
                            }
                            else if (response.status == 204) {
                                that.listAccion.push({ "Producto": { "code": that.producto.value }, "Ubicacion": "", "Accion": that.accionList, "Status": false, "Validate": false, "Mensaje": "El codigo ingresado no fue encontrado" });
                            }
                            _this.producto.updateValue(null);
                        };
                        this.httputils.doGet('/acciones/check/type/element/' + this.producto.value, successCallback, this.error);
                    }
                };
                Operation.prototype.setTipoAccion = function (value) {
                    this.tipoAccion.updateValue(null);
                    if (value != '-1') {
                        this.tipoAccion.updateValue(value);
                        var index = this.dataList.list.findIndex(function (obj) { return obj.id == value; });
                        this.accionList = this.dataList.list[index].title;
                    }
                };
                Operation.prototype.changeClients = function (value) {
                    this.user.updateValue(null);
                    if (value != '-1') {
                        this.user.updateValue(value);
                    }
                };
                Operation.prototype.initSearchClients = function () {
                    var that = this;
                    var successCallback = function (response) {
                        Object.assign(that.listClient, response.json());
                    };
                    this.httputils.doGet("/clientes/", successCallback, this.error);
                };
                Operation.prototype.initSearchTypeActions = function () {
                    this.max = 100;
                    this.loadData();
                };
                Operation.prototype.initForm = function () {
                    this.tipoAccion = new common_1.Control("", common_1.Validators.required);
                    this.user = new common_1.Control("", common_1.Validators.required);
                    this.form_operation.push(this.formBuilder.group({ user: this.user, tipoAccion: this.tipoAccion }));
                    this.producto = new common_1.Control("", common_1.Validators.required);
                    this.ubicacion = new common_1.Control("");
                    this.form_operation.push(this.formBuilder.group({ producto: this.producto }));
                };
                Operation.prototype.ngOnInit = function () {
                    this.initForm();
                    this.initSearchTypeActions();
                    this.initSearchClients();
                };
                Operation.prototype.getValidateList = function () {
                    var listAccionArray = [];
                    for (var _i = 0, _a = this.listAccion; _i < _a.length; _i++) {
                        var acctions = _a[_i];
                        if (acctions.Status)
                            listAccionArray.push(acctions);
                    }
                    return listAccionArray;
                };
                Operation.prototype.unSelect = function (data) {
                    data.Validate = !data.Validate;
                };
                Operation.prototype.saveResult = function (event) {
                    event.preventDefault();
                    var that = this;
                    var arraySaveTemp = [];
                    var objectPost = { "cliente": that.user.value, "tipoAccion": that.tipoAccion.value, "acciones": [] };
                    for (var _i = 0, _a = that.listAccion; _i < _a.length; _i++) {
                        var a = _a[_i];
                        if (a.Validate)
                            objectPost.acciones.push({ "producto": { "id": a.Producto.id, "codigo": a.Producto.code }, "ubicacion": { "id": a.Ubicacion.id, "title": a.Ubicacion.name } });
                    }
                    var successCallback = function (response) {
                        that.listAccion = [];
                        that.listResult = response.json();
                        that.positionForm = 4;
                        that.toastr.success("Las acciones han sido guardadas");
                    };
                    this.httputils.doPost('/acciones/', JSON.stringify(objectPost), successCallback, this.error);
                };
                Operation = __decorate([
                    core_1.Component({
                        selector: 'operation',
                        templateUrl: 'app/operation/index.html',
                        styleUrls: ['app/operation/style.css'],
                        pipes: [ng2_translate_1.TranslatePipe],
                        providers: [ng2_translate_1.TranslateService],
                        directives: [xeditable_1.SMDropdown, common_1.NgSwitch]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager, globalService_1.globalService, ng2_translate_1.TranslateService, common_1.FormBuilder])
                ], Operation);
                return Operation;
            }(restController_1.RestController));
            exports_1("Operation", Operation);
        }
    }
});
//# sourceMappingURL=operation.js.map