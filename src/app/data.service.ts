import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { User } from './models/user';

@Injectable()
export class DataService {

  result:User[];

  constructor(private _http: Http) { }

  getUsers() { // : Users[]

    return this._http.get("/api/users")
      .pipe(map(result => this.result = result.json()));

  }
  getProducts() { 

    return this._http.get("/api/products")
      .pipe(map(result => this.result = result.json()));

  }

  login(name, uname, email, pass) {
    
    let status= "pass";
    return status;

  }

  saveUser(name, uname, email, pass){ 
    console.log(name, uname, email, pass);
  }
  

}
