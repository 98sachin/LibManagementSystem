const mongoose = require("mongoose");

function DbConnection() {
    const DB_URL = process.env.Mongo_URI;

    mongoose.connect(DB_URL, {
        useNewUrlParser: true,  //optional
        useUnifiedTopology: true //optional
    })

    const db = mongoose.connection;

    db.on('error', console.error.bind(console,"Connection error :-(")) // if we have any database connectivity issue
    db.once("open",function(){  // if we don't have any connectivity issue
        console.log("DB Connected :-)");
    })
};

module.exports = DbConnection;