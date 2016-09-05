import {Component,OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from "ng2-file-upload/ng2-file-upload";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {Http} from "@angular/http";
import {RestController} from "../../common/restController";
import {globalService} from "../../common/globalService";
import {TablesOffline} from "../tableOffline/tableOffline";


declare var jQuery:any;

declare var Blob:any;

@Component({
    selector: 'upload-file',
    templateUrl: 'app/utils/uploadFile/index.html',
    styleUrls: ['app/utils/uploadFile/style.css'],
    inputs:['endpoint','rules'],
    directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES,TablesOffline]
})




export class UploadFile extends RestController implements OnInit
{
    public uploader:FileUploader;
    public hasBaseDropZoneOver:boolean = false;
    public hasAnotherDropZoneOver:boolean = false;
    public rules:any={};
    public listResult=[];
    
    public request =false;


    constructor( public http:Http, public toastr:ToastsManager, public myglobal:globalService) {


        super(http, toastr);


    }

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e:any):void {
        this.hasAnotherDropZoneOver = e;
    }


    ngOnInit()
    {
        
        this.setEndpoint(this.endpoint);
        this.uploader = new FileUploader({url: this.httputils.createEndpoint(this.endpoint),authToken:"Bearer "+localStorage.getItem("bearer"),headers:[{"name":"Accept","value":"application/json"}]});



        let that = this;

        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        
            

            that.request=false;
            
            if(status==200)
            {

                that.listResult= JSON.parse(response);
                
                if(that.listResult.length > 0)
                    this.toastr.success("Los productos fueron cargados");
                else
                    this.toastr.warning("no se encontro ningun producto para la carga");


                
            }
            else {
                this.toastr.warning("Hubo los siguientes errores: "+response);
            }

        };

    }
}