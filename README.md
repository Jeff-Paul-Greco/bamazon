# Bamazon

Welcome to Bamazon, the shopping app! This app has two views - the customer and manager views. Using the customer view you can view available items and make a purchase. Using the manager view you can check and update inventory and create new product listings. Both views rely on a Mysql database that is being updated in real time.

# Customer View

By typing "node bamazonCustomer" and pressing enter the user will enter customer view. All of the items on Bamazon will be listed along with their unique ID, department name and price. The user will be asked to select an item ID. After an ID is selected, the user will be asked how many they want to buy of said item. If there are enough items left in stock to satisfy the order then the user will receive a message saying the order was completed along with the total amount owed. If there is not enough left in stock, then the user will receive a message telling them to change their order. The user will then be asked if they want to shop again.

Demo of the Customer View:
https://drive.google.com/file/d/1Zjw-T1H9Wqv0KV831nbo4BdNSyvzgHZj/view

# Manager View

By typing "node bamazonManager" and pressing enter the user will enter manager view. The user will be prompted with five options - "View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product" and "Exit". If the user selects "View Products for Sale" then all of the items on Bamazon will be listed along with their unique ID, price and stock. Selecting the "View Low Inventory" will filter for all items with a stock quantity of less than five. When the user selects "Add to Inventory" a prompt will appear asking for the ID of the item they would like to add to. After inputting the ID, the user will be asked how much to add. The amount will be added and the user will receive a success message. By selecting "Add New Product" the user will be able to list a new product. A series of prompts will ask for the name, department name, price and quantity of the item you would like to add. The item will be added to the database and the user will receive a success message. Selecting "Exit" from the main menu exits the program.

Demo of the Manager View:
https://drive.google.com/file/d/1Z2DI3cEVihKMX5UVk7lg6Y_nn__AQsEi/view

# Under the Hood

Both the customer and manger js files utilize the same Mysql database. After connecting to the database, the customer app querys the database for all items and returns them to the screen via a for loop. An inquirer input prompt then collects the ID the user would like to target as well as the quantity they would like to purchase. A conditional checks the amount requested against the current quantitiy and if it passed then the item is selected where its ID matches the user input and then is issed an update query. An inquirer list prompt asks the user if they would like to shop again or end the program. The Manager presents a list prompt to the user with 5 options. Exit, naturally, ends the connection to the database and the program itself. View Products for Sale works the same as in Customer but just targets and shows quantity in place of department name. View Low Inventory returns only items with stock quantity less than 5 by using where in the query. Add to Inventory uses an update query to add to stock quantity by essentially using the reverse logic of the Customer function that subtracted from stock. And finally Add New Product collects the data to be inserted from a series of inquirer inputs, and then inserts said data using an insert into table query.

