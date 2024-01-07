const express = require("express");

const dotenv = require("dotenv");
dotenv.config(); // to configure the app.

// //JSON data import
// // importing the data here form the data folder
// const{users} = require("./data/users.json");
// const{books} = require("./data/books.json");    

//DataBase Connection
const DbConnection = require("./databaseConnection.js");
DbConnection(); // calling the database

// importing routes
const userRouter = require("./routes/users.js"); // the .js with the user is optional, it is by default understood that the file is a js file
const booksRouter = require("./routes/books");  // here we did not write .js with books. but its understood that its a js file.

const app = express();
const port = 8081;

app.use(express.json());
app.get("/",(req,res)=>{ // home API
    // res.status(200).send("hey! hi") // with send we only have the flexibility to send only one data, so instead of send we will use json.
    res.status(200).json({
        message: "Server is up and running"
        // data:123 // this is just an example to show that we can send some other info. or data with json.
    })
})


// all the routes and api used below is for users
// we will redirect it to users.js i.e., if you get /users we need to redirec it to users.js file.
// similarly if you get /books it needs to be redirected to books.js.
// redirecting code below
app.use("/users", userRouter);
app.use("/books", booksRouter);


// to handle the default url or to handle the url which is not build
app.all("*",(req,res)=>{
    res.status(500).json({
        message: "This route doesn't exist."
    })
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})