require('dotenv').config();
const mongoose = require('mongoose')
const express = require("express");
const pizzas = require("./controllers/pizzas");
const orders = require("./controllers/orders");

const dbConnect = process.env.DB_CONNECT || "mongodb://localhost/izzas";
mongoose.connect(dbConnect);
const app = express();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'Successfully opened connection to Mongo!'));

const myMiddleware = (request, response, next) => {
    // do something with request and/or response
    request.foobar = "Savvy";
    next(); // tell express to move to the next middleware function
};

// CORS Middleware
const cors = (req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type, Accept,Authorization,Origin"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
};

app.use(express.json());
app.use(myMiddleware); // use the myMiddleware for every request to the app
app.use(cors);

//testing app
app.route("/")
    .get((request, response) => {
        response.send("HELLO WORLD");
    })
    .post((request, response) => {
        response.json(request.body);
    });

//  app.route("/pizzas/:id").get((request, response) => {
//     // express adds a "params" Object to requests
//     const id = request.params.id;
//     // handle GET request for post with an id of "id"
//     response.status(418).json({
//         id: id,
//         foobar : request.foobar
//     });
// });



app.use("/pizzas", pizzas);
app.use("/orders", orders);

//always last or it will catch any null 
app.route("/**").get((request, response) => {
    response.status(404).send("NOT FOUND");
});

const PORT = process.env.PORT || 4040; // we use || to provide a default value
app.listen(4040, () => console.log("Listening on port 4040"));