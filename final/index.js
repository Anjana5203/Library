
const express = require('express');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User=require("./UserSchema.js"); 
const Admin=require("./AdminSchema.js");  
const Book=require("./BookSchema.js"); 
const Borrow=require("./BorrowSchema.js"); 
const BorrowedBook = require("./borrowedBook.js");
mongoose.connect('mongodb+srv://Anjana:anjana5203@cluster0.sgpv1lx.mongodb.net/MyExp');
const app = express();
app.use(bodyParser.json());
app.use(express.json());
let PORT = 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5003');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});



app.post('/login',(req,res)=>{console.log(req.body)
  console.log(req.query)
  login(req,res)
})
async function login(req,res){
  var data=await User.findOne(req.body);
  data=data||0;
  if(data!=0){
    res.send({"status":200,"data":"valid user"})
  }
  else(
    res.send({"status":404,"data":"invalid user"})
  )
}


app.post('/login2',(req,res)=>{console.log(req.body)
  console.log(req.query)
  login2(req,res)
})
async function login2(req,res){
  var data=await Admin.findOne(req.body);
  data=data||0;
  if(data!=0){
    res.send({"status":200,"data":"valid admin"})
  }
  else(
    res.send({"status":404,"data":"invalid admin"})
  )
}


app.post('/signup',(req,res)=>{console.log(req.body)
  console.log(req.body)
  res.send({"status":200,"data":"User created Sus"})
  User.create(req.body);
})

app.get('/viewuser', (req, res) => {console.log(req.body)
  console.log(req.query)
  fetchusers(req,res)
})


async function fetchusers(req,res){
  var data = await User.find();
  res.send({"status":200,"data":data});
}


app.post('/searchuser', (req, res) => {
  const searchInput = req.body.searchInput;
  searchUsers(searchInput, res);
});

async function searchUsers(searchInput, res) {
  try {
    const data = await User.find({ userID: searchInput });

    res.send({ status: 200, data: data });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: 'An error occurred during the search.' });
  }
}


app.delete('/deleteuser', async (req, res) => {
  try {
    const userID = req.query.userID || req.body.userID;
    await User.deleteOne({ userID: userID });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete the User' });        
  }
});





app.post('/bookup',(req,res)=>{console.log(req.body)
  console.log(req.body)
  res.send({"status":200,"data":"Book created Sus"})
  Book.create(req.body);
})


app.get('/viewbook', (req, res) => {console.log(req.body)
  console.log(req.query)
  fetchBook(req,res)
})
async function fetchBook(req,res){
  var data = await Book.find();
  res.send({"status":200,"data":data});
}



app.post('/searchbook', (req, res) => {
  const searchInput = req.body.searchInput;
  searchBook(searchInput, res);
});

async function searchBook(searchInput, res) {
  try {
    const data = await Book.find({ BookID: searchInput });

    res.send({ status: 200, data: data });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: 'An error occurred during the search.' });
  }
}




app.delete('/deletebook', async (req, res) => {
  try {
    const BookID = req.query.BookID || req.body.BookID;
    await Book.deleteOne({ BookID: BookID });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete the Book' });
  }
});



app.post('/adminup', (req, res) => {
  console.log(req.query); // Access the query parameters using req.query
  res.send({"status": 200, "data": "Admin created Sus"});
  
  // Create the admin using the query parameters
  Admin.create(req.query);
});

app.get('/viewadmin', (req, res) => {console.log(req.body)
  console.log(req.query)
  fetchAdmin(req,res)
})
async function fetchAdmin(req,res){
  var data = await Admin.find();
  res.send({"status":200,"data":data});
}

app.post('/borrowup',(req,res)=>{console.log(req.body)
  console.log(req.body)
  res.send({"status":200,"data":"Borrow List created Successfully"})
  Borrow.create(req.body);
})



app.post('/search', (req, res) => {
  const {Author, BookName} = req.body
  let search ={}
  if (Author != "") {
    search.Author = Author
  }
  if (BookName != "") {
    search.BookName = BookName
  }
  
  console.log("searching for", search)
  searchBK(search, res);
});
async function searchBK(searchInput, res) {
  try {
    const data = await Book.find(searchInput);
    res.send({ status: 200, data: data });
  } 
  catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: 'An error occurred during the search.' });
  }
}

app.post('/borrow', async (req, res) => {
  const { userID, bookID } = req.body;

  // Check if the book is available
  const book = await Book.findOne({ bookID }).exec();
  if (!book) {
    return res.json({ success: false, error: 'The book is not available for borrowing.' });
  }

  // Check if the user exists
  const user = await User.findOne({ userID }).exec();
  if (!user) {
    return res.json({ success: false, error: 'The user does not exist.' });
  }

  // Initialize borrowedBooks if it's undefined
  if (!user.borrowedBooks) {
    user.borrowedBooks = [];
  }

  // Check if the user has already borrowed the book
  if (user.borrowedBooks.includes(bookID)) {
    return res.json({ success: false, error: 'You have already borrowed this book.' });
  }

  // Update the user's borrowed books and save the changes
  user.borrowedBooks.push(bookID);
  await user.save();

  // Update the book's availability status and save the changes
  book.available = false;
  await book.save();

  return res.json({ success: true, message: 'Book borrowed successfully.' });
});


app.get("/borrowedbooks", (req, res) => {
  BorrowedBook.find()
    .then(borrowedBooks => {
      res.json(borrowedBooks);
    })
    .catch(error => {
      console.error("Error retrieving borrowed books:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});





app.get('/', (req, res) => {
  console.log(req.body);
    console.log(req.query);
    console.log(req.body);
    datafetch(res)
  })

async function datafetch(res){  
  res.send(await User.find());
}
app.get('/', (req, res) => {
  console.log(req.body);
    console.log(req.query);
    console.log(req.body);
    datafetch(res)
  })

  app.get('/', (req, res) => {
    res.send("ok");
    })
 
  
app.put('/',(req,res)=>{
  console.log(req.query);
  console.log(req.body);
  dataupdate(req,res)
})
  async function dataupdate(req,res){
    console.log(req.query);
    console.log(req.body);
    res.send(await User.updateOne({"id":req.query.id},{$set:req.body}))
}
    async function datadelete(req,res){
      console.log(req.query);
      console.log(req.body);
      res.send(await User.deleteOne({"id":req.query.id}))
  }
app.delete('/user',(reg,res)=>{res.send("DELETE LIST");});

app.listen(PORT,() =>console.log(`Listening on port${PORT}..`));
