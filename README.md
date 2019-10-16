# bamazon
Bamazon is an Amazon-like storefront app created using MySQL, node, javascript, adn npm. The app will take in orders from customers and deplete stock from the store's inventory. 

# How the app works
## Bamazon Customer
Once database is created and files are installed locally, users can run app by typing 'node bamazonCustomer.js' in terminal. The app will first show all products in the database and corresponding details such as id, product_name, department_name, price, and stock_quantity. Users are then asked to input an "id" of a widget they want to purchase and the amount of widgets.

## Bamazon Manager
Users can run app by typing 'node bamazonManager.js' in terminal. The app will first show a list of commands the manager can run by arrowing up or down to select these options:
- View Products on Sale. (the user will be able to view all items in the database along with the items information such as price and quantity.)
- View Inventory. (the user will be able to see any item that has less than 10 items in stock.)
- Add to Inventory. (the user will be able to add to the current stock quantity of a specific item.)
- Add new Product. (the user will be able to make a new item to the database.)

## Bamazon Supervisor
Users can run app by typing 'node bamazonSupervisor.js' in terminal. The app will let supervisors view product sales by departments and add new departments.


## Check the Video Demo here

# Technology Used
* MySQL
* Node.js
* npm packages
* JavaScript

