System.register(['@angular/platform-browser-dynamic', '@angular/core', '@angular/http', 'angular2-jwt', '@angular/common', './common/globalService', './app.component', 'ng2-toastr/ng2-toastr', 'ng2-translate/ng2-translate', 'semantic'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, core_1, http_1, angular2_jwt_1, common_1, globalService_1, app_component_1, ng2_toastr_1, ng2_translate_1;
    var options;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (globalService_1_1) {
                globalService_1 = globalService_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (ng2_toastr_1_1) {
                ng2_toastr_1 = ng2_toastr_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            },
            function (_1) {}],
        execute: function() {
            options = {
                toastLife: 4000,
            };
            core_1.enableProdMode();
            platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
                globalService_1.globalService,
                ng2_toastr_1.ToastsManager,
                core_1.provide(ng2_toastr_1.ToastOptions, { useValue: new ng2_toastr_1.ToastOptions(options) }),
                http_1.HTTP_PROVIDERS,
                {
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, 'assets/i18n', '.json'); },
                    deps: [http_1.Http]
                },
                ng2_translate_1.TranslateService,
                core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }),
                core_1.provide(common_1.APP_BASE_HREF, { useValue: '/' }),
                core_1.provide(angular2_jwt_1.AuthHttp, {
                    useFactory: function (http) {
                        return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig({
                            tokenName: 'bearer'
                        }), http);
                    },
                    deps: [http_1.Http]
                })
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map