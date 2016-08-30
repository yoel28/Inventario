System.register(['@angular/core', '@angular/http', "ng2-toastr/ng2-toastr", "../common/restController", "../common/globalService", "ng2-translate/ng2-translate", "../utils/save/save", "../utils/card/card", "../utils/lessList/lessList"], function(exports_1, context_1) {
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
    var core_1, http_1, ng2_toastr_1, restController_1, globalService_1, ng2_translate_1, save_1, card_1, lessList_1;
    var User;
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
            function (restController_1_1) {
                restController_1 = restController_1_1;
            },
            function (globalService_1_1) {
                globalService_1 = globalService_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            },
            function (save_1_1) {
                save_1 = save_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            },
            function (lessList_1_1) {
                lessList_1 = lessList_1_1;
            }],
        execute: function() {
            User = (function (_super) {
                __extends(User, _super);
                function User(http, toastr, myglobal, translate) {
                    _super.call(this, http, toastr);
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.translate = translate;
                    this.rules = {};
                    this.paramsSave = {};
                    this.paramsSearch = {};
                    this.rulesSave = {};
                    this.viewOptions = {};
                    this.viewCardOption = {};
                    this.setEndpoint('/users/');
                }
                User.prototype.ngOnInit = function () {
                    this.initLang();
                    this.initRules();
                    this.initSave();
                    this.initSearch();
                    this.initOptions();
                    this.initViewCard();
                };
                User.prototype.initLang = function () {
                    var userLang = navigator.language.split('-')[0];
                    userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
                    this.translate.setDefaultLang('en');
                    this.translate.use(userLang);
                };
                User.prototype.initRules = function () {
                    this.rules["image"] = {
                        "update": true,
                        "visible": true,
                        'required': false,
                        'icon': 'fa fa-email',
                        "type": "image",
                        "key": "image",
                        "title": "Imagen",
                        "placeholder": "Imagen de perfil",
                        'default': '/assets/img/user-guest.png',
                        'msg': {
                            'errors': {},
                        },
                    };
                    this.rules["username"] = {
                        "visible": true,
                        "update": true,
                        'required': true,
                        'maxLength': 30,
                        'icon': 'fa fa-user',
                        "type": "text",
                        "key": "username",
                        "title": "Usuario",
                        "placeholder": "Ingrese un nombre de usuaruio",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                                'maxlength': 'Maximo numero de caracteres 30'
                            },
                        },
                    };
                    this.rules["name"] = {
                        "update": true,
                        "visible": true,
                        'required': true,
                        'maxLength': 30,
                        'icon': 'fa fa-user',
                        "type": "text",
                        "key": "name",
                        "title": "Nombre",
                        "placeholder": "Ingrese el nombre",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                                'maxlength': 'Maximo numero de caracteres 30'
                            },
                        },
                    };
                    this.rules["detail"] = {
                        "visible": true,
                        'required': true,
                        "update": true,
                        'icon': 'fa fa-list',
                        "type": "text",
                        "key": "detail",
                        "title": "Descripcion",
                        "placeholder": "ingrese una descripcion",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                            },
                        }
                    };
                    this.rules["email"] = {
                        "visible": true,
                        'required': true,
                        "update": true,
                        'maxLength': 30,
                        'icon': 'fa fa-email',
                        "type": "email",
                        "key": "email",
                        "title": "Email",
                        "placeholder": "Ingrese un correo electronico",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                                'maxlength': 'Maximo numero de caracteres 30',
                                'email': 'Ingrese un correo valido'
                            },
                        },
                    };
                    this.rules["enabled"] = {
                        "visible": true,
                        'required': true,
                        "update": true,
                        'icon': 'fa fa-email',
                        "type": "boolean",
                        "key": "enabled",
                        "title": "Habilitada",
                        "placeholder": "Cuenta habilitada",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                            },
                        },
                    };
                    this.rules["password"] = {
                        "visible": true,
                        'required': true,
                        "update": true,
                        'icon': 'fa fa-key',
                        "type": "password",
                        "key": "password",
                        "title": "Contraseña",
                        "placeholder": "Contraseña",
                        'msg': {
                            'errors': {
                                'required': 'El campo es obligatorio',
                            },
                        },
                    };
                    this.rules["phone"] = {
                        "visible": true,
                        'required': false,
                        "update": true,
                        'icon': 'fa fa-phone',
                        "type": "number",
                        "key": "phone",
                        "title": "Telefono",
                        "placeholder": "Ingrese un numero de telefono",
                        'msg': {
                            'errors': {},
                        },
                    };
                    this.rules["roles"] = {
                        'update': true,
                        'type': 'checklist',
                        "visible": true,
                        'display': null,
                        'title': 'Rol',
                        'mode': 'popup',
                        'showbuttons': true,
                        'placeholder': 'Roles',
                        'search': false,
                        'source': []
                    };
                };
                User.prototype.initSave = function () {
                    this.paramsSave = {
                        title: "Agregar usuario",
                        idModal: "modalUser",
                        endpoint: this.endpoint,
                    };
                    this.rulesSave = this.rules;
                    delete this.rulesSave["enabled"];
                };
                User.prototype.initSearch = function () {
                    this.paramsSearch = {
                        'permissions': '1',
                        'title': "Usuario",
                        'idModal': "searchUser",
                        'endpoint': "/search/users/",
                        'placeholder': "Ingrese el usuario",
                        'label': { title: "Nombre: ", detail: "Detalle: " },
                        'msg': {
                            'errors': {
                                'noAuthorized': 'No posee permisos para esta accion',
                            },
                        },
                        'where': '',
                        'imageGuest': '/assets/img/truck-guest.png'
                    };
                };
                User.prototype.initOptions = function () {
                    this.viewOptions["title"] = 'Usuarios';
                    this.viewOptions["button"] = [];
                    this.viewOptions["button"].push({
                        'title': 'Agregar',
                        'class': 'btn btn-primary',
                        'icon': 'fa fa-plus',
                        'modal': this.paramsSave.idModal
                    });
                    this.viewOptions["permissions"] = { "list": true };
                    this.viewOptions["errors"] = {};
                    this.viewOptions["errors"].notFound = "no se encontraron resultados";
                    this.viewOptions["errors"].list = "no tiene permisos para ver los productos";
                };
                User.prototype.initViewCard = function () {
                    this.viewCardOption.field = [0, 3, 6];
                    this.viewCardOption.offset = 3;
                    this.viewCardOption.endpoint = this.endpoint;
                    this.viewCardOption.class = "col-lg-4 col-md-4 col-xs-12 col-sm-12";
                    this.viewCardOption.actions = {};
                    this.viewCardOption.actions.delete = {
                        "icon": "fa fa-trash",
                        'title': 'Eliminar',
                        'permission': this.myglobal.existsPermission('1'),
                        'message': 'Esta seguro de eliminar',
                        'keyAction': 'username'
                    };
                    this.viewCardOption.actions.onPatch = {
                        "type": "boolean",
                        "field": "accountLocked",
                        "icon": "fa fa-list",
                        'permission': this.myglobal.existsPermission('1'),
                        "titleTrue": "Verificar",
                        "titleFalse": "No Verificado",
                    };
                    this.viewCardOption.actions.onLock = {
                        "icon": "fa fa-warning",
                        'permission': this.myglobal.existsPermission('1'),
                        "titleTrue": "Bloquear",
                        "titleFalse": "Habilitar",
                    };
                };
                User.prototype.changeImage = function (data) {
                    this.image = data;
                };
                User.prototype.loadImage = function () {
                    this.onPatch('image', this.myglobal.user, this.image);
                };
                User.prototype.asignData = function (data) {
                    if (this.lessList) {
                        this.lessList.dataList.list.unshift({ "title": data.email, "detail": data.username });
                        if (this.lessList.dataList.page && this.lessList.dataList.page.length > 1) {
                            this.lessList.dataList.list.pop();
                        }
                    }
                };
                __decorate([
                    core_1.ViewChild(lessList_1.LessList), 
                    __metadata('design:type', lessList_1.LessList)
                ], User.prototype, "lessList", void 0);
                User = __decorate([
                    core_1.Component({
                        selector: 'users',
                        templateUrl: 'app/user/index.html',
                        styleUrls: ['app/user/style.css'],
                        pipes: [ng2_translate_1.TranslatePipe],
                        providers: [ng2_translate_1.TranslateService],
                        directives: [save_1.Save, card_1.Card, lessList_1.LessList]
                    }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager, globalService_1.globalService, ng2_translate_1.TranslateService])
                ], User);
                return User;
            }(restController_1.RestController));
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map