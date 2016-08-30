System.register(['@angular/core', '@angular/common', "ng2-file-upload/ng2-file-upload", "../common/restController", "ng2-toastr/ng2-toastr", "../common/globalService", "@angular/http"], function(exports_1, context_1) {
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
    var core_1, common_1, ng2_file_upload_1, restController_1, ng2_toastr_1, globalService_1, http_1;
    var UploadFile;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng2_file_upload_1_1) {
                ng2_file_upload_1 = ng2_file_upload_1_1;
            },
            function (restController_1_1) {
                restController_1 = restController_1_1;
            },
            function (ng2_toastr_1_1) {
                ng2_toastr_1 = ng2_toastr_1_1;
            },
            function (globalService_1_1) {
                globalService_1 = globalService_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            UploadFile = (function (_super) {
                __extends(UploadFile, _super);
                function UploadFile(http, toastr, myglobal) {
                    _super.call(this, http, toastr);
                    this.http = http;
                    this.toastr = toastr;
                    this.myglobal = myglobal;
                    this.hasBaseDropZoneOver = false;
                    this.hasAnotherDropZoneOver = false;
                    this.viewOptions = {};
                    this.setEndpoint("/upload/auditoria/");
                    this.uploader = new ng2_file_upload_1.FileUploader({ url: this.httputils.createEndpoint(this.endpoint), authToken: "Bearer " + localStorage.getItem("bearer"), headers: [{ "name": "Accept", "value": "application/json" }] });
                    this.uploader.onCompleteItem = function (item, response, status, headers) {
                        var blob = new Blob([response], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    };
                }
                UploadFile.prototype.fileOverBase = function (e) {
                    this.hasBaseDropZoneOver = e;
                };
                UploadFile.prototype.fileOverAnother = function (e) {
                    this.hasAnotherDropZoneOver = e;
                };
                UploadFile.prototype.ngOnInit = function () {
                };
                UploadFile = __decorate([
                    core_1.Component({
                        selector: 'uploadFile',
                        templateUrl: 'app/uploadFile/index.html',
                        styleUrls: ['app/uploadFile/style.css'],
                        directives: [ng2_file_upload_1.FILE_UPLOAD_DIRECTIVES, common_1.NgClass, common_1.NgStyle, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager, globalService_1.globalService])
                ], UploadFile);
                return UploadFile;
            }(restController_1.RestController));
            exports_1("UploadFile", UploadFile);
        }
    }
});
//# sourceMappingURL=upload.js.map