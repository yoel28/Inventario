import {Component,Injectable, OnInit,ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";
import {BasicConfiguration} from "../common/basic-configuration";
import { Router} from '@angular/router-deprecated';

declare var SystemJS:any;
@Component({
    selector: 'tooltip',
    templateUrl: SystemJS.map.app+'/utils/viewBase/index.html',
    styleUrls: [SystemJS.map.app+'/utils/viewBase/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class Tooltip extends BasicConfiguration implements OnInit {


    public paramsTable:any={};

    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService,public router:Router) {

        super("INFO","/infos/",http, toastr,myglobal,translate,router);

    }



    initRules() {

        let tempRules = this.rules;
        this.rules={};

        this.rules["title"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            "search":this.permissions.filter,
            'icon':"fa fa-list",
            "type": "text",
            "key": "title",
            "title": "Titulo",
            "placeholder": "Ingrese el nombre del titulo",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules["code"] = {
            "update": this.permissions['update'],
            "visible": true,
            'required':true,
            "search":this.permissions.filter,
            'icon':"fa fa-list",
            "type": "text",
            "key": "code",
            "title": "Código",
            "placeholder": "Ingrese el código",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules['color']= {
            'type': 'select',
            'required': true,
            'update': this.permissions.update,
            'visible': this.permissions.visible,
            "title": "Color",
            'source': [
                {'value': 'bg-red', 'text': 'Rojo'},
                {'value': 'bg-blue', 'text': 'Azul'},
                {'value': 'bg-yellow', 'text': 'Amarillo'},
                {'value': 'bg-green', 'text': 'Verde'},
                {'value': 'bg-black', 'text': 'Negro'},
                {'value': 'bg-white', 'text': 'Blanco'},
                {'value': 'bg-purple', 'text': 'Purpura'},
                {'value': 'bg-fuchsia', 'text': 'Fucsia'},
                {'value': 'bg-grey', 'text': 'Gris'},
                {'value': 'bg-lime', 'text': 'Lima'},
                {'value': 'bg-maroon', 'text': 'Marron'},
                {'value': 'bg-olive', 'text': 'Oliva'},
                {'value': 'bg-orange', 'text': 'Naranja'},
                {'value': 'bg-pink', 'text': 'Rosado'},
                {'value': 'bg-aqua', 'text': 'Azul claro'},
            ],
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules['icon']= {
            'type': 'select',
            'required': true,
            'update': this.permissions.update,
            'visible': this.permissions.visible,
            "title": "Icono",
            'source': [
                {'value': 'fa fa-user', 'text': 'Usuario'},
                {'value': 'fa fa-list', 'text': 'Lista'},
                {'value': 'fa fa-book', 'text': 'Libro'},
            ],
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio'
                },
            }
        };
        this.rules['detail'] = tempRules['detail'];
        this.rules['enabled'] = tempRules['enabled'];

    }

    initParamsTable(){
        this.paramsTable.endpoint=this.endpoint;
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            "icon": "fa fa-trash",
            "exp": "",
            'title': 'Eliminar',
            'permission': '1',
            'message': '¿ Esta seguro de eliminar el tooltip: ',
            'keyAction':'title'
        };
    }

    initSaveRules(){

        this.paramsSave= {
            title: "Agregar Tooltip",
            idModal: "saveTooltip",
            endpoint: this.endpoint,
        }

        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave['enabled'];
        delete this.rulesSave['id'];

    }

    initOptions() {

        this.viewOptions["title"] = 'Tooltips';

        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });

    }



    initSearch() {
        this.paramsSearch['title']="Tooltip";
        this.paramsSearch['idModal']="searchTool";
        this.paramsSearch['placeholder']="Ingrese Tooltip";
    }

    ngOnInit() {


        this.initRules();
        this.initParamsTable();
        this.initSaveRules();
        this.initOptions();
        this.initSearch();
        this.loadData();
    }




    initRuleObject(){
        this.ruleObject={
            'icon':'fa fa-list',
            "type": "text",
            "key": "tooltip",
            "title": "Tooltip",
            'object':true,
            "placeholder": "Ingrese tooltip",
            'paramsSearch':this.paramsSearch,
            'permissions':this.permissions,
            'search':this.permissions.filter,
            'msg':{
                'errors':{
                    'object':'El tooltip no esta registrado',
                    'required':'El campo es obligatorio'
                },
            }
        }
    }


    externalRules(){
        this.initRules();
        this.initSearch();
        this.initRuleObject();
        this.initSaveRules();
    }
}