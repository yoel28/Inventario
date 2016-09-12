import {ElementRef, Directive, EventEmitter, Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {HttpUtils} from "../common/http-utils";

import {globalService} from "./globalService";

//documentacion https://select2.github.io/examples.html
declare var jQuery:any;


@Directive({
    selector: "[select-2]",
    inputs: [ 'rules','data','placeholder','elements','function'],
    outputs: ['success']
})

export class Select2 implements OnInit {



    public rules:any = {};
    public data =[];
    public success:any;
    public httputils:HttpUtils;
    public placeholder=""
    private elements = [];
    public function:any;

    
    
    
    constructor(public el:ElementRef, public http:Http,public myglobal:globalService, public toastr?:ToastsManager) {
        this.success = new EventEmitter();
        this.httputils = new HttpUtils(http, toastr); 
        }


    ngOnInit() {

        let that = this;

        let elemt=jQuery(this.el.nativeElement).select2({
            placeholder: (that.placeholder||"no esta definido"),
            allowClear: true,
            data: that.data,
        });

        elemt.on("select2:select", function (e,params) {
            that.elements.push(e.params.data.id);
            
            if(that.function)
            {
               that.function();
            }
        });


        elemt.on("select2:unselect", function (e,params) {
            var i = that.elements.indexOf(e.params.data.id);
            if(i != -1)
                that.elements.splice(i, 1);

            if(that.function)
            {
                that.function();
            }
        });



    }


}