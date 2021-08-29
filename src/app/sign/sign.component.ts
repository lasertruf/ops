import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,FormBuilder, NgForm, Validators} from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';
import { signup } from '../global_variables';
import { userservice } from '../user.service';
import { uinfo } from '../userinfo.model';


@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})



export class SignComponent implements OnInit {
  
    emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  fnameFormControl = new FormControl('', [
    Validators.required,
  ]);
  
  lnameFormControl = new FormControl('', [
    Validators.required,
  ]);

  contactFormControl = new FormControl('', [
   Validators.required,
    Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
    Validators.minLength(10),Validators.maxLength(10),
  ]);

  passwordFormControl = new FormControl('', [Validators.required,]);
  
  // Validators.compose([
  //   Validators.required, Validators.minLength(8)])

  //   [Validators.required,Validators.minLength(8)]

  newpasswordFormControl = new FormControl('', Validators.compose([
    Validators.minLength(8),Validators.required])
);

  sexFormControl = new FormControl('', [
    Validators.required,
  ]);


  signupform!: FormGroup;

  isSignin : boolean = false;
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
    {value: 'Seller'},
    {value: 'Customer'}
   
  ];


checkError: any ;

   sorb !: string;


  constructor(public uss : userservice, public fb : FormBuilder,          
    ) { }


    
  ngOnInit(): void {

    this.uss.getUsersfromDB().subscribe((res:any)=>{
  
      this.userarr = res;
    
    });

    // var encrypted = this.uss.set('123456$#@$^@1ERF', 'admin@123');
    // var decrypted = this.uss.get('123456$#@$^@1ERF', encrypted);
   
    // console.log('Encrypted :' + encrypted);
    // console.log('Encrypted :' + decrypted);


    this.signupform = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      sex: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      newpassword: ['',[Validators.minLength(8),Validators.required ]],
    });    
  
    
     this.checkError = (controlName: string, errorName: string) => {
      return this.signupform.controls[controlName].hasError(errorName);
    }

  }


 signup(){

console.log("signupform.valid " +this.signupform.valid);


  if(this.signupform.invalid){
    alert("Invalid data, please recheck");
   return;
  }
  else if(this.signupform.valid) {
   this.signupvar=true;
   this.uss.supp(this.signupvar);
   alert("Proceed to Sign In");

   let today= new Date();
   let  dateformatted  = '';
   dateformatted = formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
   console.log(dateformatted);
    
   
   this.uss.addUsertoDB(this.fname,this.lname,this.sex,this.email,this.newpassword);

  
   
// this.signupform.reset();
this.signupform.markAsUntouched();
} 
}

 resetForm(){



 }
  

 async signin(){

   const r:any = await this.uss.getUsersfromDB().toPromise();
  
    this.userarr = r;

    var dpass : any = 0;
  // const dpass : any  =  this.uss.get('123456$#@$^@1ERF',r.password);
  
    console.log("in signin \n");

for (let index = 0; index < this.userarr.length; index++) {
 
  
            if(this.email==r[index].email){
              // console.log("OKKKKK");
            // this.signupform.patchValue(this.userarr[index]);    

            // console.log(" LOGIN Success");   
            // this.isSignin=true; 

            // alert("Sign In Success");
              //console.log(r[index]._id);

              //console.log("\n");
             // console.log(r[index].password);
            dpass =  this.uss.get('123456$#@$^@1ERF',r[index].password);
              
              
                
              
              if( this.password == dpass || r[index].password )
              {
                console.log(" LOGIN Success");  
                this.sorb = r[index].sorb; 
                this.isSignin=true; 
                alert("Sign In Success");
                

              }


  
            break;
            }
  
  
  
  
}

this.uss.signinStatus(this.isSignin,this.email,this.password,this.sorb);


if(this.isSignin == false)
{
  console.log("Login failed");
  alert("Login failed");

  
}

 }

}

export class variableout {
}




