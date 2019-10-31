import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './models/user';
import { Product } from './models/product';

var login_user = new User();

@Injectable()
export class DataService {
  prolist: Array<any>;
  result:User[];
  //private _http: Http
  constructor(private _http: Http, private http: HttpClient) { }

  getUsers() { // : Users[]

    return this._http.get("/api/users").pipe(map(result => this.result = result.json()));

  }
  getProducts() { 

    //console.log(this.http.get('/api/products'));
    return this.http.get('/api/products');
    
  }

  login(uname, email, pass) {
    login_user.uname = uname;
    login_user.uname = email;
    login_user.uname = pass;
    //
    return this._http.get("/api/users").pipe(map(result => this.result = result.json()));;

  }

  saveUser(name, uname, email, pass){ 
    console.log(name, uname, email, pass);
  }

  saveProduct(name, qty, price){ 
    console.log(name, qty, price);
  }
  

}
