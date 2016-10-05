import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../../common/globalService";
import {Xeditable} from "../../common/xeditable";
import {Search} from "../search/search";
import {Filter} from "../filter/filter";
import {Save} from "../save/save";

declare var SystemJS:any;
@Component({
    selector: 'tables-offline',
    templateUrl: SystemJS.map.app+'/utils/tableOffline/index.html',
    styleUrls: [SystemJS.map.app+'/utils/tableOffline/style.css'],
    inputs:['rules','dataList'],
    directives:[Xeditable,Search,Filter,Save]
})


export class TablesOffline implements OnInit {

    public  rules:any={}
    public  dataList =[]


    constructor(public http:Http,public toastr: ToastsManager, public myglobal:globalService) {

    }

    ngOnInit()
    {
        
    }


    getkeysRules(){
        let data=[];
        let that=this;
        Object.keys(this.rules).forEach((key)=>{
                data.push(key)
        });
        return data;
    }


}