System.register(["@angular/core", "@angular/http", "ng2-toastr/ng2-toastr", "../common/http-utils", "./globalService"], function(exports_1, context_1) {
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
    var core_1, http_1, ng2_toastr_1, http_utils_1, globalService_1;
    var Xeditable, Xfile, Xcropit, SMDropdown, Datepicker, DateRangepPicker;
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
            function (http_utils_1_1) {
                http_utils_1 = http_utils_1_1;
            },
            function (globalService_1_1) {
                globalService_1 = globalService_1_1;
            }],
        execute: function() {
            Xeditable = (function () {
                function Xeditable(el, http, myglobal, toastr) {
                    this.el = el;
                    this.http = http;
                    this.myglobal = myglobal;
                    this.toastr = toastr;
                    this.data = {};
                    this.rules = {};
                    this.success = new core_1.EventEmitter();
                    this.httputils = new http_utils_1.HttpUtils(http, toastr);
                }
                Xeditable.prototype.ngOnInit = function () {
                    var that = this;
                    if (that.disabled == null)
                        that.disabled = that.rules[that.field].disabled != null ? that.rules[that.field].disabled : (that.data.enabled ? !that.data.enabled : false);
                    jQuery(this.el.nativeElement).editable({
                        type: that.rules[that.field].type || 'text',
                        value: that.data[that.field] || (that.field == 'password' ? "" : "N/A"),
                        disabled: that.disabled,
                        display: that.rules[that.field].display || null,
                        showbuttons: that.rules[that.field].showbuttons || false,
                        mode: that.rules[that.field].mode || 'inline',
                        source: that.rules[that.field].source || null,
                        step: that.rules[that.field].step || "any",
                        validate: function (newValue) {
                            if (that.function) {
                                that.function(that.field, that.data, newValue, that.endpoint).then(function (value) {
                                    return;
                                }, function (reason) {
                                    jQuery(that.el.nativeElement).editable('setValue', that.data[that.field], true);
                                });
                            }
                        }
                    });
                };
                Xeditable = __decorate([
                    core_1.Directive({
                        selector: "[x-editable]",
                        inputs: ['data', 'rules', 'field', 'function', 'endpoint', 'disabled'],
                        outputs: ['success']
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, http_1.Http, globalService_1.globalService, ng2_toastr_1.ToastsManager])
                ], Xeditable);
                return Xeditable;
            }());
            exports_1("Xeditable", Xeditable);
            Xfile = (function () {
                function Xfile(el) {
                    this.el = el;
                }
                Xfile.prototype.ngOnInit = function () {
                    jQuery(this.el.nativeElement).fileinput({
                        browseLabel: 'Imagen',
                        previewFileType: "image",
                        browseClass: "btn btn-blue",
                        browseIcon: "<i class=\"fa fa-image\"></i> ",
                        showCaption: false,
                        showRemove: false,
                        showUpload: false,
                        showPreview: false,
                    });
                };
                Xfile = __decorate([
                    core_1.Directive({
                        selector: "[x-file]"
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Xfile);
                return Xfile;
            }());
            exports_1("Xfile", Xfile);
            Xcropit = (function () {
                function Xcropit(el) {
                    this.el = el;
                    this.saveImagen = new core_1.EventEmitter();
                }
                Xcropit.prototype.ngOnInit = function () {
                    var that = jQuery(this.el.nativeElement);
                    var _this = this;
                    that.find('.cropit-preview').css({
                        'background-color': '#f8f8f8',
                        'background-size': 'cover',
                        'border': '1px solid #ccc',
                        'border-radius': '3px',
                        'margin-top': '7px',
                        'width': '150px',
                        'height': '150px',
                    });
                    that.find('.cropit-preview-image-container').css({ 'cursor': 'move' });
                    that.find('.image-size-label').css({ 'margin-top': '10px' });
                    that.find('input, .export').css({ 'display': 'block' });
                    that.find('button').css({ 'margin-top': '10px' });
                    that.cropit({
                        onImageLoaded: function () {
                            var imageData = that.cropit('export');
                            if (imageData)
                                _this.saveImagen.emit(imageData);
                        },
                        onOffsetChange: function () {
                            var imageData = that.cropit('export');
                            if (imageData)
                                _this.saveImagen.emit(imageData);
                        },
                        imageState: { src: _this.imageSrc || "" }
                    });
                    that.find('.rotate-cw').click(function (event) {
                        event.preventDefault();
                        that.cropit('rotateCW');
                        var imageData = that.cropit('export');
                        if (imageData)
                            _this.saveImagen.emit(imageData);
                    });
                    that.find('.rotate-ccw').click(function (event) {
                        event.preventDefault();
                        that.cropit('rotateCCW');
                        var imageData = that.cropit('export');
                        if (imageData)
                            _this.saveImagen.emit(imageData);
                    });
                };
                Xcropit = __decorate([
                    core_1.Directive({
                        selector: "[x-cropit]",
                        inputs: ['imageSrc'],
                        outputs: ['saveImagen'],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Xcropit);
                return Xcropit;
            }());
            exports_1("Xcropit", Xcropit);
            SMDropdown = (function () {
                function SMDropdown(el) {
                    jQuery(el.nativeElement).dropdown();
                }
                SMDropdown = __decorate([
                    core_1.Directive({
                        selector: "[sm-dropdown]"
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], SMDropdown);
                return SMDropdown;
            }());
            exports_1("SMDropdown", SMDropdown);
            Datepicker = (function () {
                function Datepicker(el) {
                    this.el = el;
                    this.format = {};
                    this.fecha = new core_1.EventEmitter();
                }
                Datepicker.prototype.ngOnInit = function () {
                    var that = this;
                    that.element = jQuery(this.el.nativeElement).datepicker({
                        format: that.format.format,
                        startView: that.format.startView,
                        minViewMode: that.format.minViewMode,
                        maxViewMode: that.format.maxViewMode,
                        todayBtn: that.format.todayBtn,
                        language: that.format.language,
                        forceParse: that.format.forceParse,
                        autoclose: that.format.autoclose,
                        todayHighlight: that.format.todayHighlight,
                        beforeShowYear: function (date) {
                            if (date.getFullYear() < 2016) {
                                return false;
                            }
                        }
                    });
                    jQuery(this.el.nativeElement).datepicker().on('changeDate', function (ev) {
                        if (that.format.return)
                            that.fecha.emit({ 'date': moment.utc(ev.date).format(that.format.return), 'key': ev.target.accessKey });
                        else
                            that.fecha.emit({ 'date': ev.date, 'key': ev.target.accessKey });
                    });
                    jQuery('#formato').click(function (ev) {
                        jQuery(that.el.nativeElement).datepicker({
                            format: "yyyy",
                        });
                    });
                };
                Datepicker = __decorate([
                    core_1.Directive({
                        selector: "[datepicker]",
                        inputs: ['format'],
                        outputs: ['fecha']
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Datepicker);
                return Datepicker;
            }());
            exports_1("Datepicker", Datepicker);
            DateRangepPicker = (function () {
                function DateRangepPicker(el) {
                    this.el = el;
                    this.params = {};
                    this.fecha = new core_1.EventEmitter();
                }
                DateRangepPicker.prototype.ngOnInit = function () {
                    var that = this;
                    that.element = jQuery(this.el.nativeElement).daterangepicker({
                        showDropdowns: true
                    }, function (start, end) {
                        that.fecha.emit({ 'start': start.format(that.params.format), 'end': end.format(that.params.format) });
                    });
                };
                DateRangepPicker = __decorate([
                    core_1.Directive({
                        selector: "[daterangepicker]",
                        inputs: ['params'],
                        outputs: ['fecha']
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], DateRangepPicker);
                return DateRangepPicker;
            }());
            exports_1("DateRangepPicker", DateRangepPicker);
        }
    }
});
//# sourceMappingURL=xeditable.js.map