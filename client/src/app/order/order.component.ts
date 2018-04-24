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

	testArray=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];


	setStore(storeID){
		this.selectedStore = storeID;
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
         console.log("Pizzas: " + this.pizza);
         console.log("Pastas: " + this.pasta);
         console.log("Wings: " + this.wings);
         console.log("Sides: " + this.sides);
   		})
	}
	
	
	setCat(category){
		this.orderCat = category;
		console.log("Category: " + this.orderCat)

		if(category != "pizza"){
			this.pizzaCrust = "";
			this.pizzaSize = "";
    }

    if(this.orderCat == "pizza"){
      this.currentMenu = this.pizza;
    }
    else if(this.orderCat == "pasta"){
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

		//get all items with FlavorCode from Varients here
	}

	setSize(size){
		this.pizzaSize = size;
		console.log("Size: " + this.pizzaSize)

		// filter results based on SizeCode
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
