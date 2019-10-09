var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,

    user: 'root',

    password: 'root',
    database: 'bamazon'
});

function manager() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'Please make a selection:',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
        }
    ]).then(function (input) {

        if (input.choices === 'View Products for Sale') {
            displayItems();
        } else if (input.choices === 'View Low Inventory') {
            lowInventory();
        } else if (input.choices === 'Add to Inventory') {
            addItems();
        } else if (input.choices === 'Add New Product') {
            addProduct();
        } else if (input.choices === 'Exit') {
            connection.end();
        }
    });
};

function displayItems() {
	
	var items = ("SELECT * FROM products");

	connection.query(items, function(err, data) {
		if (err) throw err;

		console.log("Current Inventory: ");
		console.log("__________________________________________________________________________\n");

		var product = "";
		for (var i = 0; i < data.length; i++) {
            product = "";
            if (i > 8) {product += "Item ID: " + data[i].item_id + ", ";} else {
                product += "Item ID: " + data[i].item_id + ",  ";
            }
			product += "Product Name: " + data[i].product_name + ",  ";
            product += "Price: $" + data[i].price + ",  ";
            product += "Quantity: " + data[i].stock_quantity;

			console.log(product);
		}

	  	console.log("__________________________________________________________________________\n");

	  	manager();
	})
}

function lowInventory() {
	
	var items = ("SELECT * FROM products WHERE stock_quantity < 5");

	connection.query(items, function(err, data) {
		if (err) throw err;

		console.log("Low Inventory: ");
		console.log("__________________________________________________________________________\n");

		var product = "";
		for (var i = 0; i < data.length; i++) {
            product = "";
            if (i > 8) {product += "Item ID: " + data[i].item_id + ", ";} else {
                product += "Item ID: " + data[i].item_id + ",  ";
            }
			product += "Product Name: " + data[i].product_name + ",  ";
            product += "Price: $" + data[i].price + ",  ";
            product += "Quantity: " + data[i].stock_quantity;

			console.log(product);
		}

	  	console.log("__________________________________________________________________________\n");

	  	manager();
	})
}

manager();
