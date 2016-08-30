System.register(["./http-utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_utils_1;
    var RestController;
    return {
        setters:[
            function (http_utils_1_1) {
                http_utils_1 = http_utils_1_1;
            }],
        execute: function() {
            RestController = (function () {
                function RestController(http, toastr) {
                    var _this = this;
                    this.http = http;
                    this.toastr = toastr;
                    this.dataList = [];
                    this.offset = 0;
                    this.max = 5;
                    this.loadAllData = false;
                    this.page = [];
                    this.where = "";
                    this.error = function (err) {
                        if (_this.toastr)
                            _this.toastr.error(err.json().message);
                        console.log(err);
                    };
                    this.httputils = new http_utils_1.HttpUtils(http, toastr || null);
                }
                RestController.prototype.ngOnInit = function () {
                };
                RestController.prototype.setEndpoint = function (endpoint) {
                    this.endpoint = endpoint;
                };
                RestController.prototype.loadData = function (offset) {
                    if (offset === void 0) { offset = 0; }
                    var val = offset;
                    var flag = false;
                    if (this.loadAllData) {
                        this.max = this.dataList.list.length;
                        flag = true;
                    }
                    if (offset != 0)
                        this.offset = (offset - 1) * this.max;
                    this.loadAllData = false;
                    this.httputils.onLoadList(this.endpoint + "?max=" + this.max + "&offset=" + this.offset + this.where, this.dataList, this.max, this.error, false, val, flag);
                };
                ;
                RestController.prototype.onUpdate = function (event, data) {
                    event.preventDefault();
                    if (data[event.target.accessKey] != event.target.innerHTML) {
                        var json = {};
                        json[event.target.accessKey] = event.target.innerHTML;
                        var body = JSON.stringify(json);
                        this.httputils.onUpdate(this.endpoint + data.id, body, data, this.error);
                    }
                };
                RestController.prototype.onDelete = function (event, id) {
                    event.preventDefault();
                    this.httputils.onDelete(this.endpoint + id, id, this.dataList.list, this.error);
                };
                RestController.prototype.onSave = function (data) {
                    var body = JSON.stringify(data.value);
                    this.httputils.onSave(this.endpoint, body, this.dataList.list, this.error);
                };
                RestController.prototype.onPatch = function (field, data, value) {
                    var json = {};
                    json[field] = value ? value : !data[field];
                    var body = JSON.stringify(json);
                    return (this.httputils.onUpdate(this.endpoint + data.id, body, data, this.error));
                };
                RestController.prototype.onLock = function (field, data) {
                    var json = {};
                    json[field] = !data[field];
                    var body = JSON.stringify(json);
                    return (this.httputils.onUpdate("/lock" + this.endpoint + data.id, body, data, this.error));
                };
                RestController.prototype.onEditable = function (field, data, value, endpoint) {
                    var _this = this;
                    var json = {};
                    if (typeof data[field] === "number")
                        value = parseFloat(value);
                    json[field] = value;
                    var body = JSON.stringify(json);
                    var error = function (err) {
                        _this.toastr.error(err.json().message);
                    };
                    return (this.httputils.onUpdate(endpoint + data.id, body, data, error));
                };
                RestController.prototype.onEditableRole = function (field, data, value, endpoint) {
                    var _this = this;
                    var json = {};
                    json[field] = value;
                    var body = JSON.stringify(json);
                    var error = function (err) {
                        _this.toastr.error(err.json().message);
                    };
                    var successCallback = function (response) {
                        if (_this.toastr)
                            _this.toastr.success('Guardado con éxito', 'Notificacion');
                    };
                    return (this.httputils.doPost(endpoint, body, successCallback, error));
                };
                RestController.prototype.MaxPager = function () {
                    return Math.ceil(this.dataList.count / this.max);
                };
                RestController.prototype.loadAll = function (event) {
                    event.preventDefault();
                    this.max = this.dataList.count;
                    this.loadData();
                    this.loadAllData = true;
                };
                return RestController;
            }());
            exports_1("RestController", RestController);
        }
    }
});
//# sourceMappingURL=restController.js.map