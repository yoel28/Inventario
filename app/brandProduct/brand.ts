import {Component,Injectable, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";

@Component({
    selector: 'brand-product',
    templateUrl: 'app/brandProduct/index.html',
    styleUrls: ['app/brandProduct/style.css'],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class BrandProduct extends RestController implements OnInit {


    public paramsSearch:any = {};


    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
        super(http, toastr);
        this.setEndpoint("/marcas/");
    }




    initLang() {
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
    }



    initSearch()
    {

        this.paramsSearch= {

            //TODO apregar el permiso
            'permissions':'1',
            'title': "Marca Producto",
            'idModal': "searchBrandProduct",
            'endpointForm': "/search/marcas/",
            'placeholderForm': "Ingrese la marca de producto",
            'labelForm': {name: "Nombre: ", detail: "Detalle: "},
            'msg': {
                'errors': {
                    'noAuthorized': 'No posee permisos para esta accion',
                },
            }
        };
    }


    ngOnInit()
    {
        this.initSearch();
    }




}