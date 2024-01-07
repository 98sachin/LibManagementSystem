const express = require("express");

//JSON data import
// importing the data here form the data folder
const{books} = require("../data/books.json");
// const { route } = require("./users");
const{users} = require("../data/users.json");


const {UserModel, BookModel} = require("../models") // importing
const {getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById} = require("../controllers/book-controller") // importing


const router = express.Router();  // initializing the router

// now we can start defining the APIs.

/**
 * route: /books
 * method: GET
 * description: getting all books
 * access: Public
 * parameters: none
 */
// router.get("/",(req,res)=>{
//     res.status(200).json({success:true,data:books})
// })
router.get("/",getAllBooks);


/**
 * route: /books
 * method: GET
 * description: getting books by id
 * access: Public
 * parameters: id
 */
// router.get("/:id",(req,res)=>{
//     const {id} = req.params;  // getting the id
//     const book = books.find((each)=> each.id===id);  
//     if(!book){  // if we don't find the book
//         return res.status(404).json({
//             success:false,
//             message: "book not found"
//         })
//     }
//     return res.status(200).json({  // if we find the book
//         success: true,
//         data: book
//     })
// })
router.get("/:id",getSingleBookById);


/**
 * route: /books/issued
 * method: GET
 * description: getting all issued books
 * access: Public
 * parameters: none
 */
// router.get("/issued/books",(req,res)=>{
//     const usersWithIssuedBooks = users.filter((each)=>{  // the usersWithIssuedBoooks will be having an array of elements which have the name of users who have issued books
//         if(each.issuedBook) return each;
//     })
//     const issuedBooks = [];  // this array will have the user infomation as well as that particular book information.
//     usersWithIssuedBooks.forEach((each)=>{
//         const book = books.find((book)=>book.id===each.issuedBook)

//         book.issuedBy = each.name;
//         book.issuedDate = each.issuedDate;
//         book.returnDate = each.returnDate;

//         issuedBooks.push(book)
//     })
//     if(issuedBooks.length===0)
//     return res.status(404).json({
//         success:false,
//         message:"No Books Issued Yet"
//     })
//     return res.status(200).json({
//         success:true,
//         data: issuedBooks
//     })
// })
router.get("/issued/books", getAllIssuedBooks);


/**
 * route: /books
 * method: POST
 * description: create a new book
 * access: Public
 * parameters: none
 */
// router.post("/",(req,res)=>{
//     const {data} = req.body;  // getting the data as the user enters.

//     if(!data){  // if the user don't enter any data 
//         return res.status(400).json({
//             success: false,
//             message: "No data provided"
//         })
//     }
//     const book = books.find((each)=>each.id===data.id)  //searching the book in our book array
//     if(book){  // if we found the book
//         return res.status(404).json({
//             success: false,
//             message: "book with a given id already exist"
//         })
//     }
//     // now if don't find the book
//     const allBooks = [...books,data]  // with ...books we are adding all the books in the array and with data we are also adding the books entered by the user.
//     return res.status(201).json({
//         success: true,
//         data: allBooks
//     })
// })
router.post("/",addNewBook);

/**
 * route: /books/:id
 * method: PUT
 * description: Update a book
 * access: Public
 * parameters: Id
 */
// router.put("/:id",(req,res)=>{
//     const {id} = req.params;
//     const {data} = req.body;

//     const book = books.find((each)=>each.id===id);

//     if(!book){
//         return res.status(400).json({
//             success: false,
//             message: "Book not found with the given ID"
//         })
//     }
//     const updateData = books.map((each)=>{
//         if(each.id===id){
//             return{...each,...data};
//         }
//         return each;
//     })
//     return res.status(202).json({
//         success: true,
//         data: updateData
//     })
// })
router.put("/:id",updateBookById);




module.exports = router;