import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {Control,ControlGroup,FormBuilder,Validators} from "@angular/common";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../../common/globalService";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BasicConfiguration} from "../../common/basic-configuration";
import {Reports} from "../../utils/reports/report";
import {DateRangepPicker, Datepicker, SMDropdown} from "../../common/xeditable";
import {Product} from "../../product/product";
import {Search} from "../../utils/search/search";
import {TypeProduct} from "../../typeProduct/typeProduct";
import {BrandProduct} from "../../brandProduct/brand";
import {ModelProduct} from "../../modelProduct/modelProduct";

declare var moment:any;
declare var SystemJS:any;

@Component({
    selector: 'kardex',
    templateUrl: SystemJS.map.app+'/reports/kardex/index.html',
    styleUrls: [SystemJS.map.app+'/reports/kardex/style.css'],
    directives:[Reports,Datepicker,DateRangepPicker,SMDropdown,Search],
    pipes: [TranslatePipe],
    providers: [TranslateService,Product,TypeProduct,BrandProduct,ModelProduct]
})



export class Kardex extends BasicConfiguration implements OnInit {

    public defaultGroup={'/inventario/historico/kardex':'["field":"tipoOperacion","show":["title"]]','/inventario/diario/kardex/fecha':'["field":"tipoOperacion","show":["title"]]'}
    
    
    
    public formatDateFact:any={};
    public itemsFecha:any=[];
    public disabledRange = '-2';
    public form: ControlGroup;
    public dateStart:Control;
    public dateEnd:Control;
    public dataProduct:any={};


    public refreshGroup=false;
    public paramsDate= {'format':"DD/MM/YYYY"};
    public date:any={};
    public paramsSearch:any={};

    public groupLocation=true; // agrupar por ubicacion



    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService,public _formBuilder: FormBuilder,public product:Product)
    {
        super("OP_KARDEX","/inventario/historico/kardex",http, toastr,myglobal,translate);
        product.initSearch();
    }

    initOptions() {
        this.viewOptions["title"] = 'Kardex';
        this.title= this.viewOptions['title'];
        this.order="asc";
        this.sort="fecha";
        this.max=1000;
        this.lastMax=1000;
    }

    initRules() {
        this.rules ={};
        this.rules["tipoOperacionTitle"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "nombreOperacion",
            "title": "Nombre de Operacion",
            "placeholder": "Ingrese el ruc cliente",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["cantidad"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "cantidad",
            "title": "Cantidad",
            "placeholder": "Ingrese la cantidad",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

        this.rules["dia"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "dia",
            "title": "Dia",
            "placeholder": "Ingrese el dia",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["mes"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "mes",
            "title": "Meses",
            "placeholder": "Ingrese el mes",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["year"] = {
            "update": false,
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "year",
            "title": "Año",
            "placeholder": "Ingrese la el año",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

    }

    ngOnInit(){
        this.initOptions();
        this.initRules();

        this.initDates();
        this.initForm();
    }

    initSearch() {}
    initRuleObject() {}
    externalRules() {}


    private initDates() {
        this.formatDateFact = {
            format: "dd/mm/yyyy",
            startView: 2,
            minViewMode: 0,
            maxViewMode: 2,
            language: "es",
            forceParse: false,
            autoclose: true,
            todayBtn: "linked",
            todayHighlight: true,
        };

        this.itemsFecha=[
            {'id':'1','text':'Hoy'},
            {'id':'2','text':'Semana actual'},
            {'id':'3','text':'Mes actual'},
            {'id':'4','text':'Mes anterior'},
            {'id':'5','text':'Últimos 3 meses'},
            {'id':'6','text':'Año actual'},
        ];


    }
    private initForm(){
        this.dateStart = new Control("", Validators.compose([Validators.required]));
        this.dataProduct = new Control("", Validators.compose([Validators.required]));
        this.dateEnd = new Control("");
        this.form = this._formBuilder.group({
            dateStart: this.dateStart,
            dateEnd: this.dateEnd,
            product: this.dataProduct
        });

    }
    public setFecha(id){

        this.disabledRange=id;
        this.refreshGroup=false;
        let day = moment().format('lll');
        let val;
        this.dateStart.updateValue(null);


        switch (id)
        {
            case "1" : //hoy
                this.dateStart.updateValue(day);
                break;
            case "2" ://Semana Actual
                this.dateStart.updateValue(moment(day).startOf('week'));
                this.dateEnd.updateValue(day);
                break;
            case "3" ://mes actual
                this.dateStart.updateValue(moment().startOf('month'));
                this.dateEnd.updateValue(day);
                break;
            case "4" ://mes anterior
                this.dateStart.updateValue(moment().subtract(1, 'month').startOf('month'));
                this.dateEnd.updateValue(moment().subtract(1, 'month').endOf('month'));
                break;
            case "5" ://ultimos 3 meses
                this.dateStart.updateValue(moment().subtract(3, 'month').startOf('month'));
                this.dateEnd.updateValue(day);
                break;
            case "6" ://ano actual
                this.dateStart.updateValue(moment().startOf('year'));
                this.dateEnd.updateValue(day);
                break;
        }

        this.refreshGroup=true;
        if(id>0)
            this.assignDate();
    }
    loadFechaFac(data) {
        if (data.key == "1")
            this.dateStart.updateValue(data.date)
        else
            this.dateEnd.updateValue(data.date)
    }
    resultSearch(data){
        this.dataProduct.updateValue(data);
    }
    fromButton(event?) {
        if(event)
            event.preventDefault();
        this.assignDate();
        this.loadData();
    }
    assignDate(event?){

        this.where ="";
        let tempWhere=[];
        let tempGroup="";
        let uriwhen ="";
        this.newSearch = true;
        let start =[];
        let end=[];



        if(this.disabledRange == '-1')
        {

            if(event){
                this.dateStart.updateValue(event);
                this.date = event;
            }

            if(!event)
            {
                event = this.dateStart.value;
            }
            start = event.start.split("/");
            end = event.end.split("/");

            tempWhere = [{'op':'ge','field':'fecha','type':'long','value':start[2]+start[1]+start[0]}];
            tempWhere.push({'op':'le','field':'fecha','type':'long','value':end[2]+end[1]+end[0]});

        }

        else
        {
            start = moment(this.dateStart.value.toString()).format('DD-MM-YYYY').split("-");
            tempWhere = [{'op':'ge','field':'fecha','type':'long','value':start[2]+start[1]+start[0]}];



            if(this.disabledRange == '-2' || this.disabledRange == '-1')
                tempWhere[0].op='eq';

            if(parseFloat(this.disabledRange)>1)
            {
                end = moment(this.dateEnd.value.toString()).format('DD-MM-YYYY').split("-");


                tempWhere.push({'op':'le','field':'fecha','type':'long','value':end[2]+end[1]+end[0]});
            }
        }


        tempGroup='["field":"fecha"],["field":"dia"],["field":"mes"],["field":"year"]';
        if(this.groupLocation)
            tempGroup+=',["field":"ubicacion"]';
        this.ext = "&group="+encodeURI("[" +(this.defaultGroup[this.endpoint]?this.defaultGroup[this.endpoint]+',':"")+ tempGroup + "]");


        let flag =true;

        tempWhere.push({"op":"eq","type":"long","field":"producto.id","value":this.dataProduct.value.id});

        if(tempWhere.length>0)
        {
            uriwhen=JSON.stringify(tempWhere).split('{').join('[').split('}').join(']');
            this.where="&where="+encodeURI(uriwhen);
        }

    }
    public orderData(){
        let that=this;

            that.dataList.data={};
            that.dataList.list.forEach(obj=>{
                let index = obj.dia+'/'+obj.mes+'/'+obj.year;
                if(this.groupLocation && obj.ubicacion)
                    index+='/'+obj.ubicacion.id;

                if(!that.dataList.data[index]){
                    that.dataList.data[index]=[];
                    that.dataList.data[index].dia=obj.dia;
                    that.dataList.data[index].mes=obj.mes;
                    that.dataList.data[index].year=obj.year;
                    if(this.groupLocation && obj.ubicacion)
                        that.dataList.data[index].ubicacion=obj.ubicacion;

                }
                that.dataList.data[index][obj.tipoOperacionTitle] = obj.cantidad;
            })

    }
    existenciaMinMax(){
        let min=0;
        let max=0;
        if(this.dataList && this.dataList.data && this.getObjectKeys(this.dataList.data).length > 0){
            min=999999999999999999999999999999;
            max=-999999999999999999999999999999;
            this.getObjectKeys(this.dataList.data).forEach(key=>{
                if(this.dataList.data[key]['Total Inventario']>max)
                    max=this.dataList.data[key]['Total Inventario'];
                if(this.dataList.data[key]['Total Inventario']<min)
                    min=this.dataList.data[key]['Total Inventario']

            })
        }

        return {'min':min,'max':max};
    }
    public changeGroupLocation(){
        this.groupLocation =  ! this.groupLocation;
        this.assignDate();
        this.loadData();
    }

}
