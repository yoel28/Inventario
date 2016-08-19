import { Http} from '@angular/http';
import  {ControlGroup,} from '@angular/common';
import {HttpUtils} from "./http-utils";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {OnInit} from "@angular/core";


export class RestController implements OnInit {

    dataList:any = [];
    httputils:HttpUtils;
    endpoint:string;
    offset=0;
    max=5;
    page:any=[];
    where:string="";
    public pagesPager=[];

    constructor(public http: Http,public toastr?: ToastsManager) {
        this.httputils = new HttpUtils(http,toastr || null);
    }
    ngOnInit(){

    }
    setEndpoint(endpoint:string){
        this.endpoint=endpoint;
    }

    error= err => {
        if(this.toastr)
            this.toastr.error(err.json().message);
        console.log(err);
    }

    loadData(offset=0){
        this.offset=offset;
        this.httputils.onLoadList(this.endpoint+"?max="+this.max+"&offset="+this.offset+this.where,this.dataList,this.max,this.error);
    };
    onUpdate(event,data){
        event.preventDefault();
        if(data[event.target.accessKey]!=event.target.innerHTML){
            //data[event.target.accessKey] = event.target.innerHTML;
            let json = {};
            json[event.target.accessKey] = event.target.innerHTML;
            let body = JSON.stringify(json);
            this.httputils.onUpdate(this.endpoint+data.id,body,data,this.error);
        }
    }
    onDelete(event,id){
        event.preventDefault();
        this.httputils.onDelete(this.endpoint+id, id, this.dataList.list, this.error);
    }
    onSave(data:ControlGroup){
        let body = JSON.stringify(data.value);
        this.httputils.onSave(this.endpoint,body,this.dataList.list,this.error);
    }
    onPatch(field,data,value?){
        let json = {};
        json[field] = value?value:!data[field];
        let body = JSON.stringify(json);
        return (this.httputils.onUpdate(this.endpoint + data.id, body, data, this.error));
    }
    onLock(field,data){
        let json = {};
        json[field] = !data[field];
        let body = JSON.stringify(json);
        return (this.httputils.onUpdate("/lock"+this.endpoint + data.id, body, data, this.error));
    }
    onEditable(field,data,value,endpoint){
        let json = {};
        if( typeof data[field] === "number" )
            value=parseFloat(value);
        json[field] = value;
        let body = JSON.stringify(json);
        let error = err => {
            this.toastr.error(err.json().message);
        };
        return (this.httputils.onUpdate(endpoint + data.id, body, data, error));
    }
    onEditableRole(field,data,value,endpoint){
        let json = {};
        json[field] = value;
        let body = JSON.stringify(json);
        let error = err => {
            this.toastr.error(err.json().message);
        };
        let successCallback= response => {
            if(this.toastr)
                this.toastr.success('Guardado con éxito','Notificacion')
        }
        return (this.httputils.doPost(endpoint, body,successCallback, error));
    }

    pagerFunction(val=null) {
        let quantity =Math.ceil(this.dataList.count/5);
        let start =0;
        let end=0;
        if(val) {

            this.loadData(this.max * (val - 1));

        if(val - 2 > 0 && val + 2 <= quantity){
                start = val - 2;
                end   = val + 2;
            }
            else if(val - 1 > 0 && val + 3 <= quantity){
                start = val - 1;
                end   = val + 3;
            }
            else if( val + 4 <= quantity){
                start = val;
                end   = val + 4;
            }
            else if(val - 3 > 0 && val + 1 <= quantity){
                start = val - 3;
                end   = val + 1;
            }
            else if(val - 1 > 0 && val + 2 <= quantity){
                start = val - 1;
                end   = val + 2;
            }
            else if(val - 2 > 0 && val + 1 <= quantity){
                start = val - 2;
                end   = val + 1;
            }
            else if(val - 4 > 0){
                start = val - 4;
                end   = val;
            }
            else if(val - 1 > 0 && val + 1 <= quantity){
                start = val - 1;
                end   = val + 1;
            }
            else if(val - 3 > 0 ){
                start = val - 3;
                end   = val ;
            }
            else if( val + 3 <= quantity){
                start = val ;
                end   = val + 3;
            }
            else if(val - 2 > 0 ){
                start = val - 2;
                end   = val ;
            }
            else if( val + 2 <= quantity){
                start = val ;
                end   = val + 2;
            }
            else if(val - 1 > 0 ){
                start = val - 1;
                end   = val ;
            }
            else if( val + 1 <= quantity){
                start = val ;
                end   = val + 1;
            }

        }
        else if(quantity == 1)
        {
            start=end=1;
        }
        else if(quantity <5) {
            start = 1;
            end = quantity;
        }
        else
        {
            start =1;
            end=5;
        }

        this.pagesPager=[];
        for(let i =start;i<=end;i++) {
            this.pagesPager.push(i);
        }


    }

    loadAll(event) {
        event.preventDefault();
        this.max = this.dataList.count;
        this.loadData();
    }
}
