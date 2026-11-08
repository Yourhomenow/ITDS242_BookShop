import * as adminService from "../services/adminServices.js"

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

//Book API
export const getBooks = async (req, res) => {
  try{
    const books = await adminService.getBooks();
    res.status(200).json(books)
  }catch(err){
    console.error(`Error Fetching users`, err)
    res.status(500).json({message: "Internal server error, Can't get ฺBooks"})
  }
}

export const getBooksID = async (req, res) => {
  try{
    const book = await adminService.getBooksID(req.params.id);
    res.status(200).json(book)
  }catch(err){
    console.error(`Error Fetching users`, err)
    res.status(500).json({message: "Internal server error, Can't get this book"})
  }
}

export const postBooks = async (req, res) => {
  try{
    const response = await adminService.postBooks(req.body);
    res.status(200).json(response)
  }catch(err){
    console.error(`Error Fetching users`, err)
    res.status(500).json({message: "Internal server error, Can't insert this book"})
  }
}

export const putBooks = async (req, res) => {
  try{
    const response = await adminService.putBooks(req.params.id, req.body);
    res.status(200).json(response)
  }catch(err){
    console.error(`Error Fetching users`, err)
    res.status(500).json({message: "Internal server error, Can't update this book"})
  }
}

export const deleteBooks = async (req, res) => {
  try{
    const response = await adminService.deleteBooks(req.params.id);
    res.status(200).json(response);
  }catch(err){
    console.error(`Error Fetching users`, err)
    res.status(500).json({message: "Internal server error, Can't delete this book"})
  }
}