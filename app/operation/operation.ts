import {Component, OnInit} from "@angular/core";
import {Control,ControlGroup,FormBuilder,Validators,NgSwitch} from "@angular/common";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {SMDropdown} from "../common/xeditable";


declare var moment:any;

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

    //vecrtor de producto/cantidad
    public listAccionArray :any={}


    //cuarto formulario
    public listResult:any={}
    
    //elementos graficos
    public currentDay=""
    public totalProduct=0
    private lastItem=1;

    //para imprimir cliente
    public elementPrint =[];
    public lote ="";
    public RUC ="";
    public CONTACTO="";
    public DIRECCION="";
    public NOMBRE="";
    public CLIENT :any ={}
    
    
    //se realizo la carga
    public flagSave=false;




    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService, public formBuilder:FormBuilder) {

        super(http, toastr);
        this.setEndpoint('/search/tipo/acciones')

        this.currentDay = moment().format('DD-MM-YYYY');

    }


    onDelete()
    {
        this.positionForm=1;
        this.lastLocaltion ={};
        this.listAccion=[];
        this.accionList="";
        this.user.updateValue(null);
        this.tipoAccion.updateValue(null);
        this.producto.updateValue(null);
        this.ubicacion.updateValue(null);
        this.listResult={};
        this.flagSave=false;

        this.initSearchTypeActions();

    }


    inc(data =null,position=0) {

        let flag =true;


        if(!this.RUC || !this.CONTACTO || !this.DIRECCION)
        {
            let error="";
            if(!this.RUC)
                error ="'Ruc'"
            if(!this.CONTACTO) {
                if(error.length >0)
                    error +=", 'Contacto'"
                else
                    error = "''Contacto''"
            }
            if(!this.DIRECCION) {

                if (error.length > 0)
                    error += ", 'Direccion'"
                else
                    error = "''Direccion''"

            }
            if(!this.NOMBRE) {

                if (error.length > 0)
                    error += ", 'Nombre de empresa'"
                else
                    error = "''Nombre de empresa''"

            }

            this.toastr.error("Los parametros de: "+error+"  no esta configurados")
            flag =false;
        }

        switch (this.positionForm)
        {
            case 1:

                    if(!this.form_operation[0].valid)
                    {
                        this.toastr.error("por favor selccione una accion y un cliente valido");
                        flag =false;
                    }
                else {
                        
                        let that = this;
                        this.listClient.list.find(o=>{

                            if(o.id==that.user.value)
                            {
                                that.user.updateValue(o);
                                return;
                            }

                        });
                    }

                break;
            case 2:

                    if(this.getValidateList().length == 0 && (data == 1 || position == 3))
                    {
                        this.toastr.warning("la lista de acciones valida es nula");
                        flag =false;
                    }

                break;

            case 3:
                    if(position != 0 && position != 1)
                    {
                        this.toastr.warning("debe realizar una lista de acciones nueva");
                        flag =false;
                    }
                break;

            default:
                    this.toastr.warning("no abarcado");
                break;

        }

        if(flag)
        {
            if(data && this.positionForm!=3)
                this.positionForm=data==1?(this.positionForm+1):(this.positionForm-1);
            else if(data)
                this.onDelete();
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

        let codeBar = this.producto.value;
        this.producto.updateValue(null);

            let successCallback= response => {


            if(response.status==200){

                if(that.lastLocaltion && that.lastLocaltion.id)
                {
                    var snd = new Audio("/assets/sound/click.mp3");
                    snd.play();
                    that.listAccion.push({"item":this.lastItem++,"Producto":{"code":response.json().code,"id":response.json().id,"name":response.json().detail},"Ubicacion":{'name':that.lastLocaltion.name,'id':that.lastLocaltion.id},"Accion":that.accionList,"Status":true,"Validate":true,"msj":"Codigo del producto: "+response.json().code});
                }
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


                var snd = new Audio("/assets/sound/error.wav"); 
                snd.play();
                that.listAccion.push({"item":this.lastItem++,"Producto":{"code":codeBar},"Ubicacion":"","Accion":that.accionList,"Status":false,"Validate":false,"msj":"El codigo no fue encontrado"});
                
            }


        }
        this.httputils.doGet('/acciones/check/type/element/'+codeBar,successCallback, this.error);
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


        this.RUC =this.myglobal.getParams('EMP_RUC')
        this.CONTACTO =this.myglobal.getParams('EMP_CONTACTO')
        this.DIRECCION =this.myglobal.getParams('EMP_DIRECCION')
        this.NOMBRE =this.myglobal.getParams('EMP_NOMBRE')


        if(!this.RUC || !this.CONTACTO || !this.DIRECCION || !this.NOMBRE)
        {
            let error="";
            if(!this.RUC)
                error ="'Ruc'"
            if(!this.CONTACTO) {
                if(error.length >0)
                    error +=", 'Contacto'"
                else
                    error = "''Contacto''"
            }
            if(!this.DIRECCION) {

                if (error.length > 0)
                    error += ", 'Direccion'"
                else
                    error = "''Direccion''"

            }
            if(!this.NOMBRE) {

                if (error.length > 0)
                    error += ", 'Nombre de empresa'"
                else
                    error = "''Nombre de empresa''"

            }

            this.toastr.error("Los parametros de: "+error+"  no esta configurados")

        }



    }

    //tercer formulario

    getValidateList() {
        let listAccionArray=[];
        for(var acctions of this.listAccion)
        {
            if(acctions.Status && acctions.Validate)
            listAccionArray.push(acctions)
        }
        return listAccionArray
    }

    getValidateListWithCount() {

        this.listAccionArray={};
        this.totalProduct=0;
        let item =0
        for(var acctions of this.listAccion)
        {


            if(acctions.Status && acctions.Validate)
            {
                this.totalProduct++;

                if(this.listAccionArray[acctions.Producto.code])
                    this.listAccionArray[acctions.Producto.code].cantidad++;
                else
                {
                    item++;
                    this.listAccionArray[acctions.Producto.code]={'item':item,'Producto':acctions.Producto,'cantidad':1}
                }
            }
        }



        return Object.keys(this.listAccionArray);
    }

    //deseleccionar
    unSelect(data) {
        data.Validate =!data.Validate;
    }



    printReport()
    {

        let arraySuccess  =[]

        this.listResult.forEach((result)=>
            {
                if(result.status !="FAILED")
                {
                    result.casillero.forEach((casillero)=>
                    {

                        casillero.acciones.forEach((accion)=>
                        {

                            let index =  arraySuccess.length>0? arraySuccess.findIndex((a)=>
                            {
                                if(a.title== accion.name)
                                {
                                    return true;
                                }
                            } ):-1;


                            if(index != -1)
                            {
                                arraySuccess[index].count +=accion.count;

                            }
                            else
                                arraySuccess.push({"title":accion.name,"count":accion.count})


                        });




                    });
                }
            })
        return arraySuccess;
    }

    saveResult(event) {
        event.preventDefault();

        if(this.getValidateList().length == 0 )
        {
            this.toastr.warning("la lista de acciones valida es nula");
        }
        else {



            this.flagSave=true;

            let that=this

            let searchdata = response =>
            {
              Object.assign(that.CLIENT,response.json());
            }


            this.httputils.doGet('/clientes/'+this.user.value.id,searchdata, this.error);







            let arraySaveTemp =[];


            let objectPost ={"cliente":that.user.value.id,"tipoAccion":that.tipoAccion.value,"acciones":[]};

            for(var a of that.listAccion)
            {
                if(a.Validate)
                    objectPost.acciones.push({"producto":{"id":a.Producto.id,"codigo":a.Producto.code,'name':a.Producto.name},"ubicacion":{"id":a.Ubicacion.id,"title":a.Ubicacion.name}});
            }

            let successCallback= response => {




                if(response.status == 500)
                {
                    this.toastr.error(response.json().message);
                }
                else
                {


                    that.elementPrint =[];



                    that.elementPrint.push({"name":that.user.value.title,"direc":that.CLIENT.direccion,'contac':that.CLIENT.telefono,'ruc':that.CLIENT.ruc});
                    that.elementPrint.push({"name":that.NOMBRE,"direc":that.DIRECCION,'contac':that.CONTACTO,'ruc':that.RUC});

                    that.listAccion=[];
                    that.listResult=response.json();

                    let objLote :any={}
                    that.listResult.find((result)=>
                    {
                        if(result.status =='CREATED')
                        {
                            objLote= result;
                            return;
                        }


                    });




                    that.lote = objLote.lote;


                    that.positionForm=3;

                    if(response.status ==200)
                        that.toastr.success("Las acciones han sido guardadas");
                    else if(response.status ==422)
                        that.toastr.warning("Algunas acciones han sido guardadas, pero hubo errores");

                }

            }
            this.httputils.doPost('/acciones/',JSON.stringify(objectPost),successCallback, successCallback);

        }


    }





    onPrint(id){
        var printContents = document.getElementById(id).innerHTML;
        var popupWin = window.open('', '_blank');
        popupWin.document.open();
        popupWin.document.write('<body onload="window.print()">' + printContents + '</body>');
        popupWin.document.head.innerHTML = (document.head.innerHTML);
        popupWin.document.close();


    }


    onPrintCss(lg, md=-1, xs=-1, sm=-1){

        return "col-lg-"+lg+" col-md-"+(md!=-1?md:lg)+" col-xs-"+(xs!=-1?xs:lg)+" col-sm-"+(sm!=-1?sm:lg);
    }


}