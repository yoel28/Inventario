System.register(['../common/headers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var headers_1;
    var HttpUtils;
    return {
        setters:[
            function (headers_1_1) {
                headers_1 = headers_1_1;
            }],
        execute: function() {
            HttpUtils = (function () {
                function HttpUtils(http, toastr) {
                    this.http = http;
                    this.toastr = toastr;
                }
                HttpUtils.prototype.createEndpoint = function (endpoint, isAbosulte) {
                    if (isAbosulte === void 0) { isAbosulte = false; }
                    return (isAbosulte ? '' : localStorage.getItem('urlAPI')) + endpoint;
                };
                HttpUtils.prototype.doGet = function (endpoint, successCallback, errorCallback, isEndpointAbsolute) {
                    var _this = this;
                    if (isEndpointAbsolute === void 0) { isEndpointAbsolute = false; }
                    endpoint = this.createEndpoint(endpoint, isEndpointAbsolute);
                    return new Promise(function (resolve, reject) {
                        _this.http.get(endpoint, { headers: headers_1.contentHeaders })
                            .subscribe(function (response) {
                            if (successCallback != null)
                                successCallback(response);
                            resolve(response.json());
                        }, function (error) {
                            if (errorCallback != null)
                                errorCallback(error);
                            reject(error);
                        });
                    });
                };
                HttpUtils.prototype.doDelete = function (endpoint, successCallback, errorCallback, isEndpointAbsolute) {
                    var _this = this;
                    if (isEndpointAbsolute === void 0) { isEndpointAbsolute = false; }
                    endpoint = this.createEndpoint(endpoint, isEndpointAbsolute);
                    return new Promise(function (resolve, reject) {
                        _this.http.delete(endpoint, { headers: headers_1.contentHeaders })
                            .subscribe(function (response) {
                            if (successCallback != null)
                                successCallback(response);
                            resolve(response);
                        }, function (error) {
                            if (errorCallback != null)
                                errorCallback(error);
                            reject(error);
                        });
                    });
                };
                HttpUtils.prototype.doPost = function (endpoint, body, successCallback, errorCallback, isEndpointAbsolute) {
                    var _this = this;
                    if (isEndpointAbsolute === void 0) { isEndpointAbsolute = false; }
                    endpoint = this.createEndpoint(endpoint, isEndpointAbsolute);
                    return new Promise(function (resolve, reject) {
                        _this.http.post(endpoint, body, { headers: headers_1.contentHeaders })
                            .subscribe(function (response) {
                            if (successCallback != null)
                                successCallback(response);
                            resolve(response.json());
                        }, function (error) {
                            if (errorCallback != null)
                                errorCallback(error);
                            reject(error);
                        });
                    });
                };
                HttpUtils.prototype.doPut = function (endpoint, body, successCallback, errorCallback, isEndpointAbsolute) {
                    var _this = this;
                    if (isEndpointAbsolute === void 0) { isEndpointAbsolute = false; }
                    endpoint = this.createEndpoint(endpoint, isEndpointAbsolute);
                    return new Promise(function (resolve, reject) {
                        _this.http.put(endpoint, body, { headers: headers_1.contentHeaders })
                            .subscribe(function (response) {
                            if (successCallback != null)
                                successCallback(response);
                            resolve(response.json());
                        }, function (error) {
                            if (errorCallback != null)
                                errorCallback(error);
                            reject(error);
                        });
                    });
                };
                HttpUtils.prototype.onSave = function (endpoint, body, list, errorCallback, isEndpointAbsolute) {
                    if (errorCallback === void 0) { errorCallback = null; }
                    if (isEndpointAbsolute === void 0) { isEndpointAbsolute = false; }
                    var that = this;
                    var successCallback = function (response) {
                        if (list != null)
                            list.unshift(response.json());
                        if (that.toastr)
                            that.toastr.success('Guardado con éxito', 'Notificación');
                    };
                    return this.doPost(endpoint, body, successCallback, errorCallback, isEndpointAbsolute);
                };
                HttpUtils.prototype.onLoadList = function (endpoint, list, max, errorCallback, isEndpointAbsolute, offset, flag) {
                    if (errorCallback === void 0) { errorCallback = null; }
                    if (isEndpointAbsolute === void 0) { isEndpointAbsolute = false; }
                    if (offset === void 0) { offset = 0; }
                    if (flag === void 0) { flag = false; }
                    var that = this;
                    var successCallback = function (response) {
                        Object.assign(list, response.json());
                        if (list.count) {
                            if (flag)
                                max = list.list.length;
                            that.pagerFunction(offset, list, max);
                        }
                    };
                    this.doGet(endpoint, successCallback, errorCallback, isEndpointAbsolute);
                };
                HttpUtils.prototype.onDelete = function (endpoint, id, list, errorCallback, isEndpointAbsolute) {
                    if (errorCallback === void 0) { errorCallback = null; }
                    if (isEndpointAbsolute === void 0) { isEndpointAbsolute = false; }
                    var that = this;
                    var successCallback = function (response) {
                        if (list != null) {
                            var index = list.findIndex(function (obj) { return obj.id == id; });
                            if (index != -1)
                                list.splice(index, 1);
                        }
                        if (that.toastr)
                            that.toastr.success('Borrado con éxito', 'Notificación');
                    };
                    this.doDelete(endpoint, successCallback, errorCallback, isEndpointAbsolute);
                };
                HttpUtils.prototype.onUpdate = function (endpoint, body, data, errorCallback, isEndpointAbsolute) {
                    if (errorCallback === void 0) { errorCallback = null; }
                    if (isEndpointAbsolute === void 0) { isEndpointAbsolute = false; }
                    var that = this;
                    var successCallback = function (response) {
                        Object.assign(data, response.json());
                        if (that.toastr)
                            that.toastr.success('Actualizado con éxito', 'Notificación');
                    };
                    return this.doPut(endpoint, body, successCallback, errorCallback, isEndpointAbsolute);
                };
                HttpUtils.prototype.pagerFunction = function (val, list, max) {
                    if (val === void 0) { val = null; }
                    var quantity = Math.ceil(list.count / max);
                    var start = 0;
                    var end = 0;
                    if (val != 0) {
                        if (val - 2 > 0 && val + 2 <= quantity) {
                            start = val - 2;
                            end = val + 2;
                        }
                        else if (val - 1 > 0 && val + 3 <= quantity) {
                            start = val - 1;
                            end = val + 3;
                        }
                        else if (val + 4 <= quantity) {
                            start = val;
                            end = val + 4;
                        }
                        else if (val - 3 > 0 && val + 1 <= quantity) {
                            start = val - 3;
                            end = val + 1;
                        }
                        else if (val - 1 > 0 && val + 2 <= quantity) {
                            start = val - 1;
                            end = val + 2;
                        }
                        else if (val - 2 > 0 && val + 1 <= quantity) {
                            start = val - 2;
                            end = val + 1;
                        }
                        else if (val - 4 > 0) {
                            start = val - 4;
                            end = val;
                        }
                        else if (val - 1 > 0 && val + 1 <= quantity) {
                            start = val - 1;
                            end = val + 1;
                        }
                        else if (val - 3 > 0) {
                            start = val - 3;
                            end = val;
                        }
                        else if (val + 3 <= quantity) {
                            start = val;
                            end = val + 3;
                        }
                        else if (val - 2 > 0) {
                            start = val - 2;
                            end = val;
                        }
                        else if (val + 2 <= quantity) {
                            start = val;
                            end = val + 2;
                        }
                        else if (val - 1 > 0) {
                            start = val - 1;
                            end = val;
                        }
                        else if (val + 1 <= quantity) {
                            start = val;
                            end = val + 1;
                        }
                    }
                    else if (quantity == 1) {
                        start = end = 1;
                    }
                    else if (quantity < 5) {
                        start = 1;
                        end = quantity;
                    }
                    else {
                        start = 1;
                        end = 5;
                    }
                    list['page'] = [];
                    for (var i = start; i <= end; i++) {
                        list['page'].push(i);
                    }
                };
                return HttpUtils;
            }());
            exports_1("HttpUtils", HttpUtils);
        }
    }
});
//# sourceMappingURL=http-utils.js.map