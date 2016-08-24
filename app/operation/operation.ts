import {Component, OnInit} from "@angular/core";
import {Control,ControlGroup,FormBuilder,Validators,NgSwitch} from "@angular/common";
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
    directives:[SMDropdown,NgSwitch]
})
export class Operation extends RestController implements OnInit {


    public positionForm=1;


    
    //cargas hechas
    public tipe_actions :any={};



    //lista de clientes o proveedores
    public listClient :any={}

    //ubicaciones    
    public lastLocaltion :any={};



    public listAccion=[];
    public accionList="";

    //formulario
    public form_operation=[];

    //primer formulario
    public user:Control;
    public tipoAccion:Control;

    //segundo formulario
    public producto:Control;
    public ubicacion:Control;


    //cuarto formulario
    public listResult:any={}
    

    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService, public formBuilder:FormBuilder) {

        super(http, toastr);
        this.setEndpoint('/search/tipo/acciones')
    }


    inc(data =null,position=0) {

        if((  this.positionForm-1 ==0  && !this.form_operation[this.positionForm-1].valid ) || ( this.positionForm-1 >0 && this.listAccion.length == 0))
        {
            this.toastr.error("error");
        }
        else {

            if(data)
                this.positionForm=data==1?(this.positionForm+1):(this.positionForm-1);
            else
                this.positionForm=position;
        }
    }

    getResult(event) {
        event.preventDefault();
        let that=this;
        if(!this.producto.valid)
        {
            this.toastr.error("por favor ingrese un codigo de barras");
        }
        else{

        let successCallback= response => {


            if(response.status==200){

                if(that.lastLocaltion && that.lastLocaltion.id)
                    that.listAccion.push({"Producto":{"code":response.json().code,"id":response.json().id},"Ubicacion":that.lastLocaltion,"Accion":that.accionList,"Status":true,"Validate":true,"Mensaje":""});
                else
                    that.toastr.error("por favor ingrese una ubicacion primero");


            }
            else if(response.status==202)
            {
                that.toastr.success("Ubicacion cargada");
                that.ubicacion.updateValue(response.json().id)
                that.lastLocaltion.name=response.json().title;
                that.lastLocaltion.id=response.json().id;
            }
            else if(response.status==204){
  
                that.listAccion.push({"Producto":{"code":that.producto.value},"Ubicacion":"","Accion":that.accionList,"Status":false,"Validate":false,"Mensaje":"El codigo ingresado no fue encontrado"});
                
            }

            this.producto.updateValue(null);

        }
        this.httputils.doPost('/acciones/check/type/element/',JSON.stringify(this.form_operation[1].value),successCallback, this.error);
        }
    }
    
    setTipoAccion(value) {
        this.tipoAccion.updateValue(null);
        if(value !='-1')
        {
            this.tipoAccion.updateValue(value);
            let index = this.dataList.list.findIndex(obj=>obj.id == value);
            this.accionList = this.dataList.list[index].title;
        }

    }

    changeClients(value) {
        this.user.updateValue(null);
        if(value !='-1')
        {
            this.user.updateValue(value);
        }

    }
    
    //primer formulario    
    initSearchClients() {

        let that = this;
        let successCallback= response => {
            Object.assign(that.listClient, response.json());
        }
        
        this.httputils.doGet("/clientes/",successCallback,this.error);
    }
    
    initSearchTypeActions() {
        this.max=100;
        this.loadData();
    }
    
    initForm(){

        //primer formulario
        this.tipoAccion = new Control("",Validators.required);
        this.user = new Control("",Validators.required);
        this.form_operation.push(this.formBuilder.group({user:this.user, tipoAccion:this.tipoAccion}));



        //segundo formulario
        this.producto = new Control("",Validators.required);
        this.ubicacion = new Control("");
        this.form_operation.push(this.formBuilder.group({producto:this.producto}));

//        this.form_operation.push(this.formBuilder.group({producto:this.producto}));


    }

    ngOnInit() {
        this.initForm();
        this.initSearchTypeActions();
        this.initSearchClients();
    }


    //tercer formulario





    getValidateList(type =null) {
        let listAccionArray=[];
        for(var acctions of this.listAccion)
        {
            if(acctions.Status)
            listAccionArray.push(acctions)
        }
        return listAccionArray
    }



    //deseleccionar
    unSelect(data) {
        data.Validate =!data.Validate;
    }


    saveResult(event) {
        event.preventDefault();
        let that=this


        let arraySaveTemp =[];


            let objectPost ={"cliente":that.user.value,"tipoAccion":that.tipoAccion.value,"acciones":[]};

            for(var a of that.listAccion)
            {
                if(a.Validate)
                    objectPost.acciones.push({"producto":{"id":a.Producto.id,"codigo":a.Producto.code},"ubicacion":{"id":a.Ubicacion.id,"title":a.Ubicacion.name}});
            }

            let successCallback= response => {

                that.listAccion=[];
                that.listResult=response.json();
                that.positionForm=4;
                that.toastr.success("Las acciones han sido guardadas");

            }
            this.httputils.doPost('/acciones/',JSON.stringify(objectPost),successCallback, this.error);

    }




    


}