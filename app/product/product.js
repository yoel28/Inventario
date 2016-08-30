System.register(["@angular/core", "@angular/http", "ng2-toastr/ng2-toastr", "../common/globalService", "../utils/tables/tables", 'ng2-translate/ng2-translate', "../utils/save/save", "../typeProduct/typeProduct", "../brandProduct/brand", "../modelProduct/modelProduct", "../common/basic-configuration"], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, http_1, ng2_toastr_1, globalService_1, tables_1, ng2_translate_1, save_1, typeProduct_1, brand_1, modelProduct_1, basic_configuration_1;
    var Product;
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
            function (typeProduct_1_1) {
                typeProduct_1 = typeProduct_1_1;
            },
            function (brand_1_1) {
                brand_1 = brand_1_1;
            },
            function (modelProduct_1_1) {
                modelProduct_1 = modelProduct_1_1;
            },
            function (basic_configuration_1_1) {
                basic_configuration_1 = basic_configuration_1_1;
            }],
        execute: function() {
            Product = (function (_super) {
                __extends(Product, _super);
                function Product(http, toastr, myglobal, translate, typesProduct, brandProduct, modelProduct) {
                    _super.call(this, "PRO", "/productos/", http, toastr, myglobal, translate);
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.translate = translate;
                    this.typesProduct = typesProduct;
                    this.brandProduct = brandProduct;
                    this.modelProduct = modelProduct;
                    this.paramsTable = {};
                    this.externalSave = {};
                    this.rulesSearch = {};
                    this.rulesSave = {};
                    typesProduct.externalRules();
                    brandProduct.externalRules();
                    modelProduct.externalRules();
                }
                Product.prototype.initExternalSave = function () {
                    this.externalSave["tipoProducto"] = { "paramsSave": this.typesProduct.paramsSave, "rulesSave": this.typesProduct.rulesSave };
                    this.externalSave["marca"] = { "paramsSave": this.brandProduct.paramsSave, "rulesSave": this.brandProduct.rulesSave };
                    this.externalSave["modelo"] = { "paramsSave": this.modelProduct.paramsSave, "rulesSave": this.modelProduct.rulesSave };
                };
                Product.prototype.initExternalRulesSearch = function () {
                    this.rulesSearch["tipoProductoTitle"] = this.typesProduct.paramsSearch;
                    this.rulesSearch["marcaTitle"] = this.brandProduct.paramsSearch;
                    this.rulesSearch["modeloTitle"] = this.modelProduct.paramsSearch;
                };
                Product.prototype.initRules = function () {
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
                        "title": "Codigo",
                        "placeholder": "ingrese el codigo",
                        "search": true,
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                                'maxlength': 'Maximo numero de caracteres 5'
                            },
                        },
                    };
                    this.rules["tipoProductoTitle"] = this.typesProduct.ruleObject;
                    this.rules["tipoProductoTitle"].visible = true;
                    this.rules["modeloTitle"] = this.modelProduct.ruleObject;
                    this.rules["modeloTitle"].visible = true;
                    this.rules["marcaTitle"] = this.brandProduct.ruleObject;
                    this.rules["marcaTitle"].visible = true;
                    this.rules['detail'] = tempRules['detail'];
                    this.rules['enabled'] = tempRules['enabled'];
                    this.rules['enabled'].visible = false;
                };
                Product.prototype.initParamsTable = function () {
                    this.paramsTable.endpoint = this.endpoint;
                    this.paramsTable.actions = {};
                    this.paramsTable.actions.delete = {
                        "icon": "fa fa-trash",
                        "exp": "",
                        'title': 'Eliminar',
                        'permission': '1',
                        'message': 'Esta seguro de eliminar el producto con el codigo ',
                        'keyAction': 'code'
                    };
                    this.paramsTable.actions.print = {
                        "icon": "fa fa-print",
                        "exp": "",
                        'title': 'Imprimir',
                        'permission': '1',
                        'message': 'wii imprimir',
                        'keyAction': 'description'
                    };
                };
                Product.prototype.initSaveRules = function () {
                    this.paramsSave = {
                        title: "Agregar Productos",
                        idModal: "searchProductos",
                        endpoint: this.endpoint,
                    };
                    this.rulesSave["code"] = {
                        'required': true,
                        'maxLength': this.rules["code"].maxLength,
                        'icon': this.rules["code"].icon,
                        "type": this.rules["code"].type,
                        "key": this.rules["code"].key,
                        "title": this.rules["code"].title,
                        'msg': this.rules["code"].msg,
                        "placeholder": this.rules["code"].placeholder,
                        "search": this.rules["code"].search
                    };
                    this.rulesSave["detail"] = {
                        'required': true,
                        'icon': this.rules["detail"].icon,
                        "type": this.rules["detail"].type,
                        "key": this.rules["detail"].detail,
                        "title": this.rules["detail"].title,
                        'msg': this.rules["detail"].msg,
                        "placeholder": this.rules["detail"].placeholder,
                        "search": this.rules["detail"].search
                    };
                    this.rulesSave["tipoProducto"] = this.typesProduct.ruleObject;
                    this.rulesSave["tipoProducto"].required = true;
                    this.rulesSave["tipoProducto"].search = true;
                    this.rulesSave["marca"] = this.brandProduct.ruleObject;
                    this.rulesSave["marca"].required = true;
                    this.rulesSave["marca"].search = true;
                    this.rulesSave["modelo"] = this.modelProduct.ruleObject;
                    this.rulesSave["modelo"].required = true;
                    this.rulesSave["modelo"].search = true;
                };
                Product.prototype.initOptions = function () {
                    this.viewOptions["title"] = 'Productos';
                    this.viewOptions["button"].push({
                        'title': 'Agregar',
                        'class': 'btn btn-primary',
                        'icon': 'fa fa-plus',
                        'modal': this.paramsSave.idModal
                    });
                };
                Product.prototype.initSearch = function () {
                    this.paramsSearch['title'] = "Producto";
                    this.paramsSearch['idModal'] = "searchProducto";
                    this.paramsSearch['placeholder'] = "Ingrese el producto";
                };
                Product.prototype.ngOnInit = function () {
                    this.initExternalSave();
                    this.initExternalRulesSearch();
                    this.initRules();
                    this.initParamsTable();
                    this.initSaveRules();
                    this.initOptions();
                    this.initSearch();
                    this.loadData();
                };
                Product.prototype.externalRules = function () {
                };
                Product.prototype.initRuleObject = function () {
                };
                Product.prototype.asignData = function (data) {
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
                ], Product.prototype, "tables", void 0);
                Product = __decorate([
                    core_1.Component({
                        selector: 'products',
                        templateUrl: 'app/product/index.html',
                        styleUrls: ['app/product/style.css'],
                        directives: [tables_1.Tables, save_1.Save],
                        pipes: [ng2_translate_1.TranslatePipe],
                        providers: [ng2_translate_1.TranslateService, typeProduct_1.TypeProduct, brand_1.BrandProduct, modelProduct_1.ModelProduct]
                    }),
                    __param(4, core_1.Inject(typeProduct_1.TypeProduct)),
                    __param(5, core_1.Inject(brand_1.BrandProduct)),
                    __param(6, core_1.Inject(modelProduct_1.ModelProduct)), 
                    __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager, globalService_1.globalService, ng2_translate_1.TranslateService, Object, Object, Object])
                ], Product);
                return Product;
            }(basic_configuration_1.BasicConfiguration));
            exports_1("Product", Product);
        }
    }
});
//# sourceMappingURL=product.js.map