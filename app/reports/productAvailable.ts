import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BasicConfiguration} from "../common/basic-configuration";
import {Datepicker} from "../common/xeditable";
import {Control,ControlGroup,FormBuilder,Validators} from "@angular/common";


declare var moment:any;

@Component({
    selector: 'products-available',
    templateUrl: 'app/reports/productAvailable.html',
    styleUrls: ['app/reports/style.css'],
    directives:[Tables,Datepicker],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})



export class ProductAvailable extends BasicConfiguration implements OnInit {

    
    
    
    

    public date:any={};
    public  paramsTable = {};

    public form: ControlGroup;
    public dateStart:Control;
    public dateEnd:Control;


    public formatDateFact :any={};
    public itemsFecha=[];



    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService,public _formBuilder: FormBuilder) {
        super("PO_AV","/inventario/historico/cantidad/",http, toastr,myglobal,translate);

    }


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
        this.dateEnd = new Control("");

        this.form = this._formBuilder.group({
            dateStart: this.dateStart,
            dateEnd: this.dateEnd,
        });
    }
    
    initOptions() {
        this.viewOptions["title"] = 'Inventario';
    }
    
    initRules() {

        this.rules ={};

        this.rules["code"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "code",
            "title": "Código",
            "placeholder": "Ingrese el código",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["productoDetail"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "productoDetail",
            "title": "Detalle",
            "placeholder": "Ingrese la cantidad",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

        this.rules["cantidad"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "cantidad",
            "title": "cantidad",
            "placeholder": "Ingrese la cantidad",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["modelo"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "modelo",
            "title": "modelo",
            "placeholder": "Ingrese la cantidad",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["tipoProducto"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "tipoProducto",
            "title": "tipo producto",
            "placeholder": "Ingrese la cantidad",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

        this.rules["tipoOperacion"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "tipoOperacion",
            "title": "tipo operacion",
            "placeholder": "Ingrese la cantidad",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };

    }

    initSearch() {

    }

    initRuleObject() {

    }

    externalRules() {

    }
    
    initParamsTable(){
        this.paramsTable['endpoint']=this.endpoint;
        this.paramsTable['actions']={}

    }
    
    ngOnInit(){

        this.initDates();
        this.initOptions();
        this.initParamsTable();
        this.initRules();
        this.initForm();

    }


    loadFechaFac(data) {
        if (data.key == "1")
            this.dateStart.updateValue(data.date)
        else
            this.dateEnd.updateValue(data.date)
    }
    
    setFecha(id){


        let day = moment().format('lll');
        let val;

        this.setEndpoint("/inventario/historico/cantidad/");
        if(id == 1 )
        {
            this.setEndpoint("/inventario/diario/cantidad/");

        }
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
        if(id!='-1')
            this.assignDate();


    }


    
    assignDate(event?){

        
        if(event)
            event.preventDefault();

        this.where ="";

        if(this.endpoint != "/inventario/diario/cantidad/")
        {
            let start = moment(this.dateStart.value.toString()).format('DD-MM-YYYY').split("-");
            let end   = moment(this.dateEnd.value.toString()).format('DD-MM-YYYY').split("-");


            let dateWhere=[];
            dateWhere = [{'op':'ge','field':'fecha','type':'long','value':start[2]+start[1]+start[0]},{'op':'le','field':'fecha','type':'long','value':end[2]+end[1]+end[0]}];
            this.where="&where="+encodeURI(JSON.stringify(dateWhere).split('{').join('[').split('}').join(']'));

        }


        this.loadData();

    }




}
