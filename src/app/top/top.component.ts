import { Component, OnInit } from '@angular/core';
import { userservice } from '../user.service'; 

import {formatDate } from '@angular/common';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  signinstatusvar: boolean =false;
  
  constructor(public uss : userservice) { }

  ngOnInit(): void {

    // let dateFormat = require('dateformat');
    // let now = new Date();
    // let date = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    // console.log(date);
  //   let today= new Date();
  //  let  dateformatted  = '';

  //   dateformatted = formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
  //   console.log(dateformatted);
    

    setInterval(() => {
     
  
      this.signinstatusvar=this.uss.returnSigninStatus();
    
    }, 1000);  
    

    this.signinstatusvar=this.uss.returnSigninStatus();
  }

  reload(){
    window.location.reload();
  }

}
