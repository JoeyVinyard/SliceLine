import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../services/database.service';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  allStores = [];
	selectedStore = "";
	orderCat = "";
	pizzaCrust = "";
  pizzaSize = "";
  
  menu = [];
  pizza = [];
  pasta = [];
  wings = [];
  sides = [];

  currentMenu = [];
  currentOrder = [];
  currentTotal = 0;

  adjPizza = [];


  party = {
    Order: [],
    Size: 0,
    Type: "",
    Total: 0
  }


	setStore(storeID){
    this.selectedStore = storeID;
    
    this.orderCat = "";
    this.pizzaCrust = "";
    this.pizzaSize = "";
    this.currentMenu = [];

   		console.log("Current Store: " + this.selectedStore);
   		this.db.getStoreMenu(storeID).then((menu) => {
        this.menu = [];
        this.pizza = [];
        this.pasta = [];
        this.wings = [];
        this.sides = [];

        console.log(menu);

        this.menu = Object.keys(menu.Products).map(key => {
          return menu.Products[key];
        })

        console.log(this.menu)



         this.menu.forEach((item) =>{
          var currentItem = {
              Name: "",
              Description: "",
              Price: "",
              Crust: "",
              Size: ""
            };

            if(item.ProductType == "Pizza"){
              for(var i = 0; i < item.Variants.length; i++){
                var currentItem = {
                  Name: "",
                  Description: "",
                  Price: "",
                  Crust: "",
                  Size: ""
                };
                currentItem.Description = item.Description;
                currentItem.Name = menu.Variants[item.Variants[i]].Name;
                currentItem.Price = menu.Variants[item.Variants[i]].Price;
                currentItem.Crust = menu.Variants[item.Variants[i]].FlavorCode;
                currentItem.Size = menu.Variants[item.Variants[i]].SizeCode;
                this.pizza.push(currentItem);
              }
            }
            else if(item.ProductType == "Pasta"){
              for(var i = 0; i < item.Variants.length; i++){
                var currentItem = {
                  Name: "",
                  Description: "",
                  Price: "",
                  Crust: "",
                  Size: ""
                };
                currentItem.Description = item.Description;
                currentItem.Name = menu.Variants[item.Variants[i]].Name;
                currentItem.Price = menu.Variants[item.Variants[i]].Price;
                this.pasta.push(currentItem);
              }
            }
            else if(item.ProductType == "Wings"){
              for(var i = 0; i < item.Variants.length; i++){
                var currentItem = {
                  Name: "",
                  Description: "",
                  Price: "",
                  Crust: "",
                  Size: ""
                };
                currentItem.Description = item.Description;
                currentItem.Name = menu.Variants[item.Variants[i]].Name;
                currentItem.Price = menu.Variants[item.Variants[i]].Price;
                this.wings.push(currentItem);
              }
            }
            else{
              for(var i = 0; i < item.Variants.length; i++){
                var currentItem = {
                  Name: "",
                  Description: "",
                  Price: "",
                  Crust: "",
                  Size: ""
                };
                currentItem.Description = item.Description;
                currentItem.Name = menu.Variants[item.Variants[i]].Name;
                currentItem.Price = menu.Variants[item.Variants[i]].Price;
                this.sides.push(currentItem);
              }
            }
         })
        //  console.log("Pizzas: " + this.pizza);
        //  console.log("Pastas: " + this.pasta);
        //  console.log("Wings: " + this.wings);
        //  console.log("Sides: " + this.sides);
   		})
	}
	
	
	setCat(category){
		this.orderCat = category;
    console.log("Category: " + this.orderCat)
    
    this.currentMenu = [];

		if(category != "pizza"){
			this.pizzaCrust = "";
			this.pizzaSize = "";
    }

    if(this.orderCat == "pasta"){
      this.currentMenu = this.pasta;
    }
    else if(this.orderCat == "wings"){
      this.currentMenu = this.wings;
    }
    else if(this.orderCat == "sides"){
      this.currentMenu = this.sides;
    }

	}

	setCrust(crust){
		this.pizzaCrust = crust;
    console.log("Crust: " + this.pizzaCrust)
    
    this.adjPizza = [];
    this.pizza.forEach((item) =>{
      if(item.Crust == crust){
        this.adjPizza.push(item);
      }
    })

    if(this.pizzaSize != ""){
      this.setSize(this.pizzaSize);
    }
	}

	setSize(size){
		this.pizzaSize = size;
    console.log("Size: " + this.pizzaSize);
    
    this.currentMenu = [];

    this.adjPizza.forEach((item) =>{
      if(item.Size == size){
        this.currentMenu.push(item);
      }
    })
  }
  
  addItem(item){
    this.currentOrder.push(item);
    this.currentTotal += parseFloat(item.Price);
    this.currentTotal = parseFloat(this.currentTotal.toFixed(2));
  }

  removeItem(item){
    this.currentOrder.splice(this.currentOrder.indexOf(item), 1);
    this.currentTotal -= parseFloat(item.Price);
    this.currentTotal = parseFloat(this.currentTotal.toFixed(2));
  }

  createParty(){
    this.party.Order = this.currentOrder;
    this.party.Total = this.currentTotal;
    console.log(this.party)
    this.db.createParty(localStorage.getItem('username'), this.party);
    //Store in database here
  }

	constructor(private db: DatabaseService) {
		navigator.geolocation.getCurrentPosition((pos) => {
      console.log("Location Started")
			db.getNearbyStores(pos).then((stores) => {
        console.log(stores);
        this.allStores = stores;
			}).catch((err) => {
				console.error(err);
			})
		})
	}

	ngOnInit() {
	}

}
