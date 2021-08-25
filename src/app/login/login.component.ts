import { Component, OnInit } from '@angular/core';
import { userservice } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  uss!: userservice;
  constructor() { }

  ngOnInit(): void {
  }





}
