System.register(['@angular/core', '@angular/router-deprecated', '@angular/http', "ng2-toastr/ng2-toastr", "../../common/xeditable", "../../utils/search/search", "../../common/restController", "../../common/globalService", "../../user/user", "ng2-translate/ng2-translate"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, http_1, ng2_toastr_1, xeditable_1, search_1, restController_1, globalService_1, user_1, ng2_translate_1;
    var Profile;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng2_toastr_1_1) {
                ng2_toastr_1 = ng2_toastr_1_1;
            },
            function (xeditable_1_1) {
                xeditable_1 = xeditable_1_1;
            },
            function (search_1_1) {
                search_1 = search_1_1;
            },
            function (restController_1_1) {
                restController_1 = restController_1_1;
            },
            function (globalService_1_1) {
                globalService_1 = globalService_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            }],
        execute: function() {
            Profile = (function (_super) {
                __extends(Profile, _super);
                function Profile(router, http, myglobal, toastr, user) {
                    _super.call(this, http, toastr);
                    this.router = router;
                    this.http = http;
                    this.myglobal = myglobal;
                    this.toastr = toastr;
                    this.user = user;
                    this.rules = {};
                    this.setEndpoint('/users/');
                    user.initRules();
                }
                Profile.prototype.ngOnInit = function () {
                    Object.assign(this.rules, this.user.rules);
                };
                Profile.prototype.changeImage = function (data) {
                    this.image = data;
                };
                Profile.prototype.loadImage = function () {
                    this.onPatch('image', this.myglobal.user, this.image);
                };
                Profile = __decorate([
                    core_1.Component({
                        selector: 'profile',
                        templateUrl: 'app/account/profile/index.html',
                        styleUrls: ['app/account/profile/style.css'],
                        directives: [xeditable_1.Xeditable, xeditable_1.Xcropit, search_1.Search, xeditable_1.Xfile],
                        pipes: [ng2_translate_1.TranslatePipe],
                        providers: [ng2_translate_1.TranslateService, user_1.User]
                    }),
                    __param(4, core_1.Inject(user_1.User)), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, http_1.Http, globalService_1.globalService, ng2_toastr_1.ToastsManager, Object])
                ], Profile);
                return Profile;
            }(restController_1.RestController));
            exports_1("Profile", Profile);
        }
    }
});
//# sourceMappingURL=profile.js.map