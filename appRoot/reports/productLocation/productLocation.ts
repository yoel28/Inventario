import {Component, OnInit,ViewChild,Inject} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../../common/globalService";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BasicConfiguration} from "../../common/basic-configuration";
import {Reports} from "../../utils/reports/report";
import { Router} from '@angular/router-deprecated';

declare var SystemJS:any;
@Component({
    selector: 'product-location',
    templateUrl: SystemJS.map.app+'/reports/productLocation/index.html',
    styleUrls: [SystemJS.map.app+'/reports/productLocation/style.css'],
    directives: [Reports],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})


export class ProductLocation extends BasicConfiguration implements OnInit {

    public paramsTable:any={};
    public endPointHis = "/inventario/historico/producto/ubicacion";
    public endPointAct = "/inventario/diario/producto/ubicacion";
    public defaultGroup={
        "/inventario/historico/producto/ubicacion":"['field':'ubicacion','show':['code']],['field':'producto','show':['code','detail']]",
        "/inventario/diario/producto/ubicacion":"['field':'ubicacion','show':['title','fila','columna']],['field':'producto','show':['code','detail']]",
    }
    public totalTitle='Total';


    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService,public router:Router) {

        super("PRO_LOCATION","/inventario/diario/producto/ubicacion",http, toastr,myglobal,translate,router);
    }

    public paramsFilter:any = {
        title: "Filtrar productos por ubicación",
        idModal: "modalFilter",
        endpoint: "",
    };

    initOptions() {
        this.viewOptions["title"] = 'Productos por ubicación';
        this.viewOptions["groupOptions"] = false;
    }

    initRules() {
        this.rules={};

        this.rules={
            'ubicacionCode':{
                "visible": this.permissions.visible,
                "search":true,
                'icon':'fa fa-list',
                "type": "text",
                "key": "code",
                "join":"ubicacion",
                "title": "Ubicación",
                "placeholder": "Ubicación"
            },

            'productoCode':{
                "visible": this.permissions.visible,
                "search":false,
                'icon':'fa fa-list',
                "type": "text",
                "key": "code",
                "title": "Prod. Codigo",
                "placeholder": "Codigo del producto"
            },
            'productoDetail':{
                "visible": this.permissions.visible,
                "search":false,
                'icon':'fa fa-list',
                "type": "textarea",
                "key": "detail",
                "join":"producto",
                "title": "Prod. Detalle",
                "placeholder": "Detalle del producto"
            },
            'cantidadProductosUbicacion':{
                "visible": this.permissions.visible,
                "search":false,
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

    ngOnInit() {
        this.initOptions();
        this.initParamsTable();
        this.initRules();
    }


    initSearch() {
    }

    externalRules()
    {

    }

    initRuleObject()
    {

    }


}

