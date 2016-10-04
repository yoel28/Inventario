import {Component, OnInit, Injectable,ViewChild} from '@angular/core';
import { Http} from '@angular/http';
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {TranslateService, TranslatePipe} from "ng2-translate/ng2-translate";
import {Save} from "../utils/save/save";
import {Card} from "../utils/card/card";
import {LessList} from "../utils/lessList/lessList";
import {BasicConfiguration} from "../common/basic-configuration";
import {Roles} from "../roles/roles";

@Component({
    selector: 'users',
    templateUrl: 'app/user/index.html',
    styleUrls: ['app/user/style.css'],
    pipes: [TranslatePipe],
    providers: [TranslateService,Roles],
    directives:[Save,Card,LessList]
})
@Injectable()
export class User extends BasicConfiguration implements OnInit{


    public externalList:any={};

    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService, public  roles:Roles) {
        super("US","/users/",http, toastr,myglobal,translate);

        this.roles.externalRules();

    }

    initRules() {
        let tempRules = this.rules;
        this.rules={};

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

        this.rules["email"] = {
            "visible": true,
            'required':true,
            "update":true,
            'maxLength':30,
            'icon':'fa fa-email',
            "type": "text",
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
            'required':true,
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


        this.rules["roles"] = this.roles.ruleObject;
        this.rules["roles"].visible =true;
        this.rules["roles"].type="array";
        this.rules["roles"].buttonTitle="Mostrar roles";


        this.rules['detail'] = tempRules['detail'];
        this.rules['enabled'] = tempRules['enabled'];
    }

    initSaveRules() {
        this.paramsSave = {
            title: "Agregar usuario",
            idModal: "modalUser",
            endpoint: this.endpoint,
        }
        delete this.rules['enabled'];
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave['roles']
    }

    initOptions() {

        this.viewOptions["title"] = 'Usuarios';

        this.viewOptions["button"].push({
            'title':'Agregar',
            'class':'btn btn-primary',
            'icon':'fa fa-plus',
            'modal':this.paramsSave.idModal
        });

    }

    initSearch() {


        this.paramsSearch['title'] = "Usuarios";
        this.paramsSearch['idModal'] = "searchUser";
        this.paramsSearch['placeholder'] = "Ingrese el usuario";
    }

    externalRules()
    {}

    initRuleObject()
    {}

    ngOnInit(){


        let that = this;
        let successCallback= response => {
            let key =that.roles.ruleObject.key;
            that.externalList[key]={};
            that.externalList[key] = response.json();
            if(that.lessList)
                that.lessList.externalList=that.externalList;

        }
        this.httputils.doGet("/search"+this.roles.endpoint,successCallback,this.error);

        this.initRules();
        this.initSaveRules();
        this.initSearch();
        this.initOptions();
    }







//momento de agregar con el lesslist
    @ViewChild(LessList)
    lessList:LessList;
    asignData(data) {

        if(this.lessList )
        {
            this.lessList.dataList.list.unshift({"id":data.id,"title":data.email,"detail":data.username});

            if(this.lessList.dataList.page && this.lessList.dataList.page.length>1)
            {
                this.lessList.dataList.list.pop();
            }

        }

    }


}

