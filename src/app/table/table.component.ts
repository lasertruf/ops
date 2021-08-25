import { Component, Injectable, OnInit, Input, OnChanges } from '@angular/core';
import {FormControl, FormGroup,FormBuilder, NgForm, Validators} from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';
import { signup } from '../global_variables';
import { userservice } from '../user.service';
import { uinfo } from '../userinfo.model';
import { DialogDataExampleDialog } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SimpleChanges } from '@angular/core';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit,OnChanges {

@Input() editvar : any = 0

ngOnChanges(changes: SimpleChanges) {
if((this.uss.editvar)){
          console.log(" IT changed");
          
}

}


  userarr : uinfo [] =[];
  a : any = [];
  arr : any = [];
  
signinstatusvar : boolean = false;
currmail! : string;
adminpass! : string;
currpass!: string;

   ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  


 
  

  constructor(public dialog: MatDialog, public uss : userservice, private fb : FormBuilder,             
    ) { }
    

   async ngOnInit()  {


  
      
    this.signinstatusvar = this.uss.signinStatusvar;
    this.currmail = this.uss.currentusermail;
    this.adminpass = 'admin@123';
    this.currpass = this.uss.currentuserpassword;


    // alert(this.signinstatusvar);

   
    // setInterval(() => {
     
    //  this.func();

    // }, 500);

    // this.a = await this.uss.getUsersfromDB().toPromise();
    //    this.userarr=this.a;
      
    //    console.log("recieved async " +this.userarr.length);
    //    this.func();
    this.a = await this.uss.getUsersfromDB().toPromise();
    this.userarr=this.a;
    this.func();

setInterval(() => {
  this.func();

 
}, 2000);
       
        

      
}


// columns = [
//   {
//     columnDef: 'position',
//     header: 'No.',
//     cell: (element: uinfo) => `${element.fname}`
//   },
//   {
//     columnDef: 'name',
//     header: 'Name',
//     cell: (element: PeriodicElement) => `${element.name}`
//   },
//   {
//     columnDef: 'weight',
//     header: 'Weight',
//     cell: (element: PeriodicElement) => `${element.weight}`
//   },
//   {
//     columnDef: 'symbol',
//     header: 'Symbol',
//     cell: (element: PeriodicElement) => `${element.symbol}`
//   }
// ];




columnss = [
  {
    columnDef: 'fname',
    header: 'First Name',
    cell: (element: any) => `${element.fname}`
  },
  {
    columnDef: 'lname',
    header: 'Last Name',
    cell: (element: any) => `${element.lname}`
  },
  {
    columnDef: 'email',
    header: 'Email',
    cell: (element: any) => `${element.email}`
  },
  {
    columnDef: 'sex',
    header: 'Sex',
    cell: (element: any) => `${element.sex}`
  },
  {
    columnDef: 'contact',
    header: 'Contact',
    cell: (element: any) => `${element.contact}`
  },
  
];



dataSource = this.userarr;
displayedColumns = this.columnss.map(c => c.columnDef);


func(){
 // console.log(this.userarr);
  setTimeout(() => {
    this.uss.getUsersfromDB().subscribe((res:any)=>{
  
      this.userarr = res;

    });
  }, 500);


  this.columnss = [
    {
      columnDef: 'fname',
      header: 'First Name',
      cell: (element: any) => `${element.fname}`
    },
    {
      columnDef: 'lname',
      header: 'Last Name',
      cell: (element: any) => `${element.lname}`
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (element: any) => `${element.email}`
    },
    {
      columnDef: 'sex',
      header: 'Sex',
      cell: (element: any) => `${element.sex}`
    },
    {
      columnDef: 'contact',
      header: 'Contact',
      cell: (element: any) => `${element.contact}`
    },
    {
      columnDef: 'options',
      header: 'Options',
      cell: (element: any) => `${''}`
    },
    
  ];
  
  
  
  this.dataSource = this.userarr;
  this. displayedColumns = this.columnss.map(c => c.columnDef);
 
}

async onEdit(r:any){

  console.log("r :" + (r.fname));


this.uss.usersdata(r);
this.openDialog();
this.a = await this.uss.getUsersfromDB().toPromise();
this.userarr=this.a;
this.func();

}

async onDelete(r:any){

  this.uss.deleteUserfromDB(r._id);
  this.a = await this.uss.getUsersfromDB().toPromise();
       this.userarr=this.a;

       this.func();
  

}

async openDialog(){
  this.arr = this.uss.fetchuinfo();

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

  this.a = await this.uss.getUsersfromDB().toPromise();
this.userarr=this.a;
this.func();
}

async refreshTable()
{  this.a = await this.uss.getUsersfromDB().toPromise();
  this.userarr=this.a;
  this.func();
}

}







  function ngOnChanges(changes: any, SimpleChanges: any) {
    throw new Error('Function not implemented.');
  }

  function changes(changes: any, SimpleChanges: any) {
    throw new Error('Function not implemented.');
  }

  function SimpleChanges(changes: any, SimpleChanges: any) {
    throw new Error('Function not implemented.');
  }

  function func() {
    throw new Error('Function not implemented.');
  }

  function onEdit(r: any, any: any) {
    throw new Error('Function not implemented.');
  }

  function r(r: any, any: any) {
    throw new Error('Function not implemented.');
  }

  function onDelete(r: any, any: any) {
    throw new Error('Function not implemented.');
  }

  function openDialog() {
    throw new Error('Function not implemented.');
  }

  function refreshTable() {
    throw new Error('Function not implemented.');
  }

