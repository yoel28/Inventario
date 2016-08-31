import {Component, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/common";
import {RestController} from "../../common/restController";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../../common/globalService";


@Component({
    selector: 'less-list',
    templateUrl: 'app/utils/lessList/index.html',
    styleUrls: ['app/utils/lessList/style.css'],
    inputs: ['paramSearch', 'externalEndPoint', 'rulesDetails','externalList']
})


export class LessList extends RestController implements OnInit {


    public params:any = {};
    public rules:any = {};
    public paramSearch:any = {};
    public externalEndPoint = "";
    public rulesDetails:any = {};
    public dataList:any ={}


    public externalList:any={};
    public dataArraySelect :any={};
    

    constructor(public _formBuilder:FormBuilder, public http:Http, public toastr:ToastsManager, public myglobal:globalService) {
        super(http, toastr);
    }

    ngOnInit() {
        this.setEndpoint(this.paramSearch.endpoint);
        this.loadData();

    }

    searchDetalles(data) {

        if(!data.detailsSearh)
        {
            for(let item of this.dataList.list)
            {
                item.detailsSearh ={};
            }
        }
        
        if(! data.detailsSearh['id'])
        {
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
            if(item.detailsSearh[key] && key != 'image' && that.rulesDetails[key].type !='array')
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

        this.dataArraySelect.data.detailsSearh[this.dataArraySelect.key]=arraytemp;

        let that = this;
        let successCallback= response => {

            this.toastr.success("Modifcacion hecha");

        }

        this.httputils.doPut(this.externalEndPoint+this.dataArraySelect.data.id,JSON.stringify(this.dataArraySelect.data),successCallback,this.error);

    }
    
}