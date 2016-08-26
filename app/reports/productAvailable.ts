import {Component, OnInit,ViewChild,ReflectiveInjector,Inject} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";
import {TypeProduct} from "../typeProduct/typeProduct";
import {BrandProduct} from "../brandProduct/brand";
import {ModelProduct} from "../modelProduct/modelProduct";
import {DateRangepPicker} from "../common/xeditable";

@Component({
    selector: 'products-available',
    templateUrl: 'app/reports/productAvailable.html',
    styleUrls: ['app/reports/style.css'],
    directives: [Tables,Save,DateRangepPicker],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})


export class ProductAvailable extends RestController implements OnInit {
    
    public viewOptions:any={};
    public paramsDate:any={};
    public date:any={};
    public dateWhere=[];

    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService) {
        super(http, toastr);
        this.setEndpoint("/inventario/historico/cantidad/");

        //Search para los objetos en el momento de hacer un Save
    }

    initLang(){
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
    }

    initPermissions(){
        
    }
    
    initOptions() {
        this.viewOptions["title"] = 'Productos disponibles';
        this.viewOptions["permissions"] = {"list": true};/*TODO PERMISO REAL this.myglobal.existsPermission('10')}*/
        this.viewOptions["errors"] ={};
        this.viewOptions["errors"].notFound= "no se encontraron resultados";
        this.viewOptions["errors"].list="no tiene permisos para ver los productos";

    }
    ngOnInit(){
        this.initOptions();
        this.initParamsDate();
    }
    assignDate(data){
        this.date=data;

        let start = data.start.split("/");
        let end   = data.end.split("/")

        this.dateWhere=[[{'op':'ge','field':'dia','value':start[0]},{'op':'le','field':'dia','value':end[0]}],
                        [{'op':'ge','field':'mes','value':start[1]},{'op':'le','field':'mes','value':end[1]}],
                        [{'op':'ge','field':'year','value':start[2]},{'op':'le','field':'day','year':end[2]}]];




        this.where="&where="+encodeURI(JSON.stringify(this.dateWhere).split('{').join('[').split('}').join(']'));


        this.loadData();


    }
    initParamsDate(){
        this.paramsDate['format']="DD/MM/YYYY";
    }

}
