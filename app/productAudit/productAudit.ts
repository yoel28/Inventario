import {Component,OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES} from "ng2-file-upload/ng2-file-upload";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../common/globalService";
import {Http} from "@angular/http";
import {UploadFile} from "../utils/uploadFile/uploadFile";
import {BasicConfiguration} from "../common/basic-configuration";
import {TranslateService} from "ng2-translate/ng2-translate";


declare var jQuery:any;

declare var Blob:any;



@Component({
    selector: 'product-audit',
    templateUrl: 'app/BuckUpload/index.html',
    styleUrls: ['app/BuckUpload/style.css'],
    directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES,UploadFile]
})

export class ProductAudit extends BasicConfiguration implements OnInit
{

    constructor( public http:Http, public toastr:ToastsManager, public myglobal:globalService,public translate:TranslateService) {

        super("UAD_PRO","/upload/auditoria/",http, toastr,myglobal,translate);

    }

    initOptions()
    {
        this.viewOptions["title"] = 'Auditoria de productos';
    }

    initRules() {



        let tempRules = this.rules;
        this.rules={};



        this.rules["code"] = {
            "visible": true,
            'required':true,
            'maxLength':5,
            'icon':'fa fa-barcode',
            "type": "text",
            "key": "code",
            "title": "Codigo",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'maxlength':'Maximo numero de caracteres 5'
                },
            },

        };


        this.rules['detail']=tempRules.detail;

        this.rules["cantidad"] = {
            "visible": true,
            'icon':'fa fa-list',
            "search":true,
            "type": "text",
            "key": "cantidad",
            "title": "Cantidad",
            "placeholder": "ingrese la cantidad",
            'msg':{
                'errors':{
                },
            }
        };

        this.rules["fisico"] = {
            "visible": true,
            'icon':'fa fa-list',
            "search":true,
            "type": "text",
            "key": "fisico",
            "title": "Fisico",
            "placeholder": "ingrese la Marca",
            'msg':{
                'errors':{
                },
            }
        };

        

        this.rules["diferencia"] = {
            "visible": true,
            'icon':'fa fa-list',
            "search":true,
            "type": "number",
            "key": "diferencia",
            "title": "Diferencia",
            "placeholder": "ingrese el minimo",
            'msg':{
                'errors':{
                },
            }
        };




    }

    initSearch() {

    }

    initRuleObject() {

    }

    externalRules() {

    }

    ngOnInit() {

        this.initOptions();
        this.initRules();
    }

}