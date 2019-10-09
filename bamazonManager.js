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
            createProduct();
        } else if (input.choices === 'Exit') {
            connection.end();
        }
    });
};

function displayItems() {

    var items = ("SELECT * FROM products");

    connection.query(items, function (err, data) {
        if (err) throw err;

        console.log("Current Inventory: ");
        console.log("__________________________________________________________________________\n");

        var product = "";
        for (var i = 0; i < data.length; i++) {
            product = "";
            if (i > 8) { product += "Item ID: " + data[i].item_id + ", "; } else {
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

    connection.query(items, function (err, data) {
        if (err) throw err;

        console.log("Low Inventory: ");
        console.log("__________________________________________________________________________\n");

        var product = "";
        for (var i = 0; i < data.length; i++) {
            product = "";
            if (i > 8) { product += "Item ID: " + data[i].item_id + ", "; } else {
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

function addItems() {
    var items = ("SELECT * FROM products");

    connection.query(items, function (err, data) {
        if (err) throw err;

        console.log("Current Inventory: ");
        console.log("__________________________________________________________________________\n");

        var product = "";
        for (var i = 0; i < data.length; i++) {
            product = "";
            if (i > 8) { product += "Item ID: " + data[i].item_id + ", "; } else {
                product += "Item ID: " + data[i].item_id + ",  ";
            }
            product += "Product Name: " + data[i].product_name + ",  ";
            product += "Price: $" + data[i].price + ",  ";
            product += "Quantity: " + data[i].stock_quantity;

            console.log(product);
        }

        console.log("__________________________________________________________________________\n");

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
                message: 'How many would you like to add?',
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

                    var updateTable = "UPDATE products SET stock_quantity = " + (itemData.stock_quantity + quantity) + " WHERE item_id = " + item;

                    connection.query(updateTable, function (err, data) {
                        if (err) throw err;

                        console.log("Stock has been updated.");
                        console.log("__________________________________________________________________________\n");
                        manager();
                    });
                };
            });
        });
    });
};

function createProduct() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'product_name',
            message: 'Please enter the name of an item.',
        },
        {
            type: 'input',
            name: 'department_name',
            message: 'What department is it in?',
        },
        {
            type: 'input',
            name: 'price',
            message: 'How expensive is it?',
            filter: Number
        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'How many would you like to add?',
            filter: Number
        }
    ]).then(function (input) {

        connection.query("INSERT INTO products SET ?",
            {
                product_name: input.product_name,
                department_name: input.department_name,
                price: input.price,
                stock_quantity: input.stock_quantity
            }, function (err, data) {
                if (err) throw err;

                console.log("New item has been added.");
                console.log("__________________________________________________________________________\n");
                manager();
            });
    });
};

manager();
