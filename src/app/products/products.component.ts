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

  prolist: { id_product:number, name:string, qty:number, price:number}[] =[];
  constructor(private _dataService: DataService) { 
  }
  
  ngOnInit() {
    this._dataService.getProducts();
    console.log(this._dataService.prolist);
    this.prolist =  this._dataService.getProducts();
  }

  addproduct(event){
    event.preventDefault()
    const target = event.target;
    const name = target.querySelector('#name').value;
    const qty = target.querySelector('#qty').value;
    const price = target.querySelector('#price').value;
    console.log("adding1");
    this._dataService.savepro(name, qty, price);;
    this.prolist =  this._dataService.prolist;
  }

  deleteproduct(event){
    event.preventDefault()
    const target = event.target;
    const id = target.querySelector('#id').value;
    console.log(id);
    this._dataService.deletepro(id);;
    this.prolist =  this._dataService.getProducts();
  }

}
