import {Component, OnInit,ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../common/restController";
import {globalService} from "../common/globalService";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {SMDropdown} from "../common/xeditable";

@Component({
    selector: 'permissions-acl',
    templateUrl: 'app/permissions/acl.html',
    styleUrls: ['app/permissions/style.css'],
    pipes: [TranslatePipe],
    directives:[SMDropdown],
    providers: [TranslateService]
})


export class PermissionsAcl extends RestController implements OnInit {

    public viewOptions:any={};

    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
        super(http, toastr);
    }
    ngOnInit() {
        this.initLang();
        this.initOptions();

        this.initPermissions();
        this.initPermissionsAll();
        this.initRolesPermissionsAll();



    }
    initLang() {
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(es|en)/gi.test(userLang) ? userLang : 'es';
        this.translate.setDefaultLang('en');
        this.translate.use(userLang);
    }
    initOptions(){
        this.viewOptions["title"] = 'Lista de control de accesso';
        this.viewOptions["errors"] ={};
        this.viewOptions["errors"].notFound= "No se encontraron resultados";
        this.viewOptions["errors"].listPermissions="No tiene permisos para listar esta pagina";
        this.viewOptions["errors"].listRoles="No tiene permisos para listar los roles";
    }
    public permissions:any={};
    initPermissions(){
        this.permissions['listPermissions']=this.myglobal.existsPermission('1'); 
        this.permissions['listRoles']=this.myglobal.existsPermission('1');
    }
    
    //Cargar Todos los permisos
    public permissionsAll:any={};
    initPermissionsAll(){
        if(this.permissions['listPermissions']){
            let that = this;
            let successCallback= response => {
                let data = response.json();
                if(data){
                    Object.assign(that.permissionsAll,that.formatAcl(data.list));
                }
            }
            this.httputils.doGet("/permissions/?max=1000",successCallback,this.error)   
        }
    }
    //Cargar Roles con sus permisos
    public rolesPermissionsAll:any={};
    public itemsSelect:any = [];
    initRolesPermissionsAll(){
        if(this.permissions['listRoles'])
        {
            let successCallback= response => {
                Object.assign(this.rolesPermissionsAll, response.json());
                this.itemsSelect=[];
                this.rolesPermissionsAll.list.forEach(obj=>{
                    this.itemsSelect.push({id:obj.id,text:obj.authority});
                });
            };
            this.httputils.doGet('/roles/',successCallback,this.error)
        }
    }

    //Cargar Rol Seleccionado en la variable role
    public role:any={};
    public setRole(id){
        if(id){
            if(this.role.id!=id){
                let index = this.rolesPermissionsAll.list.findIndex(obj => obj.id == id);
                if(index>-1)
                    Object.assign(this.role,this.rolesPermissionsAll.list[index]);
            }
        }
    }
    public existsPermission(id){
        let index = this.role.permissions.findIndex(obj => obj.id == id);
        if(index > -1)
            return true;
        return false;
    }
    assignPermission(id){
        let index = this.role.permissions.findIndex(obj => obj.id == id);
        if(index > -1)
            this.role.permissions.splice(index,1);
        else
            this.role.permissions.push({'id':id});

    }
    selectPermission(selectAll){
        this.role.permissions=[];
        if(selectAll){
            Object.keys(this.permissionsAll).forEach(key=>{
                this.permissionsAll[key].forEach(obj=>{
                    this.role.permissions.push({'id':obj.id});
                })
            });
        }
    }
    savePermissions(){
        let permissions=[];
        this.role.permissions.forEach(obj=>{
            permissions.push(obj.id);
        });
        let body = JSON.stringify({'permissions':permissions});
        let successCallback= response => {
            let index = this.rolesPermissionsAll.list.findIndex(obj => obj.id == this.role.id);
            this.rolesPermissionsAll.list[index].permissions = this.role.permissions;
            this.toastr.success('Guardado con éxito')
        }
        this.httputils.doPost('/role/'+this.role.id+'/permissions/',body,successCallback,this.error)
    }

    formatAcl(value:any){
        let data = {};
        value.forEach(obj=>{
            let modulo = obj.module;
            data[modulo]=[];
            value.forEach((obj1,index)=>{
                if(obj1.module == modulo)
                {
                    data[modulo].push(obj1);
                    delete value[index];
                }
            })
        });
        return data;
    }
    getKeys(data){
        return Object.keys(data);

    }









}
