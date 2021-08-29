import { Component, OnInit } from '@angular/core';
import { userservice } from '../user.service';
import {FormControl, FormGroup,FormBuilder, NgForm, Validators} from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

bname !: string;
authname !: string;
qty !: number;

term !: string;

currcustarr : any = [];

editbookformvar : boolean = false;

bookform!: FormGroup;
bookeditform!: FormGroup;

userarr : any = [];
isSignin : boolean = false;
fname!: string;
lname!: string;
email!: string;
contactno!: string;
password!: string;
newpassword!: string;
searchbname : string = '';
sex!: string;
signupvar!: boolean;
us! : userservice;
hide : boolean = true;
curremail !: string;

putuser : any 
putbook : any 

sorb !: string ;

soldbooksarr : any = [];

sexarr = [
  {value: 'Seller'},
  {value: 'Customer'}
 
];


checkError: any ;


bnameFormControl = new FormControl('', [
  Validators.required,
]);

authnameFormControl = new FormControl('', [
  Validators.required,
]);


qtyFormControl = new FormControl('', [
  Validators.required,
]);


  constructor(public uss : userservice, public fb : FormBuilder) { }

  ngOnInit(): void {
    this.curremail = this.uss.currentusermail;
    this.sorb = this.uss.currentusersorb;

   this.uss.getUserbyEmail("jajajaj@jaja").subscribe((resss:any)=>{this.currcustarr=resss});

    console.log(this.currcustarr[0]);
      
    

setInterval(() => {
  this.uss.getUsersfromDB().subscribe((res:any)=>{ this.userarr = res});
  this.uss.getSoldbooksFromDB().subscribe((ress:any)=> {this.soldbooksarr = ress});

  
  
}, 1000);



    
  this.bookform = this.fb.group({
    bname: ['', Validators.required],
    authname: ['', Validators.required],
    qty: ['', Validators.required],
    });    

  this.bookeditform = this.fb.group({
    bname: ['', Validators.required],
    authname: ['', Validators.required],
    qty: ['', Validators.required],
   
  });    


  }

  


submit()
{
console.log("submit");

if(this.editbookformvar==true)
{
  console.log("putbook");
  this.uss.putbook(this.putuser._id,this.bname,this.qty,this.authname,this.putbook._id);
  setTimeout(() => {
    this.uss.getUsersfromDB().subscribe((res:any)=>{ this.userarr = res});
  
  }, 500);   
  
  this.editbookformvar=false;



  return;
  
}

else{
setTimeout(() => {
  this.uss.getUsersfromDB().subscribe((res:any)=>{ this.userarr = res});

}, 500);   


console.log("userarr : " + this.userarr);


  var i = -1;
  var f = false;
  var push = true;
  for (let index = 0; index < this.userarr.length; index++) {
             if(this.userarr[index].email==this.curremail){

              i = index;
              f =true;
              console.log(this.userarr[index].email);
              
              break;
             }
  }
if(i>-1 && f==true)
{ console.log(i);
  console.log("bname" + this.bname);
  
 // this.uss.pushbook(this.userarr[i]._id,this.bname,this.authname,this.qty);
  for (let index = 0; index < this.userarr[i].books.length; index++) {
                               if(this.userarr[i].books[index].bname==this.bname)
                               {  
                                 alert("Book Exists");
                                 push = false;

                                 break;
                               }
                               
    
  }

  if(push){
    
      console.log(this.userarr[i]._id);
       this.uss.pushbook(this.userarr[i]._id,this.bname,this.authname,this.qty);
       
     
  }
}
//else ends above
  
}
  // this.uss.pushbook("",this.bname,this.authname,this.qty,)

}

delete(user:any,book:any){

    this.uss.deletebook(user._id,book._id);
    this.uss.getUsersfromDB().subscribe((res:any)=>{ this.userarr = res});


}

buy(user:any,book:any){
  
          
// this.uss.getUserbyEmail(this.curremail).subscribe((resss:any)=>{this.currcustarr=resss});
var putqty;

// console.log(this.currcustarr[0].email);


setTimeout(() => {
  this.uss.getSoldbooksFromDB().subscribe((ress:any)=> {this.soldbooksarr = ress});

}, 500);  

  console.log("in buy");
  
    
        var sbmailexists = false;
        var sbexists = false;
        var i;
        //console.log(this.soldbooksarr[0]);


        
for (let index = 0; index < this.soldbooksarr.length; index++) {
                 if(this.soldbooksarr[index].selleremail==user.email)
                 { sbmailexists=true; 
                  i = index;
                  // console.log("mailexists in buy");
                  
                         break;
                 }
  
}

if(sbmailexists && i){
    
for (let index = 0; index < this.soldbooksarr[i].soldbooks.length; index++) {
                    if(this.soldbooksarr[i].soldbooks[index].bname == book.bname ){
                                      sbexists=true;
                                      putqty = (this.soldbooksarr[i].soldbooks[index].qty + 1);
                                      console.log(putqty);
                                      
                                      // this.uss.putbook(user._id,book.bname,1,book.authname,book._id); 
                               this.uss.editsoldbook(this.soldbooksarr[i]._id,
                                book.bname,book.authname,putqty,
                                this.soldbooksarr[i].soldbooks[index]._id);
                                      
                                      console.log("sbexists edit existing book");
                                      break;
                                       

                    }
  
}

if(sbexists==false){     
  
  // this.uss.pushbook(user._id,book.bname,book.authname,1); 
  
  this.uss.pushsoldboks(this.soldbooksarr[i]._id,book.bname,book.authname,1);
  console.log("sbdontexist" + user.email);
  

 // console.log("!sbexists  push new book");
}
  
}
else{

  this.uss.addsoldbook(user.fname,user.lname,user.email,book.bname,book.authname,1);
}
     

      
 

}

editbookformfunc(user : any, book:any)
{

       this.editbookformvar=true;
       this.bookform.patchValue(book);
       this.putuser=user;
       this.putbook=book;
       console.log(this.putbook._id);
       
      
}



reset(){
  this.editbookformvar=false;
}
}
