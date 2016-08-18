import {Component, OnInit, Injectable} from '@angular/core';
import { Http} from '@angular/http';
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {TranslateService, TranslatePipe} from "ng2-translate/ng2-translate";
import {Save} from "../utils/save/save";
import {Card} from "../utils/card/card";

@Component({
    selector: 'users',
    templateUrl: 'app/user/index.html',
    styleUrls: ['app/user/style.css'],
    pipes: [TranslatePipe],
    providers: [TranslateService],
    directives:[Save,Card]
})
@Injectable()
export class User extends RestController implements OnInit{
    public rules: any = {};
    public paramsSave: any = {};
    public paramsSearch: any = {};
    public rulesSave: any = {};
    public viewOptions: any = {};
    public viewCardOption: any = {};

    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService) {
        super(http,toastr);
        this.setEndpoint('/users/');
    }

    ngOnInit(){
        this.initLang();
        this.initRules();
        this.initSave();
        this.initSearch();
        this.initOptions();
        this.initViewCard();

        this.loadData();
    }
    initLang(){
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
    }
    initRules() {
        this.rules["image"] = {
            "update":true,
            "visible": true,
            'required':false,
            'icon':'fa fa-email',
            "type": "image",
            "key": "image",
            "title": "Imagen",
            "placeholder": "Imagen de perfil",
            'default': '/assets/img/user-guest.png',
            'msg':{
                'errors':{

                },
            },
        };
        this.rules["username"] = {
            "visible": true,
            "update":true,
            'required':true,
            'maxLength':30,
            'icon':'fa fa-user',
            "type": "text",
            "key": "username",
            "title": "Usuario",
            "placeholder": "Ingrese un nombre de usuaruio",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'maxlength':'Maximo numero de caracteres 30'
                },
            },

        };
        this.rules["name"] = {
            "update":true,
            "visible": true,
            'required':true,
            'maxLength':30,
            'icon':'fa fa-user',
            "type": "text",
            "key": "name",
            "title": "Nombre",
            "placeholder": "Ingrese el nombre",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'maxlength':'Maximo numero de caracteres 30'
                },
            },

        };
        this.rules["detail"] = {
            "visible": true,
            'required':true,
            "update":true,
            'icon':'fa fa-list',
            "type": "text",
            "key": "detail",
            "title": "Descripcion",
            "placeholder": "ingrese una descripcion",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            }
        };
        this.rules["email"] = {
            "visible": true,
            'required':true,
            "update":true,
            'maxLength':30,
            'icon':'fa fa-email',
            "type": "email",
            "key": "email",
            "title": "Email",
            "placeholder": "Ingrese un correo electronico",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'maxlength':'Maximo numero de caracteres 30',
                    'email':'Ingrese un correo valido'
                },
            },

        };
        this.rules["enabled"] = {
            "visible": true,
            'required':true,
            "update":true,
            'icon':'fa fa-email',
            "type": "boolean",
            "key": "enabled",
            "title": "Habilitada",
            "placeholder": "Cuenta habilitada",

            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },

        };
        this.rules["password"] = {
            "visible": true,
            'required':true,
            "update":true,
            'icon':'fa fa-key',
            "type": "password",
            "key": "password",
            "title": "Contraseña",
            "placeholder": "Contraseña",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },

        };
        this.rules["phone"] = {
            "visible": true,
            'required':false,
            "update":true,
            'icon':'fa fa-phone',
            "type": "number",
            "key": "phone",
            "title": "Telefono",
            "placeholder": "Ingrese un numero de telefono",
            'msg':{
                'errors':{

                },
            },

        };
    }
    initSave() {
        this.paramsSave = {
            title: "Agregar usuario",
            idModal: "modalUser",
            endpoint: this.endpoint,
        }
        this.rulesSave = this.rules;
        delete this.rulesSave["enabled"];
    }
    initSearch() {
        this.paramsSearch= {
            'permissions':'1',
            'title': "Usuario",
            'idModal': "searchUser",
            'endpointForm': "/search/usuarios/",
            'placeholderForm': "Ingrese el usuario",
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
    initOptions() {
        this.viewOptions["title"] = 'Usuarios';
        this.viewOptions["button"]=[];
        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        })
        this.viewOptions["permissions"] = {"list": true};/*TODO PERMISO REAL this.myglobal.existsPermission('10')}*/
        this.viewOptions["errors"] ={};
        this.viewOptions["errors"].notFound= "no se encontraron resultados";
        this.viewOptions["errors"].list="no tiene permisos para ver los productos";
    }
    initViewCard(){
        this.viewCardOption.field=[0,3,6];
        this.viewCardOption.offset=3;
        this.viewCardOption.endpoint=this.endpoint;
        this.viewCardOption.class="col-lg-4 col-md-4 col-xs-12 col-sm-12";
        this.viewCardOption.actions={};
        this.viewCardOption.actions.delete = {
            "icon": "fa fa-trash",
            "exp": "",
            'title': 'Eliminar',
            'permission': '1',
            'message': 'Esta seguro de eliminar',
            'keyAction':'description'
        };
        this.viewCardOption.actions.print = {
            "icon": "fa fa-print",
            "exp": "",
            'title': 'Imprimir',
            'permission': '1',
            'message': 'wii imprimir',
            'keyAction':'description'
        };

    }

    public image:string;
    changeImage(data){
        this.image=data;
    }
    loadImage(){
        this.onPatch('image',this.myglobal.user,this.image);
    }


}

