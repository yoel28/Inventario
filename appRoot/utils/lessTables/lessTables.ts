import {Component, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/common";
import {RestController} from "../../common/restController";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../../common/globalService";
import {Xeditable} from "../../common/xeditable";
declare var SystemJS:any;

@Component({
    selector: 'less-tables',
    styleUrls: [SystemJS.map.app+'/utils/lessTables/style.css'],
    templateUrl: SystemJS.map.app+'/utils/lessTables/index.html',
    inputs: ['paramSearch', 'externalEndPoint', 'rulesDetails','externalList','rulesParams','rules','ext'],
    directives:[Xeditable]
})


export class LessTables extends RestController implements OnInit {


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



    public  keyRules(rules)
    {
      let arrayTemp =[];
      let that = this;
        Object.keys(rules).forEach((key)=>
        {
            if(rules[key].visible)
            {
                arrayTemp.push(key);
            }
        });
        return arrayTemp;
    }

    ngOnInit() {

        this.where="&where="+encodeURI('[["or":[["op":"eq","field":"tipoOperacion.id","value":0],["and":[["op":"ne","field":"tipoOperacion.id","value":0],["op":"ne","field":"cantidad","value":0]]]]]]');
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

        if(! data.detailsSearh.count  || data.detailsSearh.count <=0 )
        {

            let that = this;
            let successCallback = response => {
                Object.assign(data.detailsSearh, response.json());
            }
            this.httputils.doGet(this.externalEndPoint+"?where="+encodeURI('[["op":"eq","field":"cliente.id","value":'+data.idCliente+'],["op":"ne","field":"cantidad","value":0],["op":"eq","field":"tipoOperacion.id","value":'+data.idTipoOperacion+']]'), successCallback, this.error)
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

        //this.dataArraySelect.data.detailsSearh[this.dataArraySelect.key]=arraytemp;


        let that = this;

        this.dataArraySelect.data.flag ='true';

        if(this.dataArraySelect.key!='roles')
            this.onEditable(this.dataArraySelect.key,this.dataArraySelect.data.detailsSearh,arraytemp,this.externalEndPoint);
        else
            this.onEditableRole("roles",this.dataArraySelect.data.detailsSearh,arraytemp,this.externalEndPoint+this.dataArraySelect.data.id+"/roles")

    }

}