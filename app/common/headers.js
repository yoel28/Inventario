System.register(['@angular/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1;
    var contentHeaders;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            exports_1("contentHeaders", contentHeaders = new http_1.Headers());
            contentHeaders.append('Accept', 'application/json');
            contentHeaders.append('Content-Type', 'application/json');
            if (localStorage.getItem('bearer'))
                contentHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('bearer'));
        }
    }
});
//# sourceMappingURL=headers.js.map