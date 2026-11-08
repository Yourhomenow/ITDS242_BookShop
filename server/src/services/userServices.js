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
            temp_picture = {id: picture[i].PicID ,name: picture[i].Name, url: picture[i].URL};
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
      await query("INSERT INTO booktransaction (Timestamp, TargetField, Operation, OldValue, NewValue, AdminID, BookID) VALUE (NOW(), ?, ?, ?, ?, ?, ?)",
         ["BookName", "INSERT", null, book.name, null, result.insertId]
      )

      return result.affectedRows > 0
   }catch (err){
      console.log(err);
      throw err;
   }
}

export const putBooks = async (id, bookData) => {
   return {data: "hi"}
}

export const deleteBooks = async (id) => {
   const [result] = await query("DELETE FROM book WHERE BookID=?", [id]);
   return result.affectedRows > 0
}