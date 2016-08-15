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
import {Warehouse} from "./warehouse/warehouse";
import {Save} from "./utils/save/save";

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
  { path: '/warehouse',   name: 'Warehouse', component: Warehouse },
  { path: '/**', redirectTo: ['Warehouse'] }

])
export class AppComponent extends RestController implements OnInit{

  public saveUrl:string;



  constructor(public router: Router,http: Http,public myglobal:globalService,public toastr: ToastsManager) {

      super(http)
        localStorage.setItem('urlAPI','http://dev.zippyttech.com:8080/api');
        localStorage.setItem('url','http://dev.zippyttech.com:8080');
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

}
