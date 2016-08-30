System.register(["./restController"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var restController_1;
    var BasicConfiguration;
    return {
        setters:[
            function (restController_1_1) {
                restController_1 = restController_1_1;
            }],
        execute: function() {
            BasicConfiguration = (function (_super) {
                __extends(BasicConfiguration, _super);
                function BasicConfiguration(prefix, endpoint, http, toastr, myglobal, translate) {
                    _super.call(this, http, toastr);
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.translate = translate;
                    this.permissions = {};
                    this.prefix = "";
                    this.viewOptions = {};
                    this.rules = {};
                    this.paramsSearch = {};
                    this.paramsSave = {};
                    this.rulesSave = {};
                    this.ruleObject = {};
                    this.setEndpoint(endpoint);
                    this.initPermissions(prefix);
                    this.initConfiguration();
                    this.initConfigurationViewOption();
                    this.initConfigurationSearch();
                    this.initConfigurationSave();
                    this.initConfigurationRuleObject();
                    this.initLang();
                }
                BasicConfiguration.prototype.initConfiguration = function () {
                    this.rules["detail"] = {
                        "update": this.permissions['update'],
                        "visible": true,
                        'icon': 'fa fa-list',
                        "search": true,
                        "type": "textarea",
                        "key": "detail",
                        "title": "detalle",
                        "placeholder": "ingrese el detalle",
                        'msg': {
                            'errors': {},
                        }
                    };
                    this.rules["enabled"] = {
                        "update": (this.permissions['update'] && this.permissions['lock']),
                        "visible": this.permissions['lock'],
                        'required': true,
                        'icon': 'fa fa-list',
                        "type": "boolean",
                        'states': ["Habilitado", "Deshabilitado"],
                        "key": "enabled",
                        "title": "Habilitado",
                        "placeholder": "",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                            },
                        }
                    };
                };
                BasicConfiguration.prototype.initConfigurationViewOption = function () {
                    this.viewOptions["title"] = 'Default title';
                    this.viewOptions["errors"] = {};
                    this.viewOptions["button"] = [];
                    this.viewOptions["errors"].notFound = "no se encontraron resultados";
                    this.viewOptions["errors"].list = "no tiene permisos para ver los productos";
                };
                BasicConfiguration.prototype.initPermissions = function (prefix) {
                    this.prefix = prefix;
                    this.permissions['list'] = this.myglobal.existsPermission(this.prefix + '_LIST');
                    this.permissions['add'] = this.myglobal.existsPermission(this.prefix + '_ADD');
                    this.permissions['update'] = this.myglobal.existsPermission(this.prefix + '_UPDATE');
                    this.permissions['delete'] = this.myglobal.existsPermission(this.prefix + '_DELETE');
                    this.permissions['filter'] = this.myglobal.existsPermission(this.prefix + '_FILTER');
                    this.permissions['lock'] = this.myglobal.existsPermission(this.prefix + '_LOCK');
                };
                BasicConfiguration.prototype.initConfigurationSearch = function () {
                    this.paramsSearch = {
                        'title': this.viewOptions["title"],
                        'idModal': "searchDefault",
                        'endpoint': "/search" + this.endpoint,
                        'placeholder': "Placeholder default",
                        'label': { 'title': "titulo: ", 'detail': "detalle: " },
                        'msg': {
                            'errors': {
                                'noAuthorized': 'No posee permisos para esta accion',
                            },
                        },
                        'where': '',
                        'imageGuest': '/assets/img/truck-guest.png'
                    };
                };
                BasicConfiguration.prototype.initConfigurationSave = function () {
                    this.paramsSave = {
                        title: "Agregar Default",
                        idModal: "saveDefault",
                        endpoint: this.endpoint,
                    };
                    this.rulesSave = this.rules;
                };
                BasicConfiguration.prototype.initConfigurationRuleObject = function () {
                    this.ruleObject = {
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "keyDefault",
                        "title": "TipoDefault",
                        'object': true,
                        "placeholder": "PlaceHolder default",
                        'paramsSearch': this.paramsSearch,
                        'msg': {
                            'errors': {
                                'object': 'la referencia no esta registrada',
                                'required': 'El campo es obligatorio'
                            },
                        }
                    };
                };
                BasicConfiguration.prototype.initLang = function () {
                    var userLang = navigator.language.split('-')[0];
                    userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
                    this.translate.setDefaultLang('en');
                    this.translate.use(userLang);
                };
                return BasicConfiguration;
            }(restController_1.RestController));
            exports_1("BasicConfiguration", BasicConfiguration);
        }
    }
});
//# sourceMappingURL=basic-configuration.js.map