import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  users: Array<any>;
  public error: string;
  constructor(private _dataService: DataService, private router: Router) { }
  
  ngOnInit() {
    this._dataService
  }

  loginuser(event){
    event.preventDefault();
    const target = event.target;
    const uname = target.querySelector('#uname').value;
    const email = target.querySelector('#uname').value;
    const pass= target.querySelector('#pass').value;
    
    this._dataService.login(uname, email, pass)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['products']),
        //result => console.log(result),
        err => this.error = 'Could not authenticate'
    );

  } 

}
