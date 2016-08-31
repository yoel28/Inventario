import {Component, EventEmitter, OnInit,ViewChild} from "@angular/core";
import {FormBuilder, Validators, Control, ControlGroup} from "@angular/common";
import {RestController} from "../../common/restController";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../../common/globalService";
import {Xeditable} from "../../common/xeditable";
import {Search} from "../search/search";
import {Filter} from "../filter/filter";
import {Save} from "../save/save";


@Component({
    selector: 'tables',
    templateUrl: 'app/utils/tables/index.html',
    styleUrls: ['app/utils/tables/style.css'],
    inputs:['params','rules','externalList','rulesSearch','dataList','externalSave','rulesFilter'],
    directives:[Xeditable,Search,Filter,Save]
})


export class Tables extends RestController implements OnInit {


    public params:any={};
    public externalList:any={};
    public rules:any={};
    public rulesSearch:any={};
    public searchId:any={};
    data:any = [];
    public keys:any = [];
    form:ControlGroup;
    public dataDelete:any={};
    public dataSelect:any={};
    public  externalSave:any={};

    public dataArraySelect :any={};



    public dataSave :any={};

    public keyActions =[];
    
    
    public rulesFilter :any ={};


    constructor(public _formBuilder: FormBuilder,public http:Http,public toastr: ToastsManager, public myglobal:globalService) {
        super(http,toastr);
    }

    ngOnInit()
    {
        this.initForm();
        this.keyActions=Object.keys(this.params.actions);
        this.setEndpoint(this.params.endpoint);
    }


    initForm() {
        let that = this;
        this.keys = Object.keys(this.rules);


        Object.keys(this.rules).forEach((key)=> {

            that.data[key] = [];
            let validators=[];
            if(that.rules[key].required)
                validators.push(Validators.required)
            if(that.rules[key].maxLength)
                validators.push(Validators.maxLength(that.rules[key].maxLength))
            if(that.rules[key].minLength)
                validators.push(Validators.minLength(that.rules[key].minLength))
            if(that.rules[key].object)
            {
                validators.push(
                (c:Control)=> {
                    if(c.value && c.value.length > 0){
                        if(that.searchId[key]){
                            if(that.searchId[key].detail == c.value)
                                return null;
                        }
                        return {myobject: {valid: false}};
                    }
                    return null;
                });
            }


                that.data[key] = new Control("",Validators.compose(validators));

        });

        this.form = this._formBuilder.group(this.data);



    }
    keyVisible(){
        let data=[];
        let that=this;
        Object.keys(this.rules).forEach((key)=>{
            if(that.rules[key].visible)
                data.push(key)
        });
        return data;
    }


    public searchTable:any = {}
    public searchTableData:any = {}


    //click en la lupa
    @ViewChild(Search)
    search:Search;
    loadSearchTable(key,data) {


        this.searchTable=this.rulesSearch[key];

        if(this.search)
        {
            this.search.setNewModal();
            this.search.params=this.searchTable;
        }


        this.searchTableData=data;

    }

    //click en la mas
    @ViewChild(Save)
    save:Save;
    loadSaveTable(column,data) {


        this.dataSave.data=data;
        this.dataSave.column=column;
        this.dataSave.params =this.externalSave[column].paramsSave;
        this.dataSave.rules =this.externalSave[column].rulesSave;

        if(this.save)
        {
            //this.search.setNewModal();
            this.save.params = this.externalSave[column].paramsSave;
            this.save.rules = this.externalSave[column].rulesSave;
        }


//        this.searchTableData=data;

    }
    
    asignData(data){
        this.onPatch(this.dataSave.column,this.dataSave.data,data.id);
    }
    
    getDataSearch(data){
        this.onPatch(this.searchTable.field,this.searchTableData,data.id);
    }

    actionPermissionKey() {
        let data=[];
        let that=this;

        Object.keys(this.params.actions).forEach((key)=>
        {
            if( that.myglobal.existsPermission(that.params.actions[key].permission) )
                data.push(key);
        });

        return data;

    }

    getKeys(data){
        return Object.keys(data);
    }



    //Cargar Where del filter
    public paramsFilter:any = {
        title: "Filtrar roles",
        idModal: "modalFilter",
        endpoint: "",
    };


    existFilter()
    {
        let flag = false;
        let  that =this;
        
        Object.keys(this.rulesFilter).forEach(key=>{
            if(that.rulesFilter[key].search  && that.rulesFilter[key].search == true)
                flag = true
        })

        
        
        return flag
    }
    
    loadWhere(where) {
        this.where = where;
        if (this.myglobal.existsPermission('1')) {
            this.loadData();
        }
    }


    DataArraySelect(key,data)
    {
        this.dataArraySelect.key=key;
        this.dataArraySelect.data=data;



        this.externalList[this.dataArraySelect.key].list.forEach(datakey=>{

            if(data[key].indexOf(datakey.id)!= -1)
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

        //this.dataArraySelect.data[this.dataArraySelect.key]=arraytemp;

        
        let that = this;
        let successCallback= response => {

            this.toastr.success("Modifcacion hecha");

        }
        this.onEditable(this.dataArraySelect.key,this.dataArraySelect.data[this.dataArraySelect.key],arraytemp,this.externalEndPoint);

//        this.httputils.doPut(this.endpoint+this.dataArraySelect.data.id,JSON.stringify(this.dataArraySelect.data),successCallback,this.error);

    }
    
    




}
