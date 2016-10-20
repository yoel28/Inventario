import {Component, OnInit,ViewChild,Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../common/globalService";
import {Tables} from "../utils/tables/tables";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Save} from "../utils/save/save";
import {BasicConfiguration} from "../common/basic-configuration";
declare var SystemJS:any;
@Component({
    selector: 'infos',
    templateUrl: SystemJS.map.app+'/info/index.html',
    styleUrls: [SystemJS.map.app+'/info/style.css'],
    directives: [Tables,Save],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class Info extends BasicConfiguration implements OnInit {


    public paramsTable:any = {};


    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
        super("INFO", "/infos/", http, toastr, myglobal, translate);
    }

    initRules() {

        let tempRules = this.rules;
        this.rules={};

        this.rules['code']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'code',
            'icon': 'fa fa-key',
            'title': 'Codigo',
            'placeholder': 'Ingrese el codigo',
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
        }
        this.rules['title']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'title',
            'icon': 'fa fa-key',
            'title': 'Título',
            'placeholder': 'Ingrese el título',
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
        }
        this.rules['color']={
            'type': 'color',
            'required':true,
            'update':this.permissions.update,
            'search':false,
            'visible':this.permissions.visible,
            'key': 'color',
            'value':'00ff00',
            'title': 'Color',
            'placeholder': '#000',
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
        }
        this.rules['position']={
            'type': 'select',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'source': [
                {'value': 'top', 'text': 'Arriba'},
                {'value': 'bottom', 'text':'Abajo'},
                {'value': 'left', 'text': 'Izquierda'},
                {'value': 'right', 'text': 'Derecha'},
            ],
            'key': 'position',
            'title': 'Posición',
            'placeholder': 'Selecccione una posición',
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
        }
        this.rules['size']={
            'type': 'select',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'source': [
                {'value': 'fa', 'text': 'Normal'},
                {'value': 'fa-lg', 'text':'Lg'},
                {'value': 'fa-2x', 'text':'2x'},
                {'value': 'fa-3x', 'text':'3x'},
                {'value': 'fa-4x', 'text':'4x'},
                {'value': 'fa-5x', 'text':'5x'},

            ],
            'key': 'size',
            'title': 'Tamaño',
            'placeholder': 'Selecccione un tamaño',
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
        }
        this.rules['icon']={
            'type': 'select',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'source': [
                {'value': 'fa fa-question-circle', 'text': 'Interrogante 1'},
                {'value': 'fa fa-question', 'text': 'Interrogante 2'},
            ],
            'key': 'icon',
            'title': 'Icono',
            'placeholder': 'Selecccione un icono',
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },
        }


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
            'permission': this.permissions.delete,
            'message': 'Esta seguro de eliminar la info  ',
            'keyAction':'code'
        }

    }

    initSaveRules() {
        this.paramsSave= {
            title: "Agregar información",
            idModal: "saveInfo",
            endpoint: this.endpoint,
        }
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave['enabled'];
        delete this.rulesSave['id'];
    }

    initOptions() {

        this.viewOptions["title"] = 'Información';

        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });


    }

    initSearch() {

        this.paramsSearch['title']="Información";
        this.paramsSearch['idModal']="searchInfo";
        this.paramsSearch['placeholder']="Ingrese el info";

    }

    ngOnInit() {

        this.initRules();
        this.initParamsTable();
        this.initSaveRules();
        this.initOptions();
        this.initSearch();
        this.loadData();

    }

    externalRules(){
        this.initRules();
        this.initSearch();
        this.initRuleObject();
        this.initSaveRules();
    }

    initRuleObject(){
        this.ruleObject={
            'icon':'fa fa-list',
            "type": "text",
            "key": "info",
            "title": "Información",
            'object':true,
            "placeholder": "Ingrese el titulo del info",
            'paramsSearch':this.paramsSearch,
            'permissions':this.permissions,
            'search':this.permissions.filter,
            'msg':{
                'errors':{
                    'object':'el info no esta registrado',
                    'required':'El campo es obligatorio'
                },
            }
        }
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

        this.dataList.count++;
    }



}


