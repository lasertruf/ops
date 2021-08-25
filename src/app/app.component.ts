import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { userservice } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent  implements OnInit {
  

 title = "CQ";
  x!:boolean;
  signinstatusvar: boolean = false;
  

  
  constructor(public uss : userservice){}
  
  ngOnInit(): void {
    
setInterval(() => {
    this.dat();

    this.signinstatusvar=this.uss.returnSigninStatus();
  
  }, 1000);  
  

  }



  dat()
{
  this.x= this.uss.getsup();
  // console.log("x:  " +  this.x);
  
}

ngOnChanges(changes: SimpleChanges) {
  // changes.prop contains the old and the new value...
  this.x= this.uss.getsup();
  
}
  
}
