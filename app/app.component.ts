import {Component, provide, ViewChild, OnInit} from '@angular/core';
import { Router,RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { contentHeaders } from './common/headers';
import { AccountLogin }         from './account/account';
import { AccountRecover }         from './account/account';
import { AccountActivate }         from './account/account';
import { AccountRecoverPassword }         from './account/account';
import { Dashboard }         from './dashboard/dashboard';
import {globalService} from "./common/globalService";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {RestController} from "./common/restController";

import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {Product} from "./product/product";
import {Save} from "./utils/save/save";
import {Location_product} from "./location/location";
import {Client} from "./client/client";
import {User} from "./user/user";
import {Profile} from "./account/profile/profile";
import {Roles} from "./roles/roles";
import {Permissions} from "./permissions/permissions";
import {Operation} from "./operation/operation";
import {PermissionsAcl} from "./permissions/acl";
import {TypeProduct} from "./typeProduct/typeProduct";
import {BrandProduct} from "./brandProduct/brand";
import {ModelProduct} from "./modelProduct/modelProduct";
import {ProductAvailable} from "./reports/productAvailable";
import {UploadFile} from "./uploadFile/upload";
import {TypeCompany} from "./typeCompany/typeCompany";


@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  styleUrls:['app/app.css'],
  directives: [ROUTER_DIRECTIVES,Save],
  providers: [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
  ]
})
@RouteConfig([
  { path: '/account/login',  name: 'AccountLogin',  component: AccountLogin, useAsDefault: true },
  { path: '/account/active/:id/:token',  name: 'AccountActivate',  component: AccountActivate },
  { path: '/account/recover',  name: 'AccountRecover',  component: AccountRecover },
  { path: '/account/recoverPassword/:id/:token',  name: 'AccountRecoverPassword',  component: AccountRecoverPassword },
  { path: '/dashboard',   name: 'Dashboard', component: Dashboard },
  { path: '/product',   name: 'Product', component: Product }, 
  { path: '/location',   name: 'Location_product', component: Location_product },
  { path: '/client',   name: 'Client', component: Client },
  { path: '/user',   name: 'User', component: User },
  { path: '/user/profile',   name: 'Profile', component: Profile },
  { path: '/roles',   name: 'Roles', component: Roles },
  { path: '/permissions',   name: 'Permissions', component: Permissions },
  { path: '/permissions/acl',   name: 'PermissionsAcl', component: PermissionsAcl },
  { path: '/operation',   name: 'Operation', component: Operation },
  { path: '/typeProduct',   name: 'TypeProduct', component: TypeProduct },
  { path: '/brandProduct',   name: 'BrandProduct', component: BrandProduct },
  { path: '/modelProduct',   name: 'ModelProduct', component: ModelProduct },
  { path: '/upload',   name: 'UploadFile', component: UploadFile },

  { path: '/type/company',   name: 'TypeCompany', component: TypeCompany },





    


  { path: '/product/available',   name: 'ProductAvailable', component: ProductAvailable },
  { path: '/**', redirectTo: ['Dashboard'] }

])
export class AppComponent extends RestController implements OnInit{

  public saveUrl:string;



  constructor(public router: Router,http: Http,public myglobal:globalService,public toastr: ToastsManager) {
    
      super(http)
        //localStorage.setItem('urlAPI','http://dev.zippyttech.com:8080/api');
        //localStorage.setItem('url','http://dev.zippyttech.com:8080/');
        //localStorage.setItem('urlAPI','http://192.168.0.113:8080/api');
        //localStorage.setItem('url','http://192.168.0.113:8080/');
        localStorage.setItem('urlAPI','http://192.168.0.95:8080/api');
        localStorage.setItem('url','http://192.168.0.95:8080/');
    let that=this;
    router.subscribe(
        function(data){
          if(that.isPublic() && !localStorage.getItem('bearer')){
            that.myglobal.init=true;
          }
          else if(that.isPublic() && localStorage.getItem('bearer'))
          {
              let link = ['Dashboard', {}];
              that.router.navigate(link);
          }
          else if(!that.isPublic() && !localStorage.getItem('bearer'))
          {
              that.saveUrl = that.router.currentInstruction.component.routeName;
              let link = ['AccountLogin', {}];
              that.router.navigate(link);
          }
          else if(that.saveUrl)
          {
              let link = [that.saveUrl, {}];
              that.saveUrl = null;
              that.router.navigate(link);

          }

           if(that.myglobal.getParams('VERSION_CACHE')!=localStorage.getItem('VERSION_CACHE') && that.myglobal.getParams('VERSION_CACHE')!="")
           {
               localStorage.setItem('VERSION_CACHE',that.myglobal.getParams('VERSION_CACHE'))
               location.reload(true);
           }

        },function(error){
          console.log("entro2");
        }
    );//this.onSocket();
  }
    ngOnInit(){
        this.loadMenu();
    }

