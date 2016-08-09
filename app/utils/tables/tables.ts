import {Component, EventEmitter, OnInit} from "@angular/core";
import {FormBuilder, Validators, Control, ControlGroup} from "@angular/common";
import {RestController} from "../../common/restController";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../../common/globalService";
import {Xeditable} from "../../common/xeditable";

@Component({
    selector: 'tables',
    templateUrl: 'app/utils/tables/index.html',
    styleUrls: ['app/utils/tables/style.css'],
    inputs:['params','rules','dataList'],
    directives:[Xeditable]
})


export class Tables extends RestController implements OnInit {


    public params:any={};
    public rules:any={};
    public searchId:any={};
    data:any = [];
    public keys:any = [];
    form:ControlGroup;


    constructor(public _formBuilder: FormBuilder,public http:Http,public toastr: ToastsManager, public myglobal:globalService) {
        super(http,toastr);
    }

    ngOnInit()
    {
        this.initForm();
    }


    initForm() {
        let that = this;
        this.keys = Object.keys(this.rules);


        Object.keys(this.rules).forEach((key)=> {

            that.data[key] = [];
            let validators=[];
            if(that.rules[key].required)
                validators.push(Validators.required)
            if(that.rules[key].maxLength)
                validators.push(Validators.maxLength(that.rules[key].maxLength))
            if(that.rules[key].minLength)
                validators.push(Validators.minLength(that.rules[key].minLength))
            if(that.rules[key].object)
            {
                validators.push(
                (c:Control)=> {
                    if(c.value && c.value.length > 0){
                        if(that.searchId[key]){
                            if(that.searchId[key].detail == c.value)
                                return null;
                        }
                        return {myobject: {valid: false}};
                    }
                    return null;
                });
            }


                that.data[key] = new Control("",Validators.compose(validators));

        });

        this.form = this._formBuilder.group(this.data);



    }
    keyVisible(){
        let data=[];
        let that=this;
        Object.keys(this.rules).forEach((key)=>{
            if(that.rules[key].visible)
                data.push(key)
        });
        return data;
    }
    getKeys(data){
        return Object.keys(data);
    }


}
