

const express = require("express"); //load express
const Datastore = require("nedb"); //load nedb database
const port = process.env.PORT || 8081; //setup port, or if loaded locally use 3000
const app = express(); //setup express
const http = require("http")
const server = http.createServer(app);

server.listen(port, () => console.log("listening")); //console.log if setup
app.use(express.static("public")); //set up root directory for front end
app.use(express.json({ limit: "1mb" })); //set limits for data

const database = new Datastore("database.db"); //database for storing my user logged data
database.loadDatabase(); //load database


app.post("/api", (request, response) => {
	console.log(database;)
  const data = request.body; //get data from the main body of the request
  const timestamp = Date.now(); //set timestamp as current date/time
  data.timestamp = timestamp; //add timestamp to data
  response.json(data); //takes response for data
  database.insert(data); //add data to database
  console.log(data); //data to console
}); //route post request

app.get("/api", (request, response) => {
  database.find({}, function(err, docs) {
    response.json(docs); //takes response from docs
  }); //find database
}); //route get request

var oscServer, oscClient;

var isConnected = false;

var osc = require('node-osc');
var io = require('socket.io')(server);


io.sockets.on('connection', function (socket) {
	console.log('connection');
	socket.on("config", function (obj) {
		isConnected = true;
    	oscServer = new osc.Server(obj.server.port, obj.server.host);
	    oscClient = new osc.Client(obj.client.host, obj.client.port);
	    oscClient.send('/status', socket.sessionId + ' connected');
		oscServer.on('message', function(msg, rinfo) {
			socket.emit("message", msg);
		});
		socket.emit("connected", 1);
	});
 	socket.on("message", function (obj) {
		oscClient.send.apply(oscClient, obj);
  	});
	socket.on('disconnect', function(){
		if (isConnected) {
			oscServer.close();
			oscClient.close();
		}
  	});
});