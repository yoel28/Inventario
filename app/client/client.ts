import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";

@Component({
    selector: 'client',
    templateUrl: 'app/client/index.html',
    styleUrls: ['app/client/style.css'],
    directives: [Tables]
})


export class Client extends RestController implements OnInit {

    public rules:any={} ;
    public viewOptions:any={};
    public paramsTable:any={};

    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService) {
        super(http, toastr);
        this.setEndpoint("/consulta/warehouse.json");
        //this.setEndpoint("/warehouse/");
    }

    ngOnInit()
    {

        let that = this;
        this.initOptionsView();
        this.initRules();
        this.initParamsTable();


        let successCallback= response => {
            Object.assign(that.dataList,response.json())
        }
        this.httputils.doGet(this.endpoint,successCallback,this.error,true)

    }

    initRules()
    {
        this.rules["clientCode"]={"update":false,"visible":true,"type":"text","key":"clientCode","title":"Codigo del cliente","placeholder":"ingrese el codigo del cliente"};
        this.rules["name"]={"update":true,"visible":false,"type":"text","key":"name","title":"Nombre","placeholder":"ingrese nombre"};
        this.rules["row"]={"update":true,"visible":true,"type":"text","key":"row","title":"Fila","placeholder":"ingrese la fila"};
        this.rules["column"]={"update":true,"visible":true,"type":"text","key":"column","title":"Columna","placeholder":"ingrese la columna"};
        this.rules["description"]={"update":true,"visible":true,"type":"textarea","key":"description","title":"Descripcion","placeholder":"ingrese la descripcion"};
    }

    initOptionsView()
    {
        this.viewOptions["title"] = "Ubicacion";
        this.viewOptions["permissions"] = {"list": this.myglobal.existsPermission('1')};
        this.viewOptions["errors"] = {"notFound": "no se encontraron resultados"};
        this.viewOptions["errors"] = {"list": "no tiene permisos"};
    }

    initParamsTable(){
        this.paramsTable.endpoint=this.endpoint;
        this.paramsTable.actions=[];
        this.paramsTable.actions.delete={"icon":"fa fa-trash","exp":""};
        this.paramsTable.actions.print={"icon":"fa fa-print","exp":""};

    }


}