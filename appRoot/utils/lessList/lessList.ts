import {Component, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/common";
import {RestController} from "../../common/restController";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../../common/globalService";
import {Xeditable} from "../../common/xeditable";
import {Search} from "../search/search";
declare var SystemJS:any;
@Component({
    selector: 'less-list',
    templateUrl: SystemJS.map.app+'/utils/lessList/index.html',
    styleUrls: [SystemJS.map.app+'/utils/lessList/style.css'],
    inputs: ['paramSearch', 'externalEndPoint', 'rulesDetails','externalList'],
    directives:[Xeditable,Search]
})


export class LessList extends RestController implements OnInit {


    public params:any = {};
    public rules:any = {};
    public paramSearch:any = {};
    public externalEndPoint = "";
    public rulesDetails:any = {};
    public dataList:any ={};
    public dataSelect:any={};


    public externalList:any={};
    public dataArraySelect :any={};
    

    constructor(public _formBuilder:FormBuilder, public http:Http, public toastr:ToastsManager, public myglobal:globalService) {
        super(http, toastr);
    }

    ngOnInit() {
        this.ext="&noImage=true";
        this.setEndpoint(this.paramSearch.endpoint);
        this.loadData();

    }

    private _fnIsType(key:string,...list: string[]): boolean {
        return list.indexOf(this.rulesDetails[key].type) >= 0;
    }

    searchDetalles(data) {

        if(!data.detailsSearh)
        {
            for(let item of this.dataList.list)
            {
                item.detailsSearh ={};
            }
        }
        
        if(! data.detailsSearh['id'] || !data.detailsSearh['flag'])
        {
            if(!data.detailsSearh['flag'])
                delete data.detailsSearh['flag']

            let that = this;
            let successCallback = response => {
                Object.assign(data.detailsSearh, response.json());
            }
            this.httputils.doGet(this.externalEndPoint  + data.id, successCallback, this.error)
        }

        
    }

    getKeysText(item) {
        let data = [];
        let that = this;
        Object.keys(that.rulesDetails).forEach((key)=> {
            if(item.detailsSearh[key]!=null && key != 'image' && that.rulesDetails[key].type !='array')
            data.push(key)
        });
        return data;
    }


    getKeysArray(item) {
        let data = [];
        let that = this;
        Object.keys(that.rulesDetails).forEach((key)=> {
            if(that.rulesDetails[key].type =='array')
                data.push(key)
        });
        return data;
    }


    MaxPager()
    {
        return Math.ceil(this.dataList.count/this.max);
    }


    DataArraySelect(key,data)
    {
        this.dataArraySelect.key=key;
        this.dataArraySelect.data=data;



        this.externalList[this.dataArraySelect.key].list.forEach(datakey=>{

            if(data.detailsSearh[key].indexOf(datakey.id)!= -1)
                datakey.flag=true
            else
                datakey.flag=false

        });



    }

    changeArray()
    {
        let arraytemp =[];
        this.externalList[this.dataArraySelect.key].list.forEach(key=>
        {
            if(key.flag)
                arraytemp.push(key.id)

        });

        //this.dataArraySelect.data.detailsSearh[this.dataArraySelect.key]=arraytemp;

        
        let that = this;

        this.dataArraySelect.data.flag ='true';

        if(this.dataArraySelect.key!='roles')
            this.onEditable(this.dataArraySelect.key,this.dataArraySelect.data.detailsSearh,arraytemp,this.externalEndPoint);
        else
            this.onEditableRole("roles",this.dataArraySelect.data.detailsSearh,arraytemp,this.externalEndPoint+this.dataArraySelect.data.id+"/roles")

    }

    getFieldObjectText(){
        let that=this;
        let data=[];
        Object.keys(this.rulesDetails).forEach(key=>{
            if(that.rulesDetails[key].object &&  that.rulesDetails[key].type=='text'){
                data.push(that.rulesDetails[key]);
            }
        });
        return data;
    }
    getDataSearch(data,object){
        if(data.id){
            let json = {};
            if(object.key == 'account' /*&& object.permissions.move*/)
            {
                json['newAccount'] = data.id;
                this.httputils.onUpdate('/move/'+this.dataSelect.id,JSON.stringify(json), this.dataSelect)
            }
            else
            {
                json[object.key] = data.id;
                this.httputils.onUpdate(this.externalEndPoint + data.id, JSON.stringify(json), this.dataSelect)

            }
        }
    }
    onPatch(field,data,value?){
        let json = {};
        json[field] = value?value:!data[field];
        let body = JSON.stringify(json);
        return (this.httputils.onUpdate(this.externalEndPoint + data.id, body, data, this.error));
    }
    onLock(field,data){
        let json = {};
        json[field] = !data[field];
        let body = JSON.stringify(json);
        return (this.httputils.onUpdate("/lock"+this.externalEndPoint + data.id, body, data, this.error));
    }
    
}