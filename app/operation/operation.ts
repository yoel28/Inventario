import {Component, OnInit} from "@angular/core";
import {Control,ControlGroup,FormBuilder,Validators} from "@angular/common";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {SMDropdown} from "../common/xeditable";


@Component({
    selector: 'operation',
    templateUrl: 'app/operation/index.html',
    styleUrls: ['app/operation/style.css'],
    pipes: [TranslatePipe],
    providers: [TranslateService],
    directives:[SMDropdown]
})
export class Operation extends RestController implements OnInit {

    
    public lastLocaltion ='';
    public form_operation:ControlGroup;
    public tipe_actions :any={};
    public producto:Control;
    public ubicacion:Control;
    public tipoAccion:Control;

    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService, public formBuilder:FormBuilder) {

        super(http, toastr);
        this.setEndpoint('/tipo/acciones')
    }



    getResult()
    {   let that=this;
        if(!this.form_operation.valid)
        {
            this.toastr.error("por favor ingrese un tipo de accion y un codigo de barras");
        }
        else{
        let successCallback= response => {
            if(response.status==200){
                that.ubicacion.updateValue(response.json().code)
            }

        }
        this.httputils.doPost('/acciones/',JSON.stringify(this.form_operation.value),successCallback, this.error);
        }
    }


    setTipoAccion(value)
    {
        this.tipoAccion.updateValue(null);
        if(value !='-1')
        {
            this.tipoAccion.updateValue(value);
            let index = this.dataList.list.findIndex(obj=>obj.id == value);
            if(index >-1)
            {
                this.lastLocaltion = this.dataList.list[index].title;
            }
        }

    }
    

    initForm(){
        this.producto = new Control("",Validators.required);
        this.ubicacion = new Control("");
        this.tipoAccion = new Control("",Validators.required);
        this.form_operation = this.formBuilder.group({
            producto:this.producto,
            ubicacion:this.ubicacion,
            tipoAccion:this.tipoAccion
        })
    }
    
    initTypeActions()
    {
        this.loadData();
    }

    ngOnInit()
    {
        this.initForm();
        this.initTypeActions();
    }
    
    


}