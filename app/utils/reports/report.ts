import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../../common/globalService";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Datepicker} from "../../common/xeditable";
import {Control,ControlGroup,FormBuilder,Validators} from "@angular/common";
import {BasicConfiguration} from "../../common/basic-configuration";
import {Tables} from "../tables/tables";
import {RestController} from "../../common/restController";
import {DateRangepPicker} from "../../common/xeditable";

declare var moment:any;

@Component({
    selector: 'reports',
    templateUrl: 'app/utils/reports/index.html',
    styleUrls: ['app/utils/reports/style.css'],
    directives:[Tables,Datepicker,DateRangepPicker],
    pipes: [TranslatePipe],
    providers: [TranslateService],
    inputs:['permissions','paramsTable','endPointHis','endPointAct','viewOptions','rules']
})



export class Reports extends RestController implements OnInit {


    public permissions:any={};
    public paramsTable:any = {};
    public endPointHis = "";
    public endPointAct = "";
    public viewOptions:any={};
    public rules:any ={};


    public date:any={};

    public form: ControlGroup;
    public dateStart:Control;
    public dateEnd:Control;
    public formatDateFact :any={};
    public itemsFecha=[];
    public disabledRange = -2;
    public paramsDate=
    {
        'format':"DD/MM/YYYY"
    }    


    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService,public _formBuilder: FormBuilder) {

        super(http, toastr);

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


  
   

    ngOnInit(){

        this.initDates();
        this.initForm();

        this.setEndpoint(this.endPointHis);
    }


    loadFechaFac(data) {
        if (data.key == "1")
            this.dateStart.updateValue(data.date)
        else
            this.dateEnd.updateValue(data.date)
    }

    setFecha(id){

        this.disabledRange=id;

        let day = moment().format('lll');
        let val;

        this.setEndpoint(this.endPointHis);






        if(id == 1 )
        {
            this.setEndpoint(this.endPointAct);

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
        if(id>0)
            this.assignDate();


    }


    assignButton(event?)
    {
        if(event)
            event.preventDefault();
        this.setEndpoint(this.endPointHis);
        this.assignDate();
    }

    fromButton(envet?)
    {
        if(event)
            event.preventDefault();
        this.assignDate();
    }
    
    assignDate(event?){


        

        this.where ="";
        let dateWhere=[];


        if(this.disabledRange == -1)
        {
            let start = event.start.split("/");
            let end = event.end.split("/");
            

            dateWhere = [{'op':'ge','field':'fecha','type':'long','value':start[2]+start[1]+start[0]}];
            dateWhere.push({'op':'le','field':'fecha','type':'long','value':end[2]+end[1]+end[0]});

        }

        else 
        {
            let start = moment(this.dateStart.value.toString()).format('DD-MM-YYYY').split("-");
            dateWhere = [{'op':'ge','field':'fecha','type':'long','value':start[2]+start[1]+start[0]}];
            
            if(this.disabledRange == -2 || this.disabledRange == 1)
                dateWhere[0].op='eq';
            
            if(this.disabledRange>1)
            {
                let end = moment(this.dateEnd.value.toString()).format('DD-MM-YYYY').split("-");
                dateWhere.push({'op':'le','field':'fecha','type':'long','value':end[2]+end[1]+end[0]});
            }   
        }


        this.rules['day'].visible=false;
        this.rules['month'].visible=false;
        this.rules['year'].visible=false;


        if(this.endpoint != this.endPointAct)
        {
            
            if(this.disabledRange > 1  || this.disabledRange == -2)
            {
                this.rules['day'].visible=true;
                this.rules['month'].visible=true;
                this.rules['year'].visible=true;
            }

            this.where="&where="+encodeURI(JSON.stringify(dateWhere).split('{').join('[').split('}').join(']'));

        }


        this.loadData();

    }




}