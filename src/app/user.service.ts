import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { uinfo } from "./userinfo.model";
import {Subject} from 'rxjs';
import * as CryptoJS from 'crypto-js';
@Injectable({providedIn: 'root'})
export class userservice{



   
arr : uinfo [] = [];
updatedUsers = new Subject <uinfo[]>();

editArr = new Subject<any>();

editid!: number;

editvar : boolean = false;
  fname!: string;
  lname!: string;
  email!: string;
  contactno!: string;
  password!: string;
  newpassword!: string;
  sex!: string;
  signupvar!: boolean;
  us! : userservice;
  hide : boolean = true;
  userarr : uinfo [] =[];
  sexarr = [
    {value: 'Male'},
    {value: 'Female'},
    {value: 'Other'}
  ];
signinStatusvar : boolean =false;
currentusermail! : string;
currentuserpassword!: string;
    sup : boolean = false;

    url = "https://localhost:3000/"

    constructor(private http : HttpClient){

    }

    signinStatus(x:boolean, usermail : string, pass:string){

        this.signinStatusvar=x;
        this.currentusermail=usermail;
        this.currentuserpassword=pass;
        
    }

    returnCUrrentusermail()
    {
        return this.currentusermail;
    }
    returnSigninStatus(){
        return this.signinStatusvar;
    }
    updatedUsersListener(){
        this.listner();
        return this.updatedUsers.asObservable();
    }

    supp(v:boolean)
    {
        this.sup = v;
    }

    getsup(){
     
        return this.sup;
    }

    usersdata(a:uinfo[]){
      
        this.arr = a;

        
    }

    fetchuinfo()
    {
        return this.arr;

    }
    
    async listner(){
        const demoarr:any =  await this.getUsersfromDB().toPromise();
           this.arr=demoarr;
        

        this.updatedUsers.next([...this.arr]);
        return this.updatedUsers.asObservable();
    }
    getUsersfromDB(){

        return this.http.get("api/");

        

    }

    getUserById(id:string)
    {         const urlid = 'api' + id
               
           return this.http.get(urlid);

    }

    addUsertoDB( f : string, l : string, s : string, email:string, c : string, p : string, d: string){
        p = this.set('123456$#@$^@1ERF', p);
        const postall : uinfo = { fname : f, lname : l, sex : s, email: email, contact : c, password : p ,         date : d}; 
         this.http.post("api/", postall).subscribe();
        //  this.arr.push(postall);
        //  this.updatedUsers.next([...this.arr]) ;
        this.listner();
    }

    deleteUserfromDB(r:any){
            this.http.delete("api/d/" + r).subscribe();
            this.listner();
   }

   editUser(f : string, l : string, s : string, email:string, c : string, p : string , id:string, d : string){
        const data : uinfo = { fname : f, lname : l, sex : s, email: email, contact : c, password : p, date : d };
        this.http.put("api/"+ id, data).subscribe();

   }
   set(keys:any, value:any){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(keys:any, value:any){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}