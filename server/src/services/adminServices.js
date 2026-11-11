import { query } from "../config/db.js";
import { hashPassword } from "../utils/hash/hashed.js";

//Admin API
export const getAdmins = async ()=> {
   const result = await query("SELECT AdminID,Username,Status FROM ADMIN;");
   // console.log(result[0])
   return result[0]
}

export const addAdmin = async (data)=>{
   try{
      const q = 'INSERT INTO `ADMIN` (`Username`, `Password`, `Status`) VALUES (?)'
      const values = [
         data.Username,
         hashPassword(data.Password),
         "ACTIVE"
      ]

      await query(q,[values])
   }catch(err){
      if(err.code === "ER_DUP_ENTRY"){
         console.error(`DB error: ${err}`)
         throw err
      }
   }
}

//Book API
async function formatBooks(book){
   //publisher
   const [publisher] = await query("SELECT * FROM PUBLISHER");
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
   const [author] = await query("SELECT * FROM AUTHOR");
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
   const [category] = await query("SELECT * FROM CATEGORY");
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
   const [picture] = await query("SELECT * FROM PICTURE");
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
   await query("INSERT INTO booktransaction (Timestamp, TargetField, Operation, OldValue, NewValue, AdminID, BookID) VALUE (NOW(), ?, ?, ?, ?, ?, ?)",
         [name, operation, oldvalue, newvalue, AdminID, BookID]
   )
}

export const getBooks = async () => {
   const [book] = await query("SELECT * FROM BOOK");
   console.log(book)
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

export const postBooks = async (data) => {
   const formattedData = data;

   try{
      //publisher
      const publisher = formattedData.publisher.trim();
      const [publisherData] = await query("SELECT * FROM publisher");
      let publisherID = -1;
      for (let i in publisherData) {
         if (publisherData[i].PublisherName == publisher){
            publisherID = publisherData[i].PublisherID;
            break
         }
      }
      if (publisherID == -1){
         const [pubID] = await query("INSERT INTO publisher (PublisherName) VALUE (?)", [publisher]);
         publisherID = pubID.insertId;
      }

      //author
      const author = [...new Set(((formattedData.author).split(",")).map((e) => (e.trim())))];
      const [authorData] = await query("SELECT * FROM author");
      let authorID = [];
      for (let i in author) {
         let flag = -1;
         for (let j in authorData){
            if (authorData[j].AuthorName == author[i]){
               flag = authorData[j].AuthorID;
               break
            }
         }   
         if (flag > -1){
            authorID.push(flag);
         } else {
            const [autID] = await query("INSERT INTO author (AuthorName) VALUE (?)", [author[i]]);
            authorID.push(autID.insertId);
         }
      }

      //category
      const category = [...new Set(((formattedData.category).split(",")).map((e) => (e.trim())))];
      const [categoryData] = await query("SELECT * FROM category");
      let categoryID = [];
      for (let i in category) {
         let flag = -1;
         for (let j in categoryData){
            if (categoryData[j].CategoryName == category[i]){
               flag = categoryData[j].CategoryID;
               break
            }
         }   
         if (flag > -1){
            categoryID.push(flag);
         } else {
            const [catID] = await query("INSERT INTO category (CategoryName) VALUE (?)", [category[i]]);
            categoryID.push(catID.insertId);
         }
      }

      //book
      const book = formattedData.book;
      const [result] = await query(
         "INSERT INTO book (BookName, QuantityInStock, Price, Size, ISBNCode, Description, PublishDate, PublisherID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
         [book.name, book.quantity, book.price, book.size, book.isbnCode || null, book.description || null, book.publishDate || null, publisherID]
      );

      //picture
      const pictures = formattedData.pictures;
      for (let i in pictures){
         await query("INSERT INTO picture (`Name`, `URL`, BookID) VALUE (?, ?, ?)",
            [pictures[i].name, pictures[i].url, result.insertId]
         )
      }

      //in
      if (categoryID.length > 0){
         for (let i in categoryID){
            await query("INSERT INTO `in` (BookID, CategoryID) VALUE (?, ?)", [result.insertId, categoryID[i]]);
         }
      }

      //write
      if (authorID.length > 0){
         for (let i in authorID){
            await query("INSERT INTO `write` (BookID, AuthorID) VALUE (?, ?)", [result.insertId, authorID[i]]);
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

export const putBooks = async (id, data) => {
   async function updateBook(col, data, old, id){
      await query("UPDATE book SET ??=? WHERE BookID=?", [col, data, id]);
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
      const [publisherData] = await query("SELECT * FROM publisher");
      let publisherID = -1;
      let oldVa = null;
      for (let i in publisherData) {
         if (publisherData[i].PublisherName == old.publisher){
            oldVa = publisherData[i].PublisherID;
         }
         if (publisherData[i].PublisherName == publisher){
            publisherID = publisherData[i].PublisherID;
         }
      }
      if (publisherID == -1){
         const [pubID] = await query("INSERT INTO publisher (PublisherName) VALUE (?)", [publisher]);
         publisherID = pubID.insertId;
      }
      await updateBook("PublisherID", publisherID, oldVa, id);
   }

   //author
   if (formattedData.author != null){
      const author = [...new Set(((formattedData.author).split(",")).map((e) => (e.trim())))];
      const [authorData] = await query("SELECT * FROM author");
      let authorID = [];
      for (let i in author) {
         let flag = -1;
         for (let j in authorData){
            if (authorData[j].AuthorName == author[i]){
               flag = authorData[j].AuthorID;
               break
            }
         }   
         if (flag > -1){
            authorID.push(flag);
         } else {
            const [autID] = await query("INSERT INTO author (AuthorName) VALUE (?)", [author[i]]);
            authorID.push(autID.insertId);
         }
      }

      await emptyBook("write", id);
      if (authorID.length > 0){
         for (let i in authorID){
            await query("INSERT INTO `write` (BookID, AuthorID) VALUE (?, ?)", [id, authorID[i]]);
         }
      }
   }
   
   //category
   if (formattedData.category != null){
      const category = [...new Set(((formattedData.category).split(",")).map((e) => (e.trim())))];
      const [categoryData] = await query("SELECT * FROM category");
      let categoryID = [];
      for (let i in category) {
         let flag = -1;
         for (let j in categoryData){
            if (categoryData[j].CategoryName == category[i]){
               flag = categoryData[j].CategoryID;
               break
            }
         }   
         if (flag > -1){
            categoryID.push(flag);
         } else {
            const [catID] = await query("INSERT INTO category (CategoryName) VALUE (?)", [category[i]]);
            categoryID.push(catID.insertId);
         }
      }

      await emptyBook("in", id);
      if (categoryID.length > 0){
         for (let i in categoryID){
            await query("INSERT INTO `in` (BookID, CategoryID) VALUE (?, ?)", [id, categoryID[i]]);
         }
      }
   }

   //picture
   if (formattedData.pictures != null){
      const pictures = formattedData.pictures;
      for (let i in pictures){
         await query("INSERT INTO picture (`Name`, `URL`, BookID) VALUE (?, ?, ?)",
            [pictures[i].name, pictures[i].url, id]
         )
      }
   }
   
   //deletePic
   if (formattedData.deletePicID != null){
      const deletePicID = formattedData.deletePicID;
      for (let i in deletePicID){
         await query("DELETE FROM picture WHERE PicID=? AND BookID=?", [deletePicID[i], id]);
      }
   }

   return true
}

export const deleteBooks = async (id) => {
   const [result] = await query("DELETE FROM book WHERE BookID=?", [id]);
   return result.affectedRows > 0
}
