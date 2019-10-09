var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,

    user: 'root',

    password: 'root',
    database: 'bamazon'
});

function displayItems() {

    var items = ("SELECT * FROM products");

    connection.query(items, function (err, data) {
        if (err) throw err;

        console.log("Current Inventory: ");
        console.log("_________________________________________________________________________________\n");

        var product = "";
        for (var i = 0; i < data.length; i++) {
            product = "";
            if (i > 8) { product += "Item ID: " + data[i].item_id + ", "; } else {
                product += "Item ID: " + data[i].item_id + ",  ";
            }
            product += "Product Name: " + data[i].product_name + ",  ";
            product += "Department: " + data[i].department_name + ",  ";
            product += "Price: $" + data[i].price;

            console.log(product);
            console.log("_________________________________________________________________________________\n");
        }

        promptUser();
    })
}

function promptUser() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the ID of an item.',
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to buy?',
            filter: Number
        }
    ]).then(function (input) {


        var item = input.item_id;
        var quantity = input.quantity;

        var queryStr = "SELECT * FROM products WHERE item_id = " + item;

        connection.query(queryStr, function (err, data) {
            if (err) throw err;

            if (data.length === 0) {

                console.log("Please select an ID from an item listed");
                displayItems();

            } else {

                var itemData = data[0];

                if (quantity <= itemData.stock_quantity) {


                    var updateTable = "UPDATE products SET stock_quantity = " + (itemData.stock_quantity - quantity) + " WHERE item_id = " + item;
                    // console.log(updateTable)

                    connection.query(updateTable, function (err, data) {
                        if (err) throw err;

                        console.log("Your order has been accepted, the total amount owed is $" + itemData.price * quantity);
                        console.log("__________________________________________________________________________\n");

                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'continue',
                                message: 'Shop Again?',
                                choices: ['Yes', 'No'],
                            }
                        ]).then(function (input) {
                            if (input.continue === "Yes") {
                                displayItems();
                            } else { connection.end(); }
                        })

                    });
                } else {
                    console.log("Sorry, there are not enough of this item in stock currently.");
                    console.log("Try again with a different quantity.");
                    console.log("__________________________________________________________________________\n");
                    setTimeout(function () { displayItems(); }, 3000);

                }
            }
        })
    })
}

displayItems();