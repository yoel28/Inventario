import {Component,Injectable, OnInit,ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../../common/globalService";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BasicConfiguration} from "../../common/basic-configuration";

declare var moment:any;



@Component({
    selector: 'print',
    templateUrl: 'app/utils/print/index.html',
    styleUrls: ['app/utils/print/style.css'],
    pipes: [TranslatePipe],
    providers: [TranslateService],
    inputs:['type'],

})
@Injectable()
export class Print extends BasicConfiguration implements OnInit {



    public type="";
    public ExternalInfo:any={};
    


    constructor(public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
        super("PRINT","",http, toastr,myglobal,translate);


    }



    formatDate(date, format) {
        if (date)
            return moment(date).format(format);
        return "-";
    }

    initOptions(){}
    initRules(){}
    initSearch(){}
    initRuleObject(){}
    externalRules(){}

    ngOnInit() {


    }


    onPrintCss(lg, md=-1, xs=-1, sm=-1){

        return "col-lg-"+lg+" col-md-"+(md!=-1?md:lg)+" col-xs-"+(xs!=-1?xs:lg)+" col-sm-"+(sm!=-1?sm:lg);
    }

    onPrint(id){
        var printContents = document.getElementById(id).innerHTML;
        var popupWin = window.open('', '_blank');
        popupWin.document.open();
        popupWin.document.write('<body onload="window.print()">' + printContents + '</body>');
        popupWin.document.head.innerHTML = (document.head.innerHTML);
        popupWin.document.close();


    }

}