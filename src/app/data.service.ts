import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './models/user';
import { Product } from './models/product';

@Injectable()
export class DataService {
  prolist: { id_product:number, name:string, qty:number, price:number}[] =[];

  constructor( private http: HttpClient) { 
    this.http.get<Product[]>('/api/products').subscribe(res => {
      this.prolist =res;
      console.log(this.prolist); //for dev
    });
  }

  ngOnInit() {
  }
  
  getUsers() { 
    //Get all users development code goes here
  }

  //Save New user
  saveUser(name:string, uname:string, email:string, pass:string){ 
    this.http.post('/api/saveuser', {name:name, uname:uname, email:email, pass:pass})    
    .subscribe(
      (res) => {
        console.log(res); 
      },
      (err) => {
        console.log(err);
      }
    ); 
  }

  //Get Products
  getProducts() { 
    this.http.get<Product[]>('/api/products').subscribe(res => {
      console.log("-----log-----");
      this.prolist =res;
      console.log(this.prolist); //for dev
    });
    return this.prolist;
    
  }

  //Save Product
  savepro(name:string, qty:number, price:number) {
    this.http.post('/api/saveproduct', {name:name, qty:qty, price:price })    
    .subscribe(
      (res) => {
        console.log(res);
        this.getProducts(); 
      },
      (err) => {
        console.log(err);
      }
    ); 
  }

  //Delete Product
  deletepro(id:number) {
    this.http.post('/api/deleteproduct', {id:id})    
    .subscribe(
      (res) => {
        console.log(res);
        this.getProducts(); 
      },
      (err) => {
        console.log(err);
      }
    ); 
  }

  //Save Product
  updatepro(name:string, qty:number, price:number) {
    this.http.post('/api/updateproduct', {name:name, qty:qty, price:price })    
    .subscribe(
      (res) => {
        console.log(res);
        this.getProducts(); 
      },
      (err) => {
        console.log(err);
      }
    ); 
  }
  
  //User login
  login(username: string, email:string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>('/api/auth', {username: username, email: email, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  //Token related methods

  public getToken(): string {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}


