import {Http} from '@angular/http';
import {contentHeaders} from '../common/headers';
import {ToastsManager} from "ng2-toastr/ng2-toastr";

export class HttpUtils {
    


    constructor(public http:Http,public toastr?: ToastsManager) {
    }

    createEndpoint(endpoint:string,isAbosulte=false){
        return (isAbosulte?'':localStorage.getItem('urlAPI')) + endpoint;
    }

    doGet(endpoint:string, successCallback, errorCallback ,isEndpointAbsolute = false) {
        endpoint=this.createEndpoint(endpoint,isEndpointAbsolute);
        return new Promise<any>((resolve, reject) => {
            this.http.get(endpoint, {headers: contentHeaders})
                .subscribe(
                    response => {
                        if (successCallback != null)
                            successCallback(response)
                        resolve(response.json());
                    },
                    error => {
                        if (errorCallback != null)
                            errorCallback(error)
                        reject(error);
                    }
                )
        });
    }

    doDelete(endpoint:string, successCallback, errorCallback,isEndpointAbsolute = false) {
        endpoint=this.createEndpoint(endpoint,isEndpointAbsolute);
        return new Promise<any>((resolve, reject) => {
            this.http.delete(endpoint, {headers: contentHeaders})
                .subscribe(
                    response => {
                        if (successCallback != null)
                            successCallback(response)
                        resolve(response);
                    },
                    error => {
                        if (errorCallback != null)
                            errorCallback(error)
                        reject(error);
                    }
                )
        });
    }

    doPost(endpoint:string,body, successCallback, errorCallback,isEndpointAbsolute = false) {
        endpoint=this.createEndpoint(endpoint,isEndpointAbsolute);
        return new Promise<any>((resolve, reject) => {
            this.http.post(endpoint,body, {headers: contentHeaders})
                .subscribe(
                    response => {
                        if (successCallback != null)
                            successCallback(response)
                        resolve(response.json());
                    },
                    error => {
                        if (errorCallback != null)
                            errorCallback(error)
                        reject(error);
                    }
                )
        });
    }
    doPut(endpoint:string,body, successCallback, errorCallback,isEndpointAbsolute = false) {
        endpoint=this.createEndpoint(endpoint,isEndpointAbsolute);
        return new Promise<any>((resolve, reject) => {
            this.http.put(endpoint,body, {headers: contentHeaders})
                .subscribe(
                    response => {
                        if (successCallback != null)
                            successCallback(response)
                        resolve(response.json());
                    },
                    error => {
                        if (errorCallback != null)
                            errorCallback(error)
                        reject(error);
                    }
                )
        });
    }

    onSave(endpoint:string, body,list, errorCallback = null,isEndpointAbsolute = false) {
        let that = this;
        let successCallback= response => {
            if(list != null)
                list.unshift( response.json())
            if(that.toastr)
                that.toastr.success('Guardado con éxito','Notificación')
        }
        return this.doPost(endpoint,body,successCallback,errorCallback,isEndpointAbsolute)
    }

    onLoadList(endpoint:string, list,max, errorCallback = null,isEndpointAbsolute = false, offset=0) {
        let that = this;
        let successCallback= response => {
            Object.assign(list, response.json());
            if(list.count)
            {
                max=list.list.length;
                that.pagerFunction(offset,list,max);
            }
        }
        this.doGet(endpoint,successCallback,errorCallback,isEndpointAbsolute)
    }
    
    onDelete(endpoint:string,id, list ,errorCallback = null,isEndpointAbsolute = false) {
        let that = this;
        let successCallback= response => {
            if(list != null){
                let index = list.findIndex(obj => obj.id == id);
                if(index!=-1)
                    list.splice(index,1);
            }
            if(that.toastr)
                that.toastr.success('Borrado con éxito','Notificación')
        }
        this.doDelete(endpoint,successCallback,errorCallback,isEndpointAbsolute);
    }
    onUpdate(endpoint:string,body,data, errorCallback = null,isEndpointAbsolute = false){
        let that = this;
        let successCallback= response => {
            Object.assign(data, response.json());
            if(that.toastr)
                that.toastr.success('Actualizado con éxito','Notificación')
        }
       return this.doPut(endpoint,body,successCallback,errorCallback,isEndpointAbsolute)
    }





    pagerFunction(val=null,list,max) {
        let quantity =Math.ceil(list.count/max);
        let start =0;
        let end=0;
        if(val != 0) {

         //   this.loadData(this.max * (val - 1));

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

        list['page']=[];
        for(let i =start;i<=end;i++) {
            list['page'].push(i);
        }


    }

    


}