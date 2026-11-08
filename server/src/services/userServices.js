import { query } from "../config/db.js";

export const getUsers = async ()=> {
   return {data: "hiiii!"}
}

//Book API
async function formatBooks(book){
   //publisher
   const [publisher] = await query("SELECT * FROM publisher");
   const publisher_lookUp = Object.fromEntries(
      publisher.map(pub => [pub.PublisherID, pub.PublisherName])
   );
   for (let i in book){
      book[i].publisher = publisher_lookUp[book[i].PublisherID];
   };

   const formatBook = book.map(book => ({
      id: book.BookID, 
      name: book.BookName,
      quantity: book.QuantityInStock,
      isbnCode: book.ISBNCode,
      price: book.Price,
      description: book.Description,
      publishDate: book.PublishDate,
      size: book.Size,
      publisher: book.publisher,
      author: [],
      category: [],
      picture: []
   }));

   //author
   const [author] = await query("SELECT * FROM author");
   const author_lookUp = Object.fromEntries(
      author.map(aut => [aut.AuthorID, aut.AuthorName])
   );
   const [write] = await query("SELECT * FROM `write`");
   for (let i in write){
      let temp_author = "";
      let temp_j = -1;
      for(let j in formatBook){
         if (formatBook[j].id == write[i].BookID){
            temp_j = j;
            temp_author = author_lookUp[write[i].AuthorID];
         }
      }
      if (temp_j > -1){
         formatBook[temp_j].author.push(temp_author);
      }
   }

   //category
   const [category] = await query("SELECT * FROM category");
   const category_lookUp = Object.fromEntries(
      category.map(cat => [cat.CategoryID, cat.CategoryName])
   );
   const [_in] = await query("SELECT * FROM `in`");
   for (let i in _in){
      let temp_category = "";
      let temp_j = -1;
      for(let j in formatBook){
         if (formatBook[j].id == _in[i].BookID){
            temp_j = j;
            temp_category = category_lookUp[_in[i].CategoryID];
         }
      }
      if (temp_j > -1){
         formatBook[temp_j].category.push(temp_category);
      }
   }

   //picture
   const [picture] = await query("SELECT * FROM picture");
   for (let i in picture){
      let temp_picture = [];
      let temp_j = -1;
      for(let j in formatBook){
         if (formatBook[j].id == picture[i].BookID){
            temp_j = j;
            temp_picture = {name: picture[i].Name, url: picture[i].URL};
         }
      }
      if (temp_j > -1){
         formatBook[temp_j].picture.push(temp_picture);
      }
   }

   return formatBook
}

export const getBooks = async () => {
   const [book] = await query("SELECT * FROM book");

   const formatBook = await formatBooks(book);
   console.log(formatBook);

   return formatBook
}

export const getBooksID = async (id) => {
   const [book] = await query("SELECT * FROM book WHERE BookID=?", [id]);

   const formatBook = await formatBooks(book);
   console.log(formatBook);
   
   return formatBook
}

export const postBooks = async (bookData) => {
   return {data: "hi"}
}

export const putBooks = async (id, bookData) => {
   return {data: "hi"}
}

export const deleteBooks = async (id) => {
   const [result] = await query("DELETE FROM book WHERE BookID=?", [id]);
   return result.affectedRows > 0
}