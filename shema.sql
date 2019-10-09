DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(40) NOT NULL,
  department_name VARCHAR(40) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER(11) NOT NULL,
 
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HD TV", "electronics", 600.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smart Phone", "electronics", 400.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Phone Charger", "electronics", 15.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Novel", "books", 15.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Biography", "books", 20.00, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Technical Guide", "books", 35.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Breakfast Cereal", "food", 5.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat Food", "food", 10.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Food", "food", 10.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soup", "food", 2.00, 50);

SELECT * FROM products;