import {Component, EventEmitter, OnInit,ViewChild} from "@angular/core";
import {FormBuilder, Validators, Control, ControlGroup} from "@angular/common";
import {RestController} from "../../common/restController";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {globalService} from "../../common/globalService";
import {Xeditable} from "../../common/xeditable";
import {Search} from "../search/search";
import {Filter} from "../filter/filter";
import {Save} from "../save/save";


@Component({
    selector: 'less-list',
    templateUrl: 'app/utils/lessList/index.html',
    styleUrls: ['app/utils/lessList/style.css'],
    inputs:['paramSearch','externalEndPoint','rulesDetalis']
})


export class LessList extends RestController implements OnInit {


    public params:any={};
    public rules:any={};
    public paramSearch:any={};
    public externalEndPoint="";
    public  detailsSearh:any={};
    public rulesDetalis:any={};


   constructor(public _formBuilder: FormBuilder,public http:Http,public toastr: ToastsManager, public myglobal:globalService) {
        super(http,toastr);
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
    
    ngOnInit() {
        this.setEndpoint(this.paramSearch.endpoint);

        this.initForm();
        this.loadData();
    }


    searchDetalles(data)
    {

        if(this.detailsSearh['id'])
        {
            this.detailsSearh={}

        }
        else
        {
            let that = this;

            let successCallback= response => {
                Object.assign(that.detailsSearh, response.json());

            }
            this.httputils.doGet(this.externalEndPoint+"/"+data.id,successCallback,this.error)
        }




    }


    getKeys()
    {
        let data=[];
        let that=this;
        Object.keys(this.rulesDetalis).forEach((key)=>{

                data.push(key)
        });
        return data;
    }
    
    

    

}