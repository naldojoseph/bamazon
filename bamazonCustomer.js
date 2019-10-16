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
	// connection.end();
	queryAllProducts();
  });
  
  function queryAllProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
	  for(var i = 0; i < res.length; i++) {
		console.log("Product ID: " + res[i].id + " | Product Name: " + res[i].product_name + " | Price: " + res[i].price);
	  }
	  console.log("=====================================================");
	  start();
	});
  }
  
  function start() {
	function validateInteger(input)
	  {
		 var reg = /^\d+$/;
		 return reg.test(input) || "Inputs needs to be a positive number only!";
	  }
	inquirer
		.prompt([
		  {
			message: "Please select item id of the product you want to purchase: ",
			type: "input",
			name: "id",
			validate: validateInteger
		  },
		  {
			message: "Please enter the amount you want to purchase: ",
			type: "input",
			name: "userOrderAmount",
			validate: validateInteger
		  }
		])
		.then(function(input) {
		  connection.query("SELECT * FROM products WHERE ?", {id: input.id}, function(err, results) {
			if (err) throw err;
			if (results.length === 0) {
			  console.log("Item Id you select does not exist...");
			  start();
			} else {
			  var product = results[0];
				if (input.userOrderAmount <= product.stock_quantity) {
				  console.log("Your order has been placed...");
  
				  var adjustStock = "UPDATE products SET stock_quantity = " + (product.stock_quantity - input.userOrderAmount) + ' WHERE id = ' + input.id;
  
				  connection.query(adjustStock, function(err, results) {
					if (err) throw err;
					console.log("Your total is $" + product.price * input.userOrderAmount);
					console.log(product.price);
					connection.end();
				  })
				} else {
				  console.log("You ordered more than we have. Please try reordering less...");
				  start();
			}
		  }
		})
	  })
	}