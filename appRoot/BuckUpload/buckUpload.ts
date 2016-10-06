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
declare var SystemJS:any;

@Component({
    selector: 'buck-upload',
    templateUrl: SystemJS.map.app+'/BuckUpload/index.html',
    styleUrls: [SystemJS.map.app+'/BuckUpload/style.css'],
    directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES,UploadFile]
})

export class BuckUpload extends BasicConfiguration implements OnInit
{
    
    
    public endPoint ="";


    constructor( public http:Http, public toastr:ToastsManager, public myglobal:globalService,public translate:TranslateService) {

        super("BUCK_PRO","/upload/masivo/",http, toastr,myglobal,translate);
        
    }

    initOptions()
    {
        this.viewOptions["title"] = 'Carga Masiva';
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

        this.rules["modeloTitle"] = {
            "visible": true,
            'icon':'fa fa-list',
            "search":true,
            "type": "text",
            "key": "modeloTitle",
            "title": "Modelo",
            "placeholder": "ingrese el modelo",
            'msg':{
                'errors':{
                },
            }
        };

        this.rules["marcaTitle"] = {
            "visible": true,
            'icon':'fa fa-list',
            "search":true,
            "type": "text",
            "key": "marcaTitle",
            "title": "Marca",
            "placeholder": "ingrese la Marca",
            'msg':{
                'errors':{
                },
            }
        };


        this.rules["tipoProductoTitle"] = {
            "visible": true,
            'icon':'fa fa-list',
            "search":true,
            "type": "text",
            "key": "tipoProductoTitle",
            "title": "Tipo",
            "placeholder": "ingrese el tipo",
            'msg':{
                'errors':{
                },
            }
        };


        this.rules["minimo"] = {
            "visible": true,
            'icon':'fa fa-list',
            "search":true,
            "type": "number",
            "key": "minimo",
            "title": "Minimo",
            "placeholder": "ingrese el minimo",
            'msg':{
                'errors':{
                },
            }
        };

        this.rules["maximo"] = {
            "visible": true,
            'icon':'fa fa-list',
            "search":true,
            "type": "number",
            "key": "maximo",
            "title": "Maximo",
            "placeholder": "ingrese el Maximo",
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