import * as adminService from "../services/adminServices.js"
import * as adminBookService from "../services/adminBookServices.js"

//Admin Management
export const getAdmins = async (req, res)=>{
  try{
    const user = await adminService.getAdmins();
    res.status(200).json(user)
  }catch(err){
    console.error(`Error Fetching users`, err)
    res.status(500).json({message: "Internal server error, Can't get users"})
  }
}

export const createAdmin = async (req, res)=>{
  try{
    const adminData = req.body;
    console.log(adminData)
    const newAdmin = await adminService.addAdmin(adminData)
    res.status(200).json(newAdmin)
  }catch(err){
    console.error(`Error Adding client:`,err)
    res.status(500).json({message : "Internal Error, can't create admin"})
  }
}

//Book API
export const getBooks = async (req, res) => {
  try{
    const books = await adminBookService.getBooks();
    res.status(200).json(books)
  }catch(err){
    console.error(`Error Fetching users`, err)
    res.status(500).json({message: "Internal server error, Can't get ฺBooks"})
  }
}

export const getBooksID = async (req, res) => {
  try{
    const book = await adminBookService.getBooksID(req.params.id);
    res.status(200).json(book)
  }catch(err){
    console.error(`Error Fetching users`, err)
    res.status(500).json({message: "Internal server error, Can't get this book"})
  }
}

export const postBooks = async (req, res) => {
  try{
    const response = await adminBookService.postBooks(req.body);
    res.status(200).json(response)
  }catch(err){
    console.error(`Error Fetching users`, err)
    res.status(500).json({message: "Internal server error, Can't insert this book"})
  }
}

export const putBooks = async (req, res) => {
  try{
    const response = await adminBookService.putBooks(req.params.id, req.body);
    res.status(200).json(response)
  }catch(err){
    console.error(`Error Fetching users`, err)
    res.status(500).json({message: "Internal server error, Can't update this book"})
  }
}

export const deleteBooks = async (req, res) => {
  try{
    const response = await adminBookService.deleteBooks(req.params.id);
    res.status(200).json(response);
  }catch(err){
    console.error(`Error Fetching users`, err)
    res.status(500).json({message: "Internal server error, Can't delete this book"})
  }
}