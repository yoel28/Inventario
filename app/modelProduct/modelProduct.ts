import {Component,Injectable, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";

@Component({
    selector: 'model-product',
    templateUrl: 'app/modelProduct/index.html',
    styleUrls: ['app/modelProduct/style.css'],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class ModelProduct extends RestController implements OnInit {


    public paramsSearch:any = {};

    public paramsSave :any ={};
    public rulesSave :any={};


    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
        super(http, toastr);
        this.setEndpoint("/modelos/");
    }


    initLang() {
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
    }


    initSearch() {

        this.paramsSearch = {

            //TODO apregar el permiso
            'permissions': '1',
            'title': "Modelo Producto",
            'idModal': "searchModelProduct",
            'endpointForm': "/search/modelos/",
            'placeholderForm': "Ingrese del modelo producto",
            'labelForm': {name: "Nombre: ", detail: "Detalle: "},
            'msg': {
                'errors': {
                    'noAuthorized': 'No posee permisos para esta accion',
                },
            },
            'where':'',
            'imageGuest':'/assets/img/truck-guest.png'
        };
    }

    initSaveRules()
    {

        this.paramsSave= {
            title: "Agregar modelo de producto",
            idModal: "searchProductos",
            endpoint: this.endpoint,
        }
        
        this.rulesSave = {
            'title': {
                'type': 'text',
                'display': null,
                'title': 'Nombre de titulo',
                'placeholder': 'Ingrese el titulo',
                'search': true
            },
            'detail': {
                'type': 'text',
                'display': null,
                'title': 'Detalle',
                'placeholder': 'Ingrese el  detalle',
                'search': true
            }
        };
        
    }


    ngOnInit() {
        this.initSearch();
    }

}