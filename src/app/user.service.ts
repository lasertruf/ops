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
 // contactno!: string;
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
currentusersorb! : string;

currentuserpassword!: string;
    sup : boolean = false;

    url = "https://localhost:3000/"

    constructor(private http : HttpClient){

    }

    signinStatus(x:boolean, usermail : string, pass:string, sorb : string){

        this.signinStatusvar=x;
        this.currentusermail=usermail;
        this.currentuserpassword=pass;
        this.currentusersorb=sorb;
        
    }

    returnCurrentusermail()
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
    getUserbyEmail(email : string)
    {
        return this.http.get("api/getuserbyemail/" + email );
    }
    getUsersfromDB(){

        return this.http.get("api/");

        

    }

    getSoldbooksFromDB(){
        return this.http.get("api/getsoldbooks/");
    }

    getUserById(id:string)
    {         const urlid = 'api/getuserbyid/' + id
               
           return this.http.get(urlid);

    }

    addUsertoDB( f : string, l : string, s : string, email:string, p : string){
        p = this.set('123456$#@$^@1ERF', p);
        const postall  = { fname : f, lname : l, sorb : s, email: email, password : p}; 
         this.http.post("api/postuser/", postall).subscribe();
        //  this.arr.push(postall);
        //  this.updatedUsers.next([...this.arr]) ;
        this.listner();
    }

    deleteUserfromDB(r:any){
            this.http.delete("api/d/" + r).subscribe();
            this.listner();
   }

   editUser(f : string, l : string, s : string, email:string,  p : string , id:string, d : string){
        const data  = { fname : f, lname : l, sorb : s, email: email, password : p, date : d };
        this.http.put("api/"+ id, data).subscribe();

   }

pushbook(id : string, bname : string, authname : string, qty : number){
    
  const data = {bname : bname , qty : qty , authname : authname};
    this.http.put("api/pushbook/"+ id , data).subscribe();
}

putbook(id : string, bname : string, qty : number, authname : string, bid : string){
    const data = {bname : bname , qty : qty , authname : authname};
   // console.log("serv" + bid);
    
    this.http.put("api/putbook/"+ id + "/" + bid, data).subscribe();
}

deletebook(id : string, bid:string)
{
    this.http.delete("api/deletebook/"+ id + "/" + bid).subscribe();
}

addsoldbook(sfn :string, sln:string, sem:string, bn:string,auth:string,qty:number )
{
    const postall = {sellerfname : sfn, sellerlname:sln, selleremail : sem, bname:bn, authname:auth, qty:qty};
    this.http.post("api/postsoldbook/", postall).subscribe();
}


editsoldbook(id : string , bn:string,auth:string,qty:number, bid:string )
{
    const postall = { bname:bn, authname:auth, qty:qty };
    this.http.put("api/editsoldbook/"+ id + "/" + bid, postall).subscribe();
}

pushsoldboks(id : string, bname : string, authname : string, qty : number)
{
    const data = {bname : bname , qty : qty , authname : authname};
    this.http.put("api/pushsoldbook/"+ id , data).subscribe();
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