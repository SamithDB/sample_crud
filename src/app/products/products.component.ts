import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  prolist: Array<any>;

  constructor(private _dataService: DataService) { 

    this._dataService.getProducts()
      .subscribe(res => {
        console.log("-----log-----");
        console.log(res[0].name);
        this.prolist = res;
        console.log(this.prolist);
      
      });
  }

  ngOnInit() {
  }

}
