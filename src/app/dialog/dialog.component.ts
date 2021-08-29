import { Component, OnInit , Inject} from '@angular/core';
import {FormControl, FormGroup,FormBuilder, NgForm, Validators} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SignComponent } from '../sign/sign.component';
import { userservice } from '../user.service';
import { uinfo } from '../userinfo.model';
import { TableComponent } from '../table/table.component';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
  cow : string;
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

 

export class DialogComponent implements OnInit  {

userarr : uinfo [] = [];
arr : any = [];
prevarr : any =[];

signupform!: FormGroup;


fname : string = "lol"


lname!: string;
// email!: string;
contactno!: string;
password!: string;
newpassword!: string;
sex!: string;
signupvar!: boolean;
us! : userservice;
hide : boolean = true;



sexarr = [
  {value: 'Male'},
  {value: 'Female'},
  {value: 'Other'}
];


  constructor(public dialog: MatDialog, public uss : userservice, private fb : FormBuilder,) { }


 

  ngOnInit(): void {

    setInterval(() => {
      this.uss.getUsersfromDB().subscribe((res:any)=>{
        this.userarr = res;
      });
     this.arr = this.uss.fetchuinfo();


    }, 100);
  }

     



  openDialog() {
    // this.dialog.open(DialogDataExampleDialog, {
    //   data: {
    //     animal: 'unicorn',
    //     cow: 'man'
    //   }
    // });



console.log(this.arr);



    this.dialog.open(DialogDataExampleDialog, {
      data: {
        email: this.arr.email,
        lname: this.arr.lname,
        fname: this.arr.fname,
        contact: this.arr.contact,
        password: this.arr.password,
        sex: this.arr.sex,
        
      }
    });
  }



async editDialog(){

  this.prevarr = this.arr;
   const newarr : any = await this.uss.fetchuinfo();
   this.arr=newarr;

   if(this.prevarr === this.arr){
     return;
   }
   else{
 
   }



  
}  

}




@Component({
  
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
  styleUrls: ['./dialog-data-example-dialog.css']

})

export class DialogDataExampleDialog implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: uinfo, public uss : userservice, public fb : FormBuilder ) {}

  emailcur:string = 'bacl@alsfdj';
arr : any = [];
editform ! : FormGroup; 
sexarr = [
  {value: 'Male'},
  {value: 'Female'},
  {value: 'Other'}
];


  ngOnInit(): void {  
    
this.editform = this.fb.group({
  fname: ['', Validators.required],
  lname: ['', Validators.required],
  sex: ['', Validators.required],
  email: ['', [Validators.required,Validators.email]],
  contact: ['',[Validators.required, Validators.maxLength(10),Validators.minLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$") ]],
 // newpassword: ['',[Validators.minLength(8),Validators.required ]],
}); 

  }

  editDialog(){
    // if(this.editform.valid){

    
    //  this.arr=this.uss.fetchuinfo();
    //  this.uss.editUser(this.data.fname,this.data.lname,this.data.sex,this.data.email,
    //  this.arr.password,this.arr._id, this.arr.date);
    //  this.uss.editvar=true;



    //  alert("Submitted successfully")

    //    }
    //    else if (this.editform.invalid){
    //      alert("Please recheck the data entered")
    //    }

      }


  

  
}
