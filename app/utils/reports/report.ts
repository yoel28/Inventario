import {Component, OnInit,ViewChild} from "@angular/core";
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
import {Select2} from "../../common/multiSelect";

declare var moment:any;

@Component({
    selector: 'reports',
    templateUrl: 'app/utils/reports/index.html',
    styleUrls: ['app/utils/reports/style.css'],
    directives:[Tables,Datepicker,DateRangepPicker,Select2],
    pipes: [TranslatePipe],
    providers: [TranslateService],
    inputs:['permissions','paramsTable','endPointHis','endPointAct','viewOptions','rules','listType','defaultGroup']
})



export class Reports extends RestController implements OnInit {


    public permissions:any={};
    public paramsTable:any = {};
    public endPointHis = "";
    public endPointAct = "";
    public viewOptions:any={};
    public rules:any ={};
    public listType :any={};
    public defaultGroup :any={};



    public listTypeSelect ="";
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

    
    public firstSearch =false;



    public  listSelect =[];
    

    public  tempScope:any;
    
    
    
    public visualDate ="";

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

        
        let that = this;
        this.initDates();
        this.initForm();

        this.setEndpoint(this.endPointHis);

        
        
        if(this.listType && this.listType.count >0 && !this.viewOptions.multiselect)
            this.listTypeSelect=this.listType.list[0].id;
        
        if( this.viewOptions.multiselect)
        {
            this.viewOptions.multiselect.source =[];
            this.listType.list.forEach((key)=>
            {
                that.viewOptions.multiselect.source.push({'id':key.id,'text':key.title})
            });
        }
        this.tempScope = this;



        
    }



    multiSelectFunction (that) {



        if(that.dateStart.value && that.dateStart.value.toString().length >0 && that.listSelect.length >0 )
            that.assignDate();




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
        if(id>0)
            this.assignDate();


    }


    assignButton(event?)
    {
        if(event)
            event.preventDefault();
        this.assignDate();
    }

    changeGroupBy(id)
    {

        this.viewOptions.groupOptions[id].value = !this.viewOptions.groupOptions[id].value;

        if(this.dateStart.value && this.dateStart.value.toString().length >0 )
            this.assignDate();

    }

    fromButton(envet?)
    {
        if(event)
            event.preventDefault();
        this.assignDate();
    }


    setTypeSelect(data)
    {

        this.listTypeSelect =data;

        if(this.dateStart.value && this.dateStart.value.toString().length >0 )
            this.assignDate();


    }

    


    @ViewChild(Tables)
    tables:Tables;
    checkEndPoint(flag=true)
    {
        if(this.tables && this.tables.endpoint && this.tables.endpoint != this.endpoint)
        {
            this.tables.endpoint = this.endpoint;
            if(flag)
            {
                this.tables.sort="";
                this.tables.order="";
                this.loadData();

            }

        }
    }

    assignDate(event?){

        this.firstSearch =true;
        this.where ="";
        let tempWhere=[];


        if(this.disabledRange == -1)
        {
            let start = event.start.split("/");
            let end = event.end.split("/");
            

            tempWhere = [{'op':'ge','field':'fecha','type':'long','value':start[2]+start[1]+start[0]}];
            tempWhere.push({'op':'le','field':'fecha','type':'long','value':end[2]+end[1]+end[0]});

            this.visualDate=start[0]+"-"+start[1]+"-"+start[2]+" al: "+end[0]+"-"+end[1]+"-"+end[2];
        }

        else 
        {
            let start = moment(this.dateStart.value.toString()).format('DD-MM-YYYY').split("-");
            tempWhere = [{'op':'ge','field':'fecha','type':'long','value':start[2]+start[1]+start[0]}];


            this.visualDate=start[0]+"-"+start[1]+"-"+start[2];

            if(this.disabledRange == -2 || this.disabledRange == 1)
                tempWhere[0].op='eq';
            
            if(this.disabledRange>1)
            {
                let end = moment(this.dateEnd.value.toString()).format('DD-MM-YYYY').split("-");

                this.visualDate+=" al: "+end[0]+"-"+end[1]+"-"+end[2];

                tempWhere.push({'op':'le','field':'fecha','type':'long','value':end[2]+end[1]+end[0]});
            }   
        }



        if(this.disabledRange ==1)
        {
            this.setEndpoint(this.endPointAct);
            tempWhere=[];
        }
        else
            this.setEndpoint(this.endPointHis);
        

        this.checkEndPoint(false);

       let tempGroup = "";
        if(this.viewOptions.groupOptions)
        {
            this.viewOptions.groupOptions.forEach((key)=>{
                if(key.value)
                {
                    tempGroup +='["field":"'+key.key+'"],';
                }
            });

        }

        if(tempGroup.length>0)
        {
            tempGroup = tempGroup.slice(0, -1);
            this.ext = "&group=[" +(this.defaultGroup[this.endpoint]?this.defaultGroup[this.endpoint]+',':"")+ tempGroup + "]";
        }
        else
            this.ext = this.defaultGroup[this.endpoint]? "&group=[" +this.defaultGroup[this.endpoint]+ "]":"";


        let flag =true;

        if(this.listTypeSelect && this.listTypeSelect.length  > 0)
            tempWhere.push({"op":"eq","field":"tipoOperacion.id","value":this.listTypeSelect});

        else if(this.viewOptions.multiselect)
        {
            if(this.listSelect.length ==0)
            {
                this.toastr.warning(this.viewOptions.multiselect.message)
                flag= false;
            }
            else
            {
                let valuesTempSelect =[]
                this.listSelect.forEach((key)=>{
                    valuesTempSelect.push({'values':key})
                });

                this.ext+="&in="+JSON.stringify(valuesTempSelect).split('{').join('[').split('}').join(']');
            }
        }

        if(tempWhere.length>0)
        {
            let uriwhen ="";
            uriwhen=JSON.stringify(tempWhere).split('{').join('[').split('}').join(']');
            this.where="&where="+encodeURI(uriwhen);
        }

        if(flag)
        this.loadData();


    }




}
