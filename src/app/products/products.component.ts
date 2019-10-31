import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DataService } from '../data.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  //prolist: Array<any>;
  //prolist: { id_product:number; name:string, qty:number, price:number}[] =[];

  constructor(private _dataService: DataService) { 

    this._dataService.getProducts()
      .subscribe(res => {
        console.log("-----log-----");
        //for(var counter:number = 0; counter<res; counter++){
        //}
        console.log(res); //for dev
      });
  }
  ngOnInit() {
  }

  addproduct(event){
    event.preventDefault()
    const target = event.target;
    const name = target.querySelector('#name').value;
    const uname = target.querySelector('#qty').value;
    const email = target.querySelector('#price').value;
    //console.log(name, uname, email);
    this._dataService.saveProduct(name, uname, email);
    
    
  }

}
