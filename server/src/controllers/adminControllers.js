import * as adminService from "../services/adminServices.js"
import * as adminBookService from "../services/adminBookServices.js"

//Admin Management
export const getAdmin = async (req, res)=>{
  try{
    const id = req.params.id
    const exceptId = req.query.e;
    console.log(Boolean(exceptId))
    console.log(typeof(exceptId))
    if (Boolean(exceptId) === true){
      const admins = await adminService.getAdminsExceptOne(id)
      return res.status(200).json(admins)
    }
    const admin = await adminService.getAdmin(id)
    return res.status(200).json(admin)
  }catch(err){
    console.error(`Error Fetching a admin`, err)
    res.status(500).json({message: "Internal server error, Can't get a admin"})
  }
}

export const getAdmins = async (req, res)=>{
  try{
    const admins = await adminService.getAdmins();
    res.status(200).json(admins)
  }catch(err){
    console.error(`Error Fetching admins`, err)
    res.status(500).json({message: "Internal server error, Can't get admins"})
  }
}


export const editAdmin = async (req, res) =>{
  try{
    const id = req.params.id
    const data = req.body
    const admin = await adminService.editAdmin(id,data);
    res.status(200).json(admin);

  }catch(err){
    console.error(`Error Editing admins`, err)
    res.status(500).json({message: "Internal server error, Can't edit admins"})
  }
}

export const deleteAdmin = async (req, res) =>{
  try{
    const id = Number(req.params.id)
    console.log(id)
    const admin = await adminService.deleteAdmin(id);
    if(!admin){
      res.status(404).json({message : "Admin not found"});
    }

    res.status(200).json({message : "deleted a admin"});

  }catch(err){
    console.error(`Error deleting admins`, err)
    res.status(500).json({message: "Internal server error, Can't delete a admin"})
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