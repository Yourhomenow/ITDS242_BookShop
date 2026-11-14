import * as bookService from "../services/bookService.js"

//Book API
export const getBooks = async (req, res) => {
  try{
    const books = await bookService.getBooks();
    res.json({
      success: true,
      data: books
    });
  }catch(error){
    res.status(500).json({
        success: false,
        message: error.message
    });
  }
}

export const getBooksID = async (req, res) => {
  try{
    const book = await bookService.getBooksID(req.params.id);
    res.json({
      success: true,
      data: book
    });
  }catch(error){
    res.status(500).json({
        success: false,
        message: "ไม่สามารถดึงรายละเอียดหนังสือได้"
    });
  }
}

export const getBookRelated = async (req, res) => {
  try{
    const books = await bookService.getBookRelated(req.params.id);
    res.json({
        success: true,
        data: books
    });
  }catch(error){
    res.status(500).json({
        success: false,
        message: "ไม่สามารถดึงรายละเอียดหนังสือได้",
        error: error.message
    });
  }
}