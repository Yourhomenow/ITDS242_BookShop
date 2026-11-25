import { query } from "../config/db.js";

//Book API
async function formatBooks(book){
   //publisher
   const [publisher] = await query("SELECT * FROM `PUBLISHER`");
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
   const [author] = await query("SELECT * FROM `AUTHOR`");
   const author_lookUp = Object.fromEntries(
      author.map(aut => [aut.AuthorID, aut.AuthorName])
   );
   const [write] = await query("SELECT * FROM `WRITE`");
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
   const [category] = await query("SELECT * FROM `CATEGORY`");
   const category_lookUp = Object.fromEntries(
      category.map(cat => [cat.CategoryID, cat.CategoryName])
   );
   const [_in] = await query("SELECT * FROM `IN`");
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
   const [picture] = await query("SELECT * FROM `PICTURE`");
   for (let i in picture){
      let temp_picture = [];
      let temp_j = -1;
      for(let j in formatBook){
         if (formatBook[j].id == picture[i].BookID){
            temp_j = j;
            temp_picture = {id: picture[i].PicID ,name: picture[i].Name, url: picture[i].URL};
         }
      }
      if (temp_j > -1){
         formatBook[temp_j].picture.push(temp_picture);
      }
   }

   return formatBook
}

async function bookTransaction(name, operation, oldvalue, newvalue, BookID, AdminID=null){
   await query("INSERT INTO `BOOKTRANSACTION` (Timestamp, TargetField, Operation, OldValue, NewValue, AdminID, BookID) VALUE (NOW(), ?, ?, ?, ?, ?, ?)",
         [name, operation, oldvalue, newvalue, AdminID, BookID]
   )
}

// Testing Get All Books - Example 1
// method: GET
// URL: http://localhost:3005/api/admins/books
// body: None

// Testing Get All Books - Example 2
// method: GET
// URL: http://localhost:3005/api/admins/books
// body: None
export const getBooks = async () => {
   const [book] = await query("SELECT * FROM `BOOK`");

   const formatBook = await formatBooks(book);
   console.log(formatBook);

   return formatBook
}

// Testing Get Book by ID - Example 1
// method: GET
// URL: http://localhost:3005/api/admins/books/2
// body: None

// Testing Get Book by ID - Example 2
// method: GET
// URL: http://localhost:3005/api/admins/books/3
// body: None
export const getBooksID = async (id) => {
   const [book] = await query("SELECT * FROM `BOOK` WHERE BookID=?", [id]);

   const formatBook = await formatBooks(book);
   console.log(formatBook);
   
   return formatBook
}

// Testing Insert a Book - Example 1
// method: POST
// URL: http://localhost:3005/api/admins/books
// body: raw JSON
// {
//   "book": {
//     "name": "NewBook1",
//     "quantity": 0,
//     "price": 20.5,
//     "size": "10 x 80",
//     "isbnCode": null,
//     "publishDate": null,
//     "description": null
//   },
//   "publisher": "NewPublisher",
//   "author": "NewAuthor",
//   "category": "Comic&Manga",
//   "pictures": [
//     {
//       "name": "sky_striker_ace___hayate__2nd___artwork__by_nhociory_divvgwu-pre.png",
//       "url": "https://res.cloudinary.com/itds242-bookshop/image/upload/v1795438407/sky_striker_ace___hayate__2nd___artwork__by_nhociory_divvgwu-pre_pmyr8p.png"
//     }
//   ]
// }

// Testing Insert a Book - Example 2
// method: POST
// URL: http://localhost:3005/api/admins/books
// body: raw JSON
// {
//   "book": {
//     "name": "Testing 2",
//     "quantity": 50,
//     "price": 1000,
//     "size": "10 x 30",
//     "isbnCode": null,
//     "publishDate": null,
//     "description": null
//   },
//   "publisher": "HappyPrinter",
//   "author": "SuperCool PenName",
//   "category": "general",
//   "pictures": [
//     {
//       "name": "240_F_598107175_hIYhgCnsZGHoipDhkafiyv77l0IZB8f4.jpg",
//       "url": "https://res.cloudinary.com/itds242-bookshop/image/upload/v1795611977/240_F_598107175_hIYhgCnsZGHoipDhkafiyv77l0IZB8f4_pt0ntl.jpg"
//     }
//   ]
// }
export const postBooks = async (data) => {
   const formattedData = data;

   try{
      //publisher
      const publisher = formattedData.publisher.trim();
      const [publisherData] = await query("SELECT * FROM `PUBLISHER`");
      let publisherID = -1;
      for (let i in publisherData) {
         if (publisherData[i].PublisherName.toLowerCase() == publisher.toLowerCase()){
            publisherID = publisherData[i].PublisherID;
            break
         }
      }
      if (publisherID == -1){
         const [pubID] = await query("INSERT INTO `PUBLISHER` (PublisherName) VALUE (?)", [publisher]);
         publisherID = pubID.insertId;
      }

      //author
      const author = [...new Set(((formattedData.author).split(",")).map((e) => (e.trim())))];
      const [authorData] = await query("SELECT * FROM `AUTHOR`");
      let authorID = [];
      for (let i in author) {
         let flag = -1;
         for (let j in authorData){
            if (authorData[j].AuthorName.toLowerCase() == author[i].toLowerCase()){
               flag = authorData[j].AuthorID;
               break
            }
         }   
         if (flag > -1){
            authorID.push(flag);
         } else {
            const [autID] = await query("INSERT INTO `AUTHOR` (AuthorName) VALUE (?)", [author[i]]);
            authorID.push(autID.insertId);
         }
      }

      //category
      const category = [...new Set(((formattedData.category).split(",")).map((e) => (e.trim())))];
      const [categoryData] = await query("SELECT * FROM `CATEGORY`");
      let categoryID = [];
      for (let i in category) {
         let flag = -1;
         for (let j in categoryData){
            if (categoryData[j].CategoryName.toLowerCase() == category[i].toLowerCase()){
               flag = categoryData[j].CategoryID;
               break
            }
         }   
         if (flag > -1){
            categoryID.push(flag);
         } else {
            const [catID] = await query("INSERT INTO `CATEGORY` (CategoryName) VALUE (?)", [category[i]]);
            categoryID.push(catID.insertId);
         }
      }

      //book
      const book = formattedData.book;
      const [result] = await query(
         "INSERT INTO `BOOK` (BookName, QuantityInStock, Price, Size, ISBNCode, Description, PublishDate, PublisherID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
         [book.name, book.quantity, book.price, book.size, book.isbnCode || null, book.description || null, book.publishDate || null, publisherID]
      );

      //picture
      const pictures = formattedData.pictures;
      for (let i in pictures){
         await query("INSERT INTO `PICTURE` (`Name`, `URL`, BookID) VALUE (?, ?, ?)",
            [pictures[i].name, pictures[i].url, result.insertId]
         )
      }

      //in
      if (categoryID.length > 0){
         for (let i in categoryID){
            await query("INSERT INTO `IN` (BookID, CategoryID) VALUE (?, ?)", [result.insertId, categoryID[i]]);
         }
      }

      //write
      if (authorID.length > 0){
         for (let i in authorID){
            await query("INSERT INTO `WRITE` (BookID, AuthorID) VALUE (?, ?)", [result.insertId, authorID[i]]);
         }
      }

      //bookTransaction
      await bookTransaction("BookName", "INSERT", null, book.name, result.insertId); 

      return result.affectedRows > 0
   }catch (err){
      console.log(err);
      throw err;
   }
}

// Testing Edit a Book - Example 1
// method: PUT
// URL: http://localhost:3005/api/admins/books
// body: raw JSON
// {
//   "book": {
//     "name": null,
//     "quantity": 0,
//     "price": null,
//     "size": null,
//     "isbnCode": null,
//     "publishDate": null,
//     "description": "This book is so good"
//   },
//   "publisher": null,
//   "author": null,
//   "category": null,
//   "pictures": [
//     {
//       "name": "240_F_298370736_rPsYC77CnwkeYtxh5G8SvbqnPR56cHFK.jpg",
//       "url": "https://res.cloudinary.com/itds242-bookshop/image/upload/v1795442180/240_F_298370736_rPsYC77CnwkeYtxh5G8SvbqnPR56cHFK_div2i3.jpg"
//     }
//   ],
//   "deletePicID": [ 3 ]
// }

// Testing Edit a Book - Example 2
// method: PUT
// URL: http://localhost:3005/api/admins/books
// body: raw JSON
// {
//   "book": {
//     "name": "Unfunny Animals",
//     "quantity": "0",
//     "price": null,
//     "size": null,
//     "isbnCode": null,
//     "publishDate": null,
//     "description": "This Book is not that good"
//   },
//   "publisher": null,
//   "author": null,
//   "category": "General",
//   "pictures": null,
//   "deletePicID": null
// }
export const putBooks = async (id, data) => {
   async function updateBook(col, data, old, id){
      await query("UPDATE `BOOK` SET ??=? WHERE BookID=?", [col, data, id]);
      await bookTransaction(col, "UPDATE", old, data, id);
   }
   async function emptyBook(table, id) {
      await query("DELETE FROM ?? WHERE BookID=?", [table, id]);
   }
   const formattedData = data;
   const [old] = await getBooksID(id);

   //book
   const book = formattedData.book;
   for (let i in book){
      if (book[i] != null){
         if (i == "name"){
            await updateBook("BookName", book[i], old[i], id);
         }else if(i == "quantity"){
            await updateBook("QuantityInStock", book[i], old[i], id);
         }else if(i == "price"){
            await updateBook("Price", book[i], old[i], id);
         }else if(i == "size"){
            await updateBook("Size", book[i], old[i], id);
         }else if(i == "isbnCode"){
            await updateBook("ISBNCode", book[i], old[i], id);
         }else if(i == "description"){
            await updateBook("Description", book[i], old[i], id);
         }else if(i == "publishDate"){
            await updateBook("PublishDate", book[i], old[i], id);
         }
      }
   }

   //publisher
   if (formattedData.publisher != null){
      const publisher = formattedData.publisher.trim();
      const [publisherData] = await query("SELECT * FROM `PUBLISHER`");
      let publisherID = -1;
      let oldVa = null;
      for (let i in publisherData) {
         if (publisherData[i].PublisherName.toLowerCase() == old.publisher.toLowerCase()){
            oldVa = publisherData[i].PublisherID;
         }
         if (publisherData[i].PublisherName.toLowerCase() == publisher.toLowerCase()){
            publisherID = publisherData[i].PublisherID;
         }
      }
      if (publisherID == -1){
         const [pubID] = await query("INSERT INTO `PUBLISHER` (PublisherName) VALUE (?)", [publisher]);
         publisherID = pubID.insertId;
      }
      await updateBook("PublisherID", publisherID, oldVa, id);
   }

   //author
   if (formattedData.author != null){
      const author = [...new Set(((formattedData.author).split(",")).map((e) => (e.trim())))];
      const [authorData] = await query("SELECT * FROM `AUTHOR`");
      let authorID = [];
      for (let i in author) {
         let flag = -1;
         for (let j in authorData){
            if (authorData[j].AuthorName.toLowerCase() == author[i].toLowerCase()){
               flag = authorData[j].AuthorID;
               break
            }
         }   
         if (flag > -1){
            authorID.push(flag);
         } else {
            const [autID] = await query("INSERT INTO `AUTHOR` (AuthorName) VALUE (?)", [author[i]]);
            authorID.push(autID.insertId);
         }
      }

      await emptyBook("WRITE", id);
      if (authorID.length > 0){
         for (let i in authorID){
            await query("INSERT INTO `WRITE` (BookID, AuthorID) VALUE (?, ?)", [id, authorID[i]]);
         }
      }
   }
   
   //category
   if (formattedData.category != null){
      const category = [...new Set(((formattedData.category).split(",")).map((e) => (e.trim())))];
      const [categoryData] = await query("SELECT * FROM `CATEGORY`");
      let categoryID = [];
      for (let i in category) {
         let flag = -1;
         for (let j in categoryData){
            if (categoryData[j].CategoryName.toLowerCase() == category[i].toLowerCase()){
               flag = categoryData[j].CategoryID;
               break
            }
         }   
         if (flag > -1){
            categoryID.push(flag);
         } else {
            const [catID] = await query("INSERT INTO `CATEGORY` (CategoryName) VALUE (?)", [category[i]]);
            categoryID.push(catID.insertId);
         }
      }

      await emptyBook("IN", id);
      if (categoryID.length > 0){
         for (let i in categoryID){
            await query("INSERT INTO `IN` (BookID, CategoryID) VALUE (?, ?)", [id, categoryID[i]]);
         }
      }
   }

   //picture
   if (formattedData.pictures != null){
      const pictures = formattedData.pictures;
      for (let i in pictures){
         await query("INSERT INTO `PICTURE` (`Name`, `URL`, BookID) VALUE (?, ?, ?)",
            [pictures[i].name, pictures[i].url, id]
         )
      }
   }
   
   //deletePic
   if (formattedData.deletePicID != null){
      const deletePicID = formattedData.deletePicID;
      for (let i in deletePicID){
         await query("DELETE FROM `PICTURE` WHERE PicID=? AND BookID=?", [deletePicID[i], id]);
      }
   }

   return true
}

// Testing Delete Book - Example 1
// method: DELETE
// URL: http://localhost:3005/api/admins/books/1
// body: None

// Testing Delete Book - Example 2
// method: DELETE
// URL: http://localhost:3005/api/admins/books/7
// body: None
export const deleteBooks = async (id) => {
   const [result] = await query("DELETE FROM `BOOK` WHERE BookID=?", [id]);
   return result.affectedRows > 0
}