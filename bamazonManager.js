var mysql = require ("mysql");
var inquirer = require ("inquirer");

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"ayam",
	database:"bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("=====================================================");
    runSelected();
  });
  
  function runSelected() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "End Program"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
          case "View Products for Sale":
            viewProductsForSale();
            break;
  
          case "View Low Inventory":
            viewLowInventory();
            break;
  
          case "Add to Inventory":
            addToInventory();
            break;
  
          case "Add New Product":
            addNewProduct();
            break;
  
          case "End Program":
            endProgram();
            break;
        }
      });
  }
  
  function viewProductsForSale() {
    connection.query("SELECT * FROM products", function(err, results) {
      for(var i = 0; i < results.length; i++) {
        console.log("Product ID: " + results[i].id + " | Product Name: " + results[i].product_name + " | Price: " + results[i].price + " | Product Quantity: " + results[i].stock_quantity);
      }
      console.log("=====================================================");
      runSelected();
    });
  }
  
  function viewLowInventory() {
        connection.query("SELECT * FROM products WHERE stock_quantity < 10" , function(err, results) {
          console.log("Low inventory Report: ");
          for (var i = 0; i < results.length; i++) {
            console.log('=======================================');
            console.log('Item Id: ' + results[i].id);
            console.log('Product: ' + results[i].product_name);
            console.log('Department: ' + results[i].department_name);
            console.log('Price: ' + results[i].price);
            console.log('Inventory: ' + results[i].stock_quantity);
            console.log('=======================================');
          }
          runSelected();
      });
    }
  
  function validateInteger(input) {
      var reg = /^\d+$/;
      return reg.test(input) || "Inputs needs to be a positive number only!";
  }
  
  function addToInventory() {
  
      inquirer
        .prompt([
          {
            message: "Enter item id to be update: ",
            type: "input",
            name: "item_id",
            validate: validateInteger
          },
          {
            message: "Enter amount to adjust inventory: ",
            type: "input",
            name: "amount",
            validate: validateInteger
          }
  
        ]).then(function(input) {
                var item = input.id;
                var addQuantity = input.amount;
  
                var stringQuery = 'SELECT * FROM products WHERE ?';
  
                connection.query(stringQuery, {id: item}, function(err, results) {
                    if (err) throw err;
  
                    if (results.length === 0) {
                        console.log('Please enter a valid item id...');
                        addInventory();
  
                    } else {
                        var widget_item = results[0];
                console.log('==================================================');
                        console.log('Updating Inventory...');
  
                        var updatedQuery = 'UPDATE products SET stock_quantity = ' + (parseInt(widget_item.stock_quantity) + parseInt(addQuantity)) + ' WHERE id = ' + item;
  
                        connection.query(updatedQuery, function(err, results) {
                            if (err) throw err;
                            console.log('Item ID: ' + item + ' Updated to: '+ (parseInt(widget_item.stock_quantity) + parseInt(addQuantity)));
                  console.log('================================================');
  
                            runSelected();
                        })
                  }
        })
    })
  }
  
  function addNewProduct() {
    inquirer.prompt([
      {
        message: 'Enter name of product: ',
        type: 'input',
        name: 'product_name',
      },
      {
        message: 'Enter department: ',
        type: 'input',
        name: 'department_name'
      },
      {
        message: 'Enter price: ',
        type: 'input',
        name: 'price',
        validate: validateInteger
      },
      {
        message: 'Enter amount: ',
        type: 'input',
        name: 'stock_quantity',
        validate: validateInteger
      }
    ]).then (function (input) {
        console.log("==========================================================");
        var query = connection.query(
          "INSERT INTO products SET ?",
          {
              product_name: input.product_name,
              department_name: input.department_name,
              price: input.price,
              stock_quantity: input.stock_quantity
          },
          function(err, results) {
            console.log("Product " + input.product_name + " in the " + input.department_name + " department has been inserted at " + input.price + " dollars and there are " + input.stock_quantity + " of them.");
            console.log("======================================================");
            runSelected();
          })
  })
  }
  
  function endProgram() {
    console.log("Thank you user, you are not disconnected...");
    connection.end();
  }