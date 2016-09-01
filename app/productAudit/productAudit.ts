import {Component,OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from "ng2-file-upload/ng2-file-upload";
import {RestController} from "../common/restController";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../common/globalService";
import {Http} from "@angular/http";


declare var jQuery:any;

declare var Blob:any;


declare var saveAs:any;

@Component({
    selector: 'product-audit',
    templateUrl: 'app/productAudit/index.html',
    styleUrls: ['app/productAudit/style.css'],
    directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class ProductAudit extends RestController implements OnInit
{
    public uploader:FileUploader;
    public hasBaseDropZoneOver:boolean = false;
    public hasAnotherDropZoneOver:boolean = false;

    public viewOptions :any={};


    constructor( public http:Http, public toastr:ToastsManager, public myglobal:globalService) {








        super(http, toastr);
        this.setEndpoint("/upload/auditoria/");
        this.uploader = new FileUploader({url: this.httputils.createEndpoint(this.endpoint),authToken:"Bearer "+localStorage.getItem("bearer"),headers:[{"name":"Accept","value":"application/json"}]});

        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {


            var blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            //var objectUrl = URL.createObjectURL(blob);
            //window.open(objectUrl)
            //saveAs(blob,"yoel.xlsx");


            //a.click();


            /*var blob = new Blob([response], {type: "application/binary"});

             //var blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
             /*var blob = new Blob([response], {type: "application/binary"});

             var fileURL = URL.createObjectURL(blob);
             window.open(fileURL);

             var link=document.createElement('a');
             link.href=fileURL;
             link.download="data.xlsx";
             link.click();*/
            /*
             var downloadUrl = URL.createObjectURL(blob);
             var a = document.createElement("a");
             a.href = downloadUrl;
             //a.download = "data.xlsx";
             document.body.appendChild(a);
             a.click();*/


            // var objectUrl = URL.createObjectURL(blob);
            //window.open(objectUrl);

            /*
             var blob=new Blob([response],{type:"APPLICATION/OCTET-STREAM"});

             var URL = window.URL || window.webkitURL;
             var downloadUrl = URL.createObjectURL(blob);

             var a = document.createElement("a");

             if (typeof a.download === 'undefined') {
             window.location = downloadUrl;
             } else {
             a.href = downloadUrl;
             a.download = "audit.xlsx";
             document.body.appendChild(a);
             a.click();
             }

             */
            //window.navigator.msSaveBlob(blob, "cualquier.xlsx");
            /*            var link=document.createElement('a');
             link.href=window.URL.createObjectURL(blob);
             link.download="myFileName.xlsx";
             link.click();*/


            /*var blob = new Blob([ response ], { type : 'application/vnd.ms-excel' });
             var downloadUrl = URL.createObjectURL(blob);
             var a = document.createElement("a");
             a.href = downloadUrl;
             a.download = "data.xlsx";
             document.body.appendChild(a);
             a.click();
             */
            //jQuery("#test");

            //            $scope.url = (window.URL || window.webkitURL).createObjectURL( blob );

            /*let blob = new Blob([$scope.toJSON], { type:"application/json;charset=utf-8;" });
             var downloadLink = angular.element('<a></a>');
             downloadLink.attr('href',window.URL.createObjectURL(blob));
             downloadLink.attr('download', 'fileName.json');
             downloadLink[0].click();
             */


            /*
             application/vnd.ms-excel
             anchor.attr({
             href: 'data:attachment/xls;charset=utf-8,' + encodeURI(response),
             target: '_blank',
             download: 'filename.xls'
             })[0].click();
             */
            //this.toastr.success("hola");

            /*
             window.URL = window.webkitURL || window.URL;
             window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder;

             var prevLink = output.querySelector('a');
             if (prevLink) {
             window.URL.revokeObjectURL(prevLink.href);
             output.innerHTML = '';
             }

             var a = document.createElement('a');
             a.download = '" + "cualQuierCosa" + @".csv';

             if (BlobBuilder == undefined) {
             var bb = new Blob([response], { 'type': MIME_TYPE });
             a.href = window.URL.createObjectURL(bb);
             }
             else {
             var bb = new BlobBuilder();
             bb.append(response);
             a.href = window.URL.createObjectURL(bb.getBlob(MIME_TYPE));
             }

             a.textContent = 'Download ready';

             a.dataset.downloadurl = [MIME_TYPE, a.download, a.href].join(':');
             a.draggable = true; // Don't really need, but good practice.
             a.classList.add('dragout');

             output.appendChild(a);

             a.onclick = function (e) {
             if ('disabled' in this.dataset) {
             return false;
             }
             };

             */

        };

    }

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e:any):void {
        this.hasAnotherDropZoneOver = e;
    }


    ngOnInit()
    {

    }
}