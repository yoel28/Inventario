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

@Component({
    selector: 'products',
    templateUrl: 'app/product/index.html',
    styleUrls: ['app/product/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService,TypeProduct,BrandProduct,ModelProduct]
})


export class Product extends RestController implements OnInit {
    
    public viewOptions:any={};
    
    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService,  @Inject(TypeProduct) public typesProduct,@Inject(BrandProduct) public brandProduct, @Inject(ModelProduct) public modelProduct) {
        super(http, toastr);
        this.setEndpoint("/productos/");

        //Search para los objetos en el momento de hacer un Save
        typesProduct.externalRules();
        brandProduct.externalRules();
        modelProduct.externalRules();
    }

    initLang(){
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
    }

    initOptions() {
        this.viewOptions["title"] = 'Productos disponibles';
        this.viewOptions["permissions"] = {"list": true};/*TODO PERMISO REAL this.myglobal.existsPermission('10')}*/
        this.viewOptions["errors"] ={};
        this.viewOptions["errors"].notFound= "no se encontraron resultados";
        this.viewOptions["errors"].list="no tiene permisos para ver los productos";

    }

}
