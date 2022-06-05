const express = require("express");
const url = "mongodb://localhost:27017";
require("../db/connectdb");
const ejs = require("ejs");
const studentdata = require("../stdschema/studentschema");
const path = require("path");
const port = 4500;
const app = express();

const htmlpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpathpath = path.join(__dirname, "../templates/partials");

app.use(express.static(htmlpath));
app.use(express.static(templatepath));
app.use(express.static(partialpathpath));
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", templatepath);


app.get("/", async (req, res) => {
  let data = await studentdata.find();
  res.render("index" , {data});
});


app.post("/", async (req, res) => {
  try {
    const {fname,lname,age,email} = req.body
    const create = new studentdata ({
      fname:fname,
      lname:lname,
      age:age,
      email:email
    })
    let result = await create.save()
  res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.get("/edit/:id", async (req, res) => {
try {
  const result = await studentdata.findById(req.params.id)
  res.render("edit" ,  {data:result});
} catch (error) {
  console.log(error);
}
});

app.post("/update/:id", async (req, res) => {
  try {
    const data = await studentdata.findByIdAndUpdate(req.params.id , req.body)
    console.log(data);
  } catch (error) {
    console.log(error);
    
  }
  res.redirect("/");
});

app.post("/delete/:id", async (req, res) => {
  try {
    const result = await studentdata.findByIdAndDelete(req.params.id)
    res.redirect("/");
    
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
