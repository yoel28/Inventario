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
    max=20;
    sort="";
    order="";
    loadAllData=false;
    page:any=[];
    where:string="";
    ext:string="";
    newSearch=false;
    lastMax=20;
    

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

    loadData(offset=0) {
        let val = offset;
        let flag=false;

        if(this.newSearch && !this.loadAllData && this.max !=this.lastMax )
        {

            this.max =this.lastMax;
        }
        if (this.loadAllData && !this.newSearch)
        {
            this.max=this.dataList.list.length;
            flag=true;
        }



            
        if (offset != 0)
            this.offset = (offset - 1) * this.max;
        this.loadAllData=false;
        this.httputils.onLoadList(this.endpoint+"?max="+this.max+"&offset="+this.offset+(this.sort.length >0 ?"&sort="+this.sort+"&order="+this.order:"")+this.where+(this.ext.length>0?this.ext:""),this.dataList,this.max,this.error,false,val,flag);


    };

    getLoadDataAll(data,endpoint?,list?,offset?,max?,where?,ext?,successCallback?){
        let that = this;

        endpoint = ( endpoint?endpoint:that.endpoint);
        list = (list?list:that.dataList);
        max = (max?max:that.max);
        where = (where?where:that.where);
        ext = (ext?ext:that.ext);
        list.page=[];
        if(list.list.length==list.count && list.count > 0)
        {
            if(successCallback)
                successCallback();
        }
        else
        {
            this.httputils.onLoadList(endpoint+"?max="+max+"&offset="+offset+where+ext,list,max,this.error).then(
                response=>{
                    if(list.count > 0){
                        data=data.concat(list.list);
                        if(list.count == list.list.length || list.count == data.length ){
                            Object.assign(list.list,data);
                            list.page=[];
                            if(successCallback)
                                successCallback();
                        }
                        else if(max > list.list.length){
                            max=list.list.length;
                            that.getLoadDataAll(data,endpoint,list,offset+max,max,where,ext,successCallback);
                        }
                        else {
                            that.getLoadDataAll(data,endpoint,list,offset+max,max,where,ext,successCallback);
                        }
                    }

                },error=>{
                    console.log("error");
                }
            );
        }
    }


    loadData_1(endPoint,dataList,ext?,order?) {

        this.endpoint=endPoint;
        this.httputils.onLoadList(endPoint+"?max="+this.max+"&offset="+this.offset+this.where+(ext && ext.length>0?ext:""),dataList,this.max,this.error,false,0,false);


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
        return (this.httputils.onUpdate(endpoint + data.id, body, data, error,false,field,value));
    }
    onEditableRole(field,data,value,endpoint){
        let json = {};
        json[field] = value;
        let body = JSON.stringify(json);
        let error = err => {
            this.toastr.error(err.json().message);
        };
        let successCallback= response => {
          data[field]=value
            if(this.toastr)
                this.toastr.success('Guardado con éxito','Notificacion')
        }
        return (this.httputils.doPost(endpoint, body,successCallback, error));
    }

    
    MaxPager()
    {
     return Math.ceil(this.dataList.count/this.max);
    }

    loadAll(event) {
        this.newSearch=false;
        this.lastMax =this.max;
        event.preventDefault();
        this.max = this.dataList.count;
        this.offset=0;
        this.loadData();
        this.loadAllData=true;

    }
    loadMax(num){
        this.max = parseFloat(num.currentTarget.value || '5');
        if(this.max < 5)
            this.max = 5;
        if(this.max > 100)
            this.max = 100;
    }

}
