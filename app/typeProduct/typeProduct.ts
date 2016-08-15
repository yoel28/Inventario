import {Component,Injectable, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";

@Component({
    selector: 'type-product',
    templateUrl: 'app/typeProduct/index.html',
    styleUrls: ['app/typeProduct/style.css'],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class TypeProduct extends RestController implements OnInit {


    public paramsSearch:any = {};


    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
        super(http, toastr);
        this.setEndpoint("/tipo/productos/");
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
            'title': "Tipo Producto",
            'idModal': "searchtypeProduct",
            'endpointForm': "/search/tipo/productos/",
            'placeholderForm': "Ingrese el tipo producto",
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