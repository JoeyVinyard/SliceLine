import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  selectedStore = "";
  orderCat = "";
  pizzaCrust = "";
  pizzaSize = "";

  testArray=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  setStore(number){
    this.selectedStore = "";

    //call menu from here
  }
  setCat(category){
    this.orderCat = category;
    console.log("Category: " + this.orderCat)

    if(category != "pizza"){
      this.pizzaCrust = "";
      this.pizzaSize = "";
    }
  }

  setCrust(crust){
    this.pizzaCrust = crust;
    console.log("Crust: " + this.pizzaCrust)

    //get all items with FlavorCode from Varients here
  }

  setSize(size){
    this.pizzaSize = size;
    console.log("Size: " + this.pizzaSize)

    // filter results based on SizeCode
  }

  constructor() { }

  ngOnInit() {
  }

}
