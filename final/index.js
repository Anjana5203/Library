
const express = require('express');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User=require("./UserSchema.js"); 
const Admin=require("./AdminSchema.js");  
const Book=require("./BookSchema.js"); 
const borrow=require("./borrowreq.js")
const fileUploader = require('express-fileupload'); //image

mongoose.connect('mongodb+srv://Anjana:anjana5203@cluster0.sgpv1lx.mongodb.net/MyExp');
const app = express();
app.use(fileUploader());

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
    res.send({"status":200,"data":"valid user", "user":data})
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

app.get('/profile', (req, res) => {console.log(req.body)
  console.log(req.query)
  fetchAUser(req,res)
})
async function fetchAUser(req,res){
  const id = req.query.id;
  var data = await User.findOne({"uid":id});
  res.send({"status":200,"data":data});
}

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



app.post('/borrowreq',async (req,res)=>{ console.log(req.body)
  const {BookID, email} = req.body
  res.send({"status":200,"data":"Borrowed Sus"})
  borrow.create(req.body);

})



app.get('/borrowreq',async(req,res)=>{
  console.log(req.body)
  console.log(req.query)
  fetchborrowreq(req, res)
})
async function fetchborrowreq(req, res) {
  var data = await borrow.find();
  res.send({ "status": 200, "data": data });

}



app.get('/borrow',async(req,res)=>{
  console.log(req.body)
  console.log(req.query)
  fetchBook(req, res)
})
async function fetchBook(req, res) {
  var data = await Book.find({borrowed:false});
  res.send({ "status": 200, "data": data });
}

app.post('/approve', async(req,res)=>{
  const BookID=req.body.BookID
  await borrow.findOneAndUpdate({BookID},{status:"Approved"})
  await Book.findOneAndUpdate({BookID},{borrowed:true})

  res.send({ "status": 200, "data": "Borrow approved" })
})

app.get('/viewborrowed', (req, res) => {
  console.log(req.body)
  console.log(req.query)
  fetchborrowed(req, res)
})
async function fetchborrowed(req, res) {
  var data = await borrow.find({status:"Approved"});
  res.send({ "status": 200, "data": data });
}

app.post('/return', async(req,res)=>{
  const BookID=req.body.BookID
  await borrow.findOneAndUpdate({BookID},{status:"Returned"})
  await Book.findOneAndUpdate({BookID},{borrowed:false})
  res.send({ "status": 200, "data": "Borrow returned" })

})





// BOOK ADD FUNCTIONALITIES
app.post("/bookup", async (req, res) => {
  console.log(req.body);
  const { BookISBN,BookID,BookName,Author,PublishYear,Description,image } = req.body;
  try {
    console.log({ BookISBN,BookID,BookName,Author,PublishYear,Description,image });
    let car = await Book.create({BookISBN,BookID,BookName,Author,PublishYear,Description ,image });
    console.log(car);
    
  } catch (e) {
    console.error(e);
    res.status(500).send({ status: 500, message: "An error occurred during." });
  }
});

app.get("/books",async(req,res)=>{
  try {
    res.send(await Book.find())
    
  } catch (e) {
    console.error(e);
    res.status(500).send({ status: 500, message: "An error occurred during." });
  }
})




app.delete('/user',(reg,res)=>{res.send("DELETE LIST");});

app.listen(PORT,() =>console.log(`Listening on port${PORT}..`));