  public urlPublic=['AccountLogin','AccountActivate','AccountRecover','AccountRecoverPassword'];
  public isPublic(){
    let data = this.router.currentInstruction.component.routeName;
    let index = this.urlPublic.findIndex(obj=>obj == data);
    if(index>-1)
        return true;
    return false;
  }

  logout(event) {
    event.preventDefault();
      let that = this;
      let successCallback= response => {
          this.myglobal.init=false;
          localStorage.removeItem('bearer');
          contentHeaders.delete('Authorization');

          let link = ['AccountLogin', {}];
          this.router.navigate(link);
      }
      this.httputils.doPost('/logout',null,successCallback,this.error);

  }

  validToken(){
    if(localStorage.getItem('bearer'))
        return true;
    return false;
  }
    loadPermisos(event){
        event.preventDefault();
        this.myglobal.myPermissions();
    }
    activeMenuId:string;
    activeMenu(event,id){
        event.preventDefault();
        if(this.activeMenuId==id)
            this.activeMenuId="";
        else
            this.activeMenuId=id;

    }
    public menuItems=[];
    loadMenu(){
        this.menuItems.push({
            'visible':this.myglobal.existsPermission("1"),
            'icon':'fa fa-list',
            'title':'Panel de Productos',
            'key':'menu2',
            'treeview':[
                {
                    'visible':this.myglobal.existsPermission("1"),
                    'icon':'fa fa-list',
                    'title':'Producto',
                    'routerLink':'Product'
                },
                {
                    'visible':this.myglobal.existsPermission("1"),
                    'icon':'fa fa-list',
                    'title':'Tipo',
                    'routerLink':'TypeProduct'
                },
                {
                    'visible':this.myglobal.existsPermission("1"),
                    'icon':'fa fa-list',
                    'title':'Marca',
                    'routerLink':'BrandProduct'
                },
                {
                    'visible':this.myglobal.existsPermission("1"),
                    'icon':'fa fa-list',
                    'title':'Modelo',
                    'routerLink':'ModelProduct'
                }

            ]

        });
        this.menuItems.push({
            'visible':this.myglobal.existsPermission("1"),
            'icon':'fa fa-list',
            'title':'Reportes',
            'key':'reportes',
            'treeview':[
                {
                    'visible':this.myglobal.existsPermission("1"),
                    'icon':'fa fa-list',
                    'title':'Producto en existencia',
                    'routerLink':'ProductAvailable'
                },
            ]

        });
        this.menuItems.push({
            'visible':this.myglobal.existsPermission("1"),
            'routerLink':'Location_product',
            'icon':'fa fa-list',
            'title':'Ubicacion'

        });
        this.menuItems.push({
            'visible':this.myglobal.existsPermission("1"),
            'icon':'fa fa-list',
            'title':'Panel de Clientes',
            'key':'menu3',
            'treeview':[
                {
                    'visible':this.myglobal.existsPermission("1"),
                    'icon':'fa fa-list',
                    'title':'Clientes',
                    'routerLink':'Client'
                },
                {
                    'visible':this.myglobal.existsPermission("1"),
                    'icon':'fa fa-list',
                    'title':'Tipo de clientes',
                    'routerLink':'TypeCompany'
                }

            ]

        });


        this.menuItems.push({
            'visible':this.myglobal.existsPermission("1"),
            'routerLink':'Roles',
            'icon':'fa fa-list',
            'title':'Roles'

        });
        this.menuItems.push({
            'visible':this.myglobal.existsPermission("1"),
            'routerLink':'Permissions',
            'icon':'fa fa-list',
            'title':'Permisos'

        });
        this.menuItems.push({
            'visible':this.myglobal.existsPermission("1"),
            'routerLink':'User',
            'icon':'fa fa-list',
            'title':'Usuarios'

        });
        this.menuItems.push({
            'visible':this.myglobal.existsPermission("1"),
            'routerLink':'PermissionsAcl',
            'icon':'fa fa-list',
            'title':'ACL'

        });

        this.menuItems.push({
            'visible':this.myglobal.existsPermission("1"),
            'routerLink':'Operation',
            'icon':'fa fa-list',
            'title':'Operacion'

        });


    }
    menuItemsVisible(menu){
        let data=[];
        menu.forEach(obj=>{
            if(obj.visible)
                data.push(obj)
        })
        return data;
    }
    
}
