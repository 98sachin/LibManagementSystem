const {BookModel, UserModel} = require("../models");
const issuedBook = require("../DTOs/book-dto")

// now we will create certain APIs.

// =====================================================================
// below is the normal way to write api and export it , but does not holds good for lots of apis/data.
// const getAllBooks = () => {};
// const getSingleBookById => {};

// module.exports = {getAllBooks, getSingleBookById} // it will not make our code look good if we want to export a lots of APIs . So now we will use a different approach . 
// =====================================================================
// follow the code below to see the different approach. Here we don't have to write the export commad separataely.
// API #1
exports.getAllBooks = async (req,res) => {
    const books =  await BookModel.find(); // using await to connec to the database
    // for negative response(below)
    if(books.length===0)
    return res.status(404).json({
        success: false,
        message: "No Book Found"
})
// for positive response(below)
return res.status(200).json({
    success: true,
    data: books
})
};

// API #2
exports.getSingleBookById = async (req,res) => {
    const {id} = req.params

    const book = await BookModel.find(id);  // crosschecking if the particular id exist or not

    if(!book)
    return res.status(404).json({
        success: false,
        message: "Book Not Found With the Given Id"
    })
    return res.status(200).json({
        success: true,
        data: book
    })
};

// API #3
exports.getAllIssuedBooks = async (req,res) => {
    const users = await UserModel.find({
        issuedBook:{$exists:true}
    }).populate("issuedBook")

    // DTOs (Data Transform Objects)
    const issuedBooks = user.map((each)=> new issuedBook(each))

    if(issuedBooks.length===0)
    return res.status(404).json({
        success:false,
        message:"No Books Issued Yet"
    })
    return res.status(200).json({
        success:true,
        data: issuedBooks
    })
};

// API #4
exports.addNewBook = async (req,res) => {
    const {data} = req.body;

    if(!data){
        return res.status(404).json({
            success: false,
            message: "No Data Provided"
        })
    }
    await BookModel.create(data);
    const allBooks = await BookModel.find();
    
    return res.status(201).json({
        success: true,
        data: allBooks
    })
};

// API #5
exports.updateBookById = async(req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    const updatedBook = await BookModel.findOneAndUpdate({
        _id: id,
    }, data, {
        new: true
    })

    return res.status(202).json({
        success: true,
        data: updatedBook
    })
}