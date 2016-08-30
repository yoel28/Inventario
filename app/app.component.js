System.register(['@angular/core', '@angular/router-deprecated', './common/headers', './account/account', './dashboard/dashboard', "./common/globalService", "@angular/common", "./common/restController", "@angular/http", "ng2-toastr/ng2-toastr", "./product/product", "./utils/save/save", "./location/location", "./client/client", "./user/user", "./account/profile/profile", "./roles/roles", "./permissions/permissions", "./operation/operation", "./permissions/acl", "./typeProduct/typeProduct", "./brandProduct/brand", "./modelProduct/modelProduct", "./reports/productAvailable", "./uploadFile/upload", "./typeCompany/typeCompany"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, headers_1, account_1, account_2, account_3, account_4, dashboard_1, globalService_1, common_1, restController_1, http_1, ng2_toastr_1, product_1, save_1, location_1, client_1, user_1, profile_1, roles_1, permissions_1, operation_1, acl_1, typeProduct_1, brand_1, modelProduct_1, productAvailable_1, upload_1, typeCompany_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (headers_1_1) {
                headers_1 = headers_1_1;
            },
            function (account_1_1) {
                account_1 = account_1_1;
                account_2 = account_1_1;
                account_3 = account_1_1;
                account_4 = account_1_1;
            },
            function (dashboard_1_1) {
                dashboard_1 = dashboard_1_1;
            },
            function (globalService_1_1) {
                globalService_1 = globalService_1_1;
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
            function (product_1_1) {
                product_1 = product_1_1;
            },
            function (save_1_1) {
                save_1 = save_1_1;
            },
            function (location_1_1) {
                location_1 = location_1_1;
            },
            function (client_1_1) {
                client_1 = client_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (profile_1_1) {
                profile_1 = profile_1_1;
            },
            function (roles_1_1) {
                roles_1 = roles_1_1;
            },
            function (permissions_1_1) {
                permissions_1 = permissions_1_1;
            },
            function (operation_1_1) {
                operation_1 = operation_1_1;
            },
            function (acl_1_1) {
                acl_1 = acl_1_1;
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
            function (productAvailable_1_1) {
                productAvailable_1 = productAvailable_1_1;
            },
            function (upload_1_1) {
                upload_1 = upload_1_1;
            },
            function (typeCompany_1_1) {
                typeCompany_1 = typeCompany_1_1;
            }],
        execute: function() {
            AppComponent = (function (_super) {
                __extends(AppComponent, _super);
                function AppComponent(router, http, myglobal, toastr) {
                    _super.call(this, http);
                    this.router = router;
                    this.myglobal = myglobal;
                    this.toastr = toastr;
                    this.urlPublic = ['AccountLogin', 'AccountActivate', 'AccountRecover', 'AccountRecoverPassword'];
                    this.menuItems = [];
                    localStorage.setItem('urlAPI', 'http://192.168.0.95:8080/api');
                    localStorage.setItem('url', 'http://192.168.0.95:8080/');
                    var that = this;
                    router.subscribe(function (data) {
                        if (that.isPublic() && !localStorage.getItem('bearer')) {
                            that.myglobal.init = true;
                        }
                        else if (that.isPublic() && localStorage.getItem('bearer')) {
                            var link = ['Dashboard', {}];
                            that.router.navigate(link);
                        }
                        else if (!that.isPublic() && !localStorage.getItem('bearer')) {
                            that.saveUrl = that.router.currentInstruction.component.routeName;
                            var link = ['AccountLogin', {}];
                            that.router.navigate(link);
                        }
                        else if (that.saveUrl) {
                            var link = [that.saveUrl, {}];
                            that.saveUrl = null;
                            that.router.navigate(link);
                        }
                        if (that.myglobal.getParams('VERSION_CACHE') != localStorage.getItem('VERSION_CACHE') && that.myglobal.getParams('VERSION_CACHE') != "") {
                            localStorage.setItem('VERSION_CACHE', that.myglobal.getParams('VERSION_CACHE'));
                            location.reload(true);
                        }
                    }, function (error) {
                        console.log("entro2");
                    });
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.loadMenu();
                };
                AppComponent.prototype.isPublic = function () {
                    var data = this.router.currentInstruction.component.routeName;
                    var index = this.urlPublic.findIndex(function (obj) { return obj == data; });
                    if (index > -1)
                        return true;
                    return false;
                };
                AppComponent.prototype.logout = function (event) {
                    var _this = this;
                    event.preventDefault();
                    var that = this;
                    var successCallback = function (response) {
                        _this.myglobal.init = false;
                        localStorage.removeItem('bearer');
                        headers_1.contentHeaders.delete('Authorization');
                        var link = ['AccountLogin', {}];
                        _this.router.navigate(link);
                    };
                    this.httputils.doPost('/logout', null, successCallback, this.error);
                };
                AppComponent.prototype.validToken = function () {
                    if (localStorage.getItem('bearer'))
                        return true;
                    return false;
                };
                AppComponent.prototype.loadPermisos = function (event) {
                    event.preventDefault();
                    this.myglobal.myPermissions();
                };
                AppComponent.prototype.activeMenu = function (event, id) {
                    event.preventDefault();
                    if (this.activeMenuId == id)
                        this.activeMenuId = "";
                    else
                        this.activeMenuId = id;
                };
                AppComponent.prototype.loadMenu = function () {
                    this.menuItems.push({
                        'visible': this.myglobal.existsPermission("1"),
                        'icon': 'fa fa-list',
                        'title': 'Panel de Productos',
                        'key': 'menu2',
                        'treeview': [
                            {
                                'visible': this.myglobal.existsPermission("1"),
                                'icon': 'fa fa-list',
                                'title': 'Producto',
                                'routerLink': 'Product'
                            },
                            {
                                'visible': this.myglobal.existsPermission("1"),
                                'icon': 'fa fa-list',
                                'title': 'Tipo',
                                'routerLink': 'TypeProduct'
                            },
                            {
                                'visible': this.myglobal.existsPermission("1"),
                                'icon': 'fa fa-list',
                                'title': 'Marca',
                                'routerLink': 'BrandProduct'
                            },
                            {
                                'visible': this.myglobal.existsPermission("1"),
                                'icon': 'fa fa-list',
                                'title': 'Modelo',
                                'routerLink': 'ModelProduct'
                            }
                        ]
                    });
                    this.menuItems.push({
                        'visible': this.myglobal.existsPermission("1"),
                        'icon': 'fa fa-list',
                        'title': 'Reportes',
                        'key': 'reportes',
                        'treeview': [
                            {
                                'visible': this.myglobal.existsPermission("1"),
                                'icon': 'fa fa-list',
                                'title': 'Producto en existencia',
                                'routerLink': 'ProductAvailable'
                            },
                        ]
                    });
                    this.menuItems.push({
                        'visible': this.myglobal.existsPermission("1"),
                        'routerLink': 'Location_product',
                        'icon': 'fa fa-list',
                        'title': 'Ubicacion'
                    });
                    this.menuItems.push({
                        'visible': this.myglobal.existsPermission("1"),
                        'icon': 'fa fa-list',
                        'title': 'Panel de Clientes',
                        'key': 'menu3',
                        'treeview': [
                            {
                                'visible': this.myglobal.existsPermission("1"),
                                'icon': 'fa fa-list',
                                'title': 'Clientes',
                                'routerLink': 'Client'
                            },
                            {
                                'visible': this.myglobal.existsPermission("1"),
                                'icon': 'fa fa-list',
                                'title': 'Tipo de clientes',
                                'routerLink': 'TypeCompany'
                            }
                        ]
                    });
                    this.menuItems.push({
                        'visible': this.myglobal.existsPermission("1"),
                        'routerLink': 'Roles',
                        'icon': 'fa fa-list',
                        'title': 'Roles'
                    });
                    this.menuItems.push({
                        'visible': this.myglobal.existsPermission("1"),
                        'routerLink': 'Permissions',
                        'icon': 'fa fa-list',
                        'title': 'Permisos'
                    });
                    this.menuItems.push({
                        'visible': this.myglobal.existsPermission("1"),
                        'routerLink': 'User',
                        'icon': 'fa fa-list',
                        'title': 'Usuarios'
                    });
                    this.menuItems.push({
                        'visible': this.myglobal.existsPermission("1"),
                        'routerLink': 'PermissionsAcl',
                        'icon': 'fa fa-list',
                        'title': 'ACL'
                    });
                    this.menuItems.push({
                        'visible': this.myglobal.existsPermission("1"),
                        'routerLink': 'Operation',
                        'icon': 'fa fa-list',
                        'title': 'Operacion'
                    });
                };
                AppComponent.prototype.menuItemsVisible = function (menu) {
                    var data = [];
                    menu.forEach(function (obj) {
                        if (obj.visible)
                            data.push(obj);
                    });
                    return data;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.html',
                        styleUrls: ['app/app.css'],
                        directives: [router_deprecated_1.ROUTER_DIRECTIVES, save_1.Save],
                        providers: [
                            router_deprecated_1.ROUTER_PROVIDERS,
                            core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy })
                        ]
                    }),
                    router_deprecated_1.RouteConfig([
                        { path: '/account/login', name: 'AccountLogin', component: account_1.AccountLogin, useAsDefault: true },
                        { path: '/account/active/:id/:token', name: 'AccountActivate', component: account_3.AccountActivate },
                        { path: '/account/recover', name: 'AccountRecover', component: account_2.AccountRecover },
                        { path: '/account/recoverPassword/:id/:token', name: 'AccountRecoverPassword', component: account_4.AccountRecoverPassword },
                        { path: '/dashboard', name: 'Dashboard', component: dashboard_1.Dashboard },
                        { path: '/product', name: 'Product', component: product_1.Product },
                        { path: '/location', name: 'Location_product', component: location_1.Location_product },
                        { path: '/client', name: 'Client', component: client_1.Client },
                        { path: '/user', name: 'User', component: user_1.User },
                        { path: '/user/profile', name: 'Profile', component: profile_1.Profile },
                        { path: '/roles', name: 'Roles', component: roles_1.Roles },
                        { path: '/permissions', name: 'Permissions', component: permissions_1.Permissions },
                        { path: '/permissions/acl', name: 'PermissionsAcl', component: acl_1.PermissionsAcl },
                        { path: '/operation', name: 'Operation', component: operation_1.Operation },
                        { path: '/typeProduct', name: 'TypeProduct', component: typeProduct_1.TypeProduct },
                        { path: '/brandProduct', name: 'BrandProduct', component: brand_1.BrandProduct },
                        { path: '/modelProduct', name: 'ModelProduct', component: modelProduct_1.ModelProduct },
                        { path: '/upload', name: 'UploadFile', component: upload_1.UploadFile },
                        { path: '/type/company', name: 'TypeCompany', component: typeCompany_1.TypeCompany },
                        { path: '/product/available', name: 'ProductAvailable', component: productAvailable_1.ProductAvailable },
                        { path: '/**', redirectTo: ['Dashboard'] }
                    ]), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, http_1.Http, globalService_1.globalService, ng2_toastr_1.ToastsManager])
                ], AppComponent);
                return AppComponent;
            }(restController_1.RestController));
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map