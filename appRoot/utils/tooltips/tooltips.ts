import {Component, OnInit} from '@angular/core';
import {globalService} from "../../common/globalService";

declare var SystemJS:any;
declare var moment:any;
declare var jQuery:any;

@Component({
    selector: 'tooltip',
    templateUrl: SystemJS.map.app+'/utils/tooltips/index.html',
    styleUrls: [SystemJS.map.app+'/utils/tooltips/style.css'],
    inputs: ['code'],
})
export class Tooltip implements OnInit{

    public permissions:any;
    public code="";
    public data:any={};
    public prefix="INFO";


    public configId=moment().valueOf();

    constructor(public myglobal:globalService) {
        this.permissions = {};
        this.permissions={'update':this.myglobal.existsPermission(this.prefix+'_UPDATE')};
    }
    ngOnInit() {
        this.configId='TOOLTIP_'+this.configId+'_'+this.code;
        if(this.code && this.code.length>0){
            this.data=this.myglobal.getTooltip(this.code);
        }
    }
    ngAfterViewInit()
    {
        let that=this;
        if(this.data && this.data.id){
            jQuery('#'+this.configId).popover({
                trigger: "hover"
            });
        }
    }
    edit(event,data){
        event.preventDefault();
        if(this.permissions.update){
            if(this.myglobal.objectInstance[this.prefix]){
                this.myglobal.objectInstance[this.prefix].setLoadDataModel(data);
            }
        }
    }

}
