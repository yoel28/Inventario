import {Component, OnInit, Injectable} from '@angular/core';
import { Http} from '@angular/http';
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {TranslateService, TranslatePipe} from "ng2-translate/ng2-translate";

@Component({
    selector: 'users',
    templateUrl: 'app/user/index.html',
    styleUrls: ['app/user/style.css'],
    pipes: [TranslatePipe],
    providers: [TranslateService]
})
@Injectable()
export class User extends RestController implements OnInit{
    public rules: any = {};
    constructor(public http: Http, public toastr: ToastsManager, public myglobal: globalService,public translate: TranslateService) {
        super(http,toastr);
        this.setEndpoint('/users/');
    }

    ngOnInit(){
        this.initLang();
        this.initRules();
    }
    initLang(){
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
    }
    initRules() {
        let update =true; /!*this.myglobal.existsPermission("1");*!/

        this.rules["username"] = {
            "update": update,
            "visible": true,
            'required':true,
            'maxLength':30,
            'icon':'fa fa-user',
            "type": "text",
            "key": "username",
            "title": "Nombre de usuario",
            "placeholder": "Ingrese un nombre de usuaruio",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'maxlength':'Maximo numero de caracteres 30'
                },
            },

        };
        this.rules["name"] = {
            "update": update,
            "visible": true,
            'required':true,
            'maxLength':30,
            'icon':'fa fa-user',
            "type": "text",
            "key": "name",
            "title": "Ingrese el nombre",
            "placeholder": "Ingrese el nombre",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'maxlength':'Maximo numero de caracteres 30'
                },
            },

        };
        this.rules["detail"] = {
            "update": update,
            "visible": true,
            'required':true,
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
            "update": update,
            "visible": true,
            'required':true,
            'maxLength':30,
            'icon':'fa fa-email',
            "type": "email",
            "key": "email",
            "title": "Ingrese un correo electronico",
            "placeholder": "Ingrese un correo electronico",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                    'maxlength':'Maximo numero de caracteres 30'
                },
            },

        };
        this.rules["enabled"] = {
            "update": update,
            "visible": true,
            'required':true,
            'icon':'fa fa-email',
            "type": "boolean",
            "key": "enabled",
            "title": "Cuenta habilitada",
            "placeholder": "Cuenta habilitada",
            'msg':{
                'errors':{
                    'required':'El campo es obligatorio',
                },
            },

        };
        this.rules["image"] = {
            "update": update,
            "visible": true,
            'required':false,
            'icon':'fa fa-email',
            "type": "image",
            "key": "image",
            "title": "Imagen de perfil",
            "placeholder": "Imagen de perfil",
            'msg':{
                'errors':{

                },
            },
        };
        this.rules["password"] = {
            "update": update,
            "visible": true,
            'required':true,
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
            "update": update,
            "visible": true,
            'required':false,
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

    public image:string;
    changeImage(data){
        this.image=data;
    }
    loadImage(){
        this.onPatch('image',this.myglobal.user,this.image);
    }

}

