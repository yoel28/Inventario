System.register(["@angular/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var Fecha, Divide;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Fecha = (function () {
                function Fecha() {
                }
                Fecha.prototype.transform = function (value) {
                    var val;
                    try {
                        val = new Date(value);
                    }
                    catch (e) {
                        val = new Date(value.replace(/[TZ]/g, " "));
                    }
                    return val;
                };
                Fecha = __decorate([
                    core_1.Pipe({
                        name: "fecha"
                    }), 
                    __metadata('design:paramtypes', [])
                ], Fecha);
                return Fecha;
            }());
            exports_1("Fecha", Fecha);
            Divide = (function () {
                function Divide() {
                }
                Divide.prototype.transform = function (data, splice) {
                    var value = [];
                    var count = 0;
                    var index = 0;
                    try {
                        data.forEach(function (obj) {
                            if (splice <= count) {
                                count = 0;
                                index++;
                            }
                            if (!value[index])
                                value[index] = [];
                            value[index].push(obj);
                            count++;
                        });
                    }
                    catch (e) {
                    }
                    return value;
                };
                Divide = __decorate([
                    core_1.Pipe({
                        name: "divide",
                    }), 
                    __metadata('design:paramtypes', [])
                ], Divide);
                return Divide;
            }());
            exports_1("Divide", Divide);
        }
    }
});
//# sourceMappingURL=pipe.js.map