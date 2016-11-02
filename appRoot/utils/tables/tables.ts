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
import { Print} from "../print/print";
import {ColorPicker} from "../../common/colorPicker";


declare var moment:any;
declare var jQuery:any;
declare var Table2Excel:any;
declare var SystemJS:any;

@Component({
    selector: 'tables',
    templateUrl: SystemJS.map.app+'/utils/tables/index.html',
    styleUrls: [SystemJS.map.app+'/utils/tables/style.css'],
    inputs:['params','rules','externalList','rulesSearch','dataList','externalSave','rulesFilter','where','ext','newSearch','max'],
    directives:[Xeditable,Search,Filter,Save,Print,ColorPicker],
    outputs:['getInstance']
})


export class Tables extends RestController implements OnInit {

    public title:string="table";
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
    public configId=moment().valueOf();

    public getInstance:any;



    constructor(public _formBuilder: FormBuilder,public http:Http,public toastr: ToastsManager, public myglobal:globalService) {
        super(http,toastr);
        this.getInstance = new EventEmitter();
    }

    ngOnInit()
    {
        this.initForm();
        this.keyActions=Object.keys(this.params.actions);
        this.setEndpoint(this.params.endpoint);
        this.title =  this.params.title;
    }
    ngAfterViewInit(){
        this.getInstance.emit(this);
    }


    formatDate(date, format) {
        if (date)
            return moment(date).format(format);
        return "-";
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
            if(that.rules[key].visible  && (that.dataList.list[0][key] != null || that.rules[key].obligatoryVisible))
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
    changePosition(event,key,action){
        if(event){
            event.preventDefault();
            event.stopPropagation();
        }
        let keys = this.getKeys(this.rules);
        let index = keys.findIndex(obj=>obj==key);
        if( (index > 0 && action=='up') ||  (index < this.getKeys(this.rules).length - 1) && action=='down' ){
            let temp={};
            let that=this;
            if(action == 'up'){
                keys[index]=keys[index-1];
                keys[index-1]= key;
            }
            else if(action == 'down'){
                keys[index]=keys[index+1];
                keys[index+1]= key;
            }
            keys.forEach(obj=>{
                temp[obj]=[];
                temp[obj] = that.rules[obj];
            })
            that.rules={};
            Object.assign(that.rules,temp);
        }
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
            if(that.params.actions[key].permission )
                data.push(key);
        });

        return data;

    }

    getKeys(data){
        return Object.keys(data);
    }
    setVisible(event,data)
    {
        if(event){
            event.preventDefault();
            event.stopPropagation();
        }
        data.visible = ! data.visible;
    }
    setCheckField(event,key){
        if(event){
            event.preventDefault();
            event.stopPropagation();
        }
        if(!this.rules[key].check)
            this.rules[key].check=false;
        this.rules[key].check=!this.rules[key].check;
    }


    //Cargar Where del filter
    public paramsFilter:any = {
        title: "Filtrar",
        idModal: "modalFilter",
        endpoint: "",
        filterExtra:[],
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
        
        this.loadData();
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
        this.onEditable(this.dataArraySelect.key,this.dataArraySelect.data,arraytemp,this.endpoint);

//        this.httputils.doPut(this.endpoint+this.dataArraySelect.data.id,JSON.stringify(this.dataArraySelect.data),successCallback,this.error);

    }
    
    
        public doubleRules :any={}
        public doubleParams :any={}
        public doubleRulesSearch :any={}
        doubleTable()
        {
            this.doubleRules = Object.create(this.rules);
            this.doubleParams = Object.create(this.params);
            this.doubleRulesSearch = Object.create(this.rulesSearch);

        }




    //order by column
    orderByColumn(key)
    {
     if(key == this.sort)
         {
             this.order = this.order =="asc"?"desc":"asc";
         }
     else 
         {
            this.sort = key;
            this.order="desc";
         }
        this.loadData(0);
    }
    exportCSV(){
        let table2excel = new Table2Excel({
            'defaultFileName': this.title,
        });
        Table2Excel.extend((cell, cellText) => {
            if (cell) return {
                v:cellText,
                t: 's',
            };
            return null;
        });
        table2excel.export(document.querySelectorAll("table.export"));
    }
    onPrintReport(event?){
        if(event)
            event.preventDefault();

        var printContents = document.getElementById(this.configId).innerHTML;
        var popupWin = window.open('', '_blank');
        popupWin.document.open();
        popupWin.document.write('<body onload="window.print()">' + printContents + '</body>');
        popupWin.document.head.innerHTML = (document.head.innerHTML);
        popupWin.document.close();
    }
    
    @ViewChild(Print)
    printObject:Print;
    onPrint(event,id,type,endPoint)
    {

        event.preventDefault();

        if(this.printObject && this.printObject.ExternalInfo)
        {
            this.printObject.ExternalInfo ={};
            this.printObject.type="";
            this.printObject.elementPrint =[];
        }


        

        



        let that = this;

        let successCallback= response => {

            Object.assign(that.printObject.ExternalInfo, response.json());

            if(type=='lotReco')
            {

                that.printObject.elementPrint.push({
                    "name": that.printObject.ExternalInfo.list[0][0].Cliente,
                    "direc": that.printObject.ExternalInfo.list[0][0].direccionCliente,
                    'contac': that.printObject.ExternalInfo.list[0][0].telefonoCliente,
                    'ruc': that.printObject.ExternalInfo.list[0][0].rucCliente,
                    'despachador': that.printObject.ExternalInfo.list[0][0].usernameCreator
                });
                that.printObject.elementPrint.push({
                    "name": that.printObject.ExternalInfo.list[0][0].nombreVendedor,
                    "direc": that.printObject.ExternalInfo.list[0][0].direccionVendedor,
                    'contac': that.printObject.ExternalInfo.list[0][0].telefonoVendedor,
                    'ruc': that.printObject.ExternalInfo.list[0][0].rucVendedor,
                    'despachador': that.printObject.ExternalInfo.list[0][0].usernameCreator
                });

                this.printObject.type="1";

            }


        }
        let where =encodeURI("[['op':'eq','field':'lote.id','value':"+id+"]]");
        this.httputils.doGet(endPoint+"?where="+where+"",successCallback,this.error)
    }

    public filter:any={};
    setFilter(instance){
        this.filter = instance;
    }

    export(type){
        let that=this;
        this.getLoadDataAll([],null,null,0,1000,null,null,()=>{
                setTimeout(function(_jQuery=jQuery){
                    if(type=='xls')
                        that.exportXls();
                    else if (type == 'print')
                        that.onPrintPage();
                }, 3000)
            }
        )
    }
    exportXls(){
        let table2excel = new Table2Excel({
            'defaultFileName': 'Excel',
        });
        Table2Excel.extend((cell, cellText) => {
            if (cell) return {
                v:cellText,
                t: 's',
            };
            return null;
        });
        table2excel.export(document.querySelectorAll("table.export"+this.configId));
    }
    onPrintPage(){
        var printContents = document.getElementById(this.configId+"_reporte").innerHTML;
        var popupWin = window.open('', '_blank');
        popupWin.document.open();
        popupWin.document.write('<body onload="window.print()">' + printContents + '</body>');
        popupWin.document.head.innerHTML = (document.head.innerHTML);
        popupWin.document.close();
    }
}



