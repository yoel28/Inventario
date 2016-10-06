import { Component,EventEmitter } from '@angular/core';
import {Control,ControlGroup,FormBuilder} from "@angular/common";
import { Http} from '@angular/http';
import {RestController} from "../../common/restController";
declare var SystemJS:any;
@Component({
    selector: 'search',
    templateUrl: SystemJS.map.app+'/utils/search/index.html',
    styleUrls: [SystemJS.map.app+'/utils/search/style.css'],
    inputs:['params'],
    outputs:['result'],
})
export class Search extends RestController{

    // Parametro de entrada
    // public searchVehiculo={
    //     title:"Vehiculo",
    //     idModal:"searchVehiculo",
    //     endpoint:"/search/vehicles/",
    //     placeholder:"Ingrese la placa",
    //     label:{name:"Nombre: ",detail:": "},
    //     where:&where[['op':'eq','field':'vehicle','value':'IsNull']]
    // }

    public params:any={};
    public result:any;
    public  valueInput:Control;
    public form:ControlGroup;

    constructor(public _formBuilder:FormBuilder,public http:Http) {
        super(http);
        this.setEndpoint(this.params.endpoint);
        this.result = new EventEmitter();
    }
    ngOnInit(){
        this.initForm();

    }
    initForm(){
        this.valueInput = new Control("");
        this.form = this._formBuilder.group({
            valueInput:this.valueInput
        })
    }
    getSearch(){
        this.endpoint=this.params.endpoint+this.valueInput.value;
        this.loadData();
    }
    loadData(offset=0){
        this.offset=offset;
        if(this.params.where)
            this.httputils.onLoadList(this.endpoint+"?max="+this.max+"&offset="+this.offset+this.params.where,this.dataList,this.max,this.error);
        else
            this.httputils.onLoadList(this.endpoint+"?max="+this.max+"&offset="+this.offset,this.dataList,this.max,this.error);
    };
    getData(data){
        this.result.emit(data);
    }
    
    
    setNewModal()
    {
        this.dataList={};
        this.valueInput.updateValue("");
        
    }
}

