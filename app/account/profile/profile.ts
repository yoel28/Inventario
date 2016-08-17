import {Component, OnInit, Inject} from '@angular/core';
import { Router }           from '@angular/router-deprecated';
import { Http} from '@angular/http';
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {Xfile, Xcropit, Xeditable} from "../../common/xeditable";
import {Search} from "../../utils/search/search";
import {RestController} from "../../common/restController";
import {globalService} from "../../common/globalService";
import {User} from "../../user/user";

@Component({
    selector: 'profile',
    templateUrl: 'app/account/profile/index.html',
    styleUrls: ['app/account/profile/style.css'],
    directives: [Xeditable,Xcropit,Search,Xfile],
})
export class Profile extends RestController implements OnInit{

    public rules: any = {};
    constructor(public router: Router,public http: Http,public myglobal:globalService,public toastr: ToastsManager,@Inject(User) public user) {
        super(http,toastr);
        this.setEndpoint('/users/');
        user.initRules();
    }
    ngOnInit(){
        Object.assign(this.rules,this.user.rules)
    }
    
    public image:string;
    changeImage(data){
        this.image=data;
    }
    loadImage(){
        this.onPatch('image',this.myglobal.user,this.image);
    }

}