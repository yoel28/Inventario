import {Component, OnInit,ViewChild,Inject} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../../common/restController";
import {globalService} from "../../common/globalService";
import {Tables} from "../../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BasicConfiguration} from "../../common/basic-configuration";
declare var SystemJS:any;
@Component({
    selector: 'product-location',
    templateUrl: SystemJS.map.app+'/reports/productLocation/index.html',
    styleUrls: [SystemJS.map.app+'/reports/productLocation/style.css'],
    directives: [Tables],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})


export class ProductLocation extends BasicConfiguration implements OnInit {


    public paramsTable:any={};

    public externalSave:any={};
    public rulesSearch:any={};
    public rulesSave:any={}

    public  extLocationProducto="&group=[['field':'ubicacion','show':['title','fila','columna']],['field':'producto','show':['code','detail']]]";


    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService) {

        super("PRO_LOCATION","/inventario/diario/producto/ubicacion",http, toastr,myglobal,translate);
    }

    initRules() {

        this.rules={};

        this.rules={

            'productoCode':{
                "visible": this.permissions.visible,
                "search":this.permissions.filter,
                'icon':'fa fa-list',
                "type": "text",
                "key": "code",
                "title": "Prod. Codigo",
                "placeholder": "Codigo del producto"
            },
            'productoDetail':{
                "visible": this.permissions.visible,
                "search":this.permissions.filter,
                'icon':'fa fa-list',
                "type": "textarea",
                "key": "detail",
                "join":"producto",
                "title": "Prod. Detalle",
                "placeholder": "Detalle del producto"
            },
            'ubicacionTitle':{
                "visible": this.permissions.visible,
                "search":this.permissions.filter,
                'icon':'fa fa-list',
                "type": "text",
                "key": "title",
                "join":"ubicacion",
                "title": "Area",
                "placeholder": "Area"
            },
            'ubicacionFila':{
                "visible": this.permissions.visible,
                "search":this.permissions.filter,
                'icon':'fa fa-list',
                "type": "text",
                "key": "fila",
                "title": "Espacio",
                "placeholder": "Espacio"
            },
            'ubicacionColumna':{
                "visible": this.permissions.visible,
                "search":this.permissions.filter,
                'icon':'fa fa-list',
                "type": "text",
                "key": "columna",
                "title": "Estante",
                "placeholder": "Estante"
            },
            'cantidadProductosUbicacion':{
                "visible": this.permissions.visible,
                "search":this.permissions.filter,
                'icon':'fa fa-list',
                "type": "number",
                "key": "cantidad",
                "title": "Cantidad de productos",
                "placeholder": "cantidad de producto"
            }
        };

    }


    initParamsTable(){
        this.paramsTable.title=this.viewOptions.title;
        this.paramsTable.endpoint=this.endpoint;
        this.paramsTable.actions={};
    }

    initSaveRules() {

    }

    initOptions() {
        this.viewOptions["title"] = 'Productos por ubicación';
    }

    initSearch() {
        this.paramsSearch['title']="Cantidad de Productos por Ubicación";
        this.paramsSearch['idModal']="searchProductoLocation";
        this.paramsSearch['placeholder']="Ingrese el producto";
    }


    ngOnInit() {

        this.initRules();
        this.initSaveRules();
        this.initOptions();
        this.initSearch();
        this.initParamsTable();

        this.loadData_1(this.endpoint,this.dataList,this.extLocationProducto)


    }


    externalRules()
    {

    }

    initRuleObject()
    {

    }


    @ViewChild(Tables)
    tables:Tables;
    asignData(data) {
        if(this.dataList.page && this.dataList.page.length>1)
        {
            this.dataList.list.pop();
        }
        this.dataList.list.unshift(data);

        if(this.tables )
        {
            Object.assign(this.tables.dataList,this.dataList);
        }
    }



}

