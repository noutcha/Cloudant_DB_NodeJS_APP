var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')
var request = require('request').defaults({json:true});


// Load the Cloudant library.
var Cloudant = require('cloudant');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var mydb;

/* Endpoint to greet and add a new book to database.
* Send a POST request to localhost:3000/api/visitors with body
* {
* 	"id": "value",
* 	"title": "value",
* 	"booksubjects": "value",
* 	"bookpublisher": "value",
* 	"booklanguage": "value",
......

* }
*/
app.post("/api/visitors", function (request, response) { 
	var id = request.body.id;
	var title = request.body.title;
	var booksubjects  = request.body.booksubjects;
	var bookpublisher = request.body.bookpublisher;
	var booklanguage = request.body.booklanguage;
	var bookyear = request.body.bookyear;
	var bookdate = request.body.bookdate;
	var bookcontributor = request.body.bookcontributor;
	var bookcollections = request.body.bookcollections;
	var bookcallNumber = request.body.bookcallNumber;
  if(!mydb) {
    console.log("No database.");
    response.send("Title of the book " + title + "!");
    return;
  }
  // insert the book into the database
  mydb.insert({"_id": id, "BookMeta_Title": title, "BookMeta_Subjects": booksubjects, "BookMeta_Publisher": bookpublisher, "BookMeta_Language": booklanguage, "BookMeta_Year": bookyear, "BookMeta_Date": bookdate, "BookMeta_Contributor": bookcontributor, "BookMeta_Collections": bookcollections, "BookMeta_CallNumber": bookcallNumber}, 
  function(err, body, header) {
    if (err) {
      return console.log('Error:', err.message);
    }
    response.send("The book " + title + "! has been added to the database.");
  });
});

/**
 * Endpoint to get a JSON array of all the documents in the database

 * @return An array of all the books
 */
 
 
app.get("/api/visitors", function (request, response) {
  var books = [];
  if(!mydb) {
    response.json(books);
    return;
  }
				
  mydb.list({ include_docs: true }, function(err, body) {
    if (!err) {
      body.rows.forEach(function(row) {
         if(row.doc._id)
		  books.push(row.doc._id);
		  books.push(row.doc.BookMeta_Title);
		  books.push(row.doc.BookMeta_Subjects);
		  books.push(row.doc.BookMeta_Publisher);
		  books.push(row.doc.BookMeta_Language);
		  books.push(row.doc.BookMeta_Year);
		  books.push(row.doc.BookMeta_Date);
		  books.push(row.doc.BookMeta_Contributor);
		  books.push(row.doc.BookMeta_Collections);
		  books.push(row.doc.BookMeta_CallNumber);
		  });
		  response.json(books);
    }
  });
});

// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/cloudant/)) {
  // Load the Cloudant library.
  var Cloudant = require('cloudant');

  // Initialize database with credentials
  if (appEnv.services['cloudantNoSQLDB']) {
     // CF service named 'cloudantNoSQLDB'
     var cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
  } else {
     // user-provided service with 'cloudant' in its name
     var cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
  }

  //database name
  var dbName = 'bookstores';
  
  // Remove any existing database called "bookstores".
 /* cloudant.db.destroy(dbName, function(err) {
	   if(!err) //err if database doesn't exists
      console.log("Created database: " + dbName);
  }*/
  // Create a new "mydb" database.
  /*cloudant.db.create(dbName, function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });*/

  // Specify the database we are going to use (mydb)...
  mydb = cloudant.db.use('bookstores');
}

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));



var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
