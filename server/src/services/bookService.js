import { query } from "../config/db.js";


// GET /api/books ดึงข้อมูลหนังสือทั้งหมด
export async function getBooks(){
    const [books] = await query(`
            SELECT
                B.BookID AS id,
                B.BookName AS title,
                B.Price AS price,
                B.QuantityInStock AS quantity,
                B.Size AS size,
                B.Description AS description,
                B.PublishDate AS publishDate,
                P.PublisherName AS publisher,

                (
                    SELECT GROUP_CONCAT(A.AuthorName SEPARATOR ', ')
                    FROM \`WRITE\` W
                    JOIN AUTHOR A ON W.AuthorID = A.AuthorID
                    WHERE W.BookID = B.BookID
                ) AS author,

                (
                    SELECT GROUP_CONCAT(C.CategoryName SEPARATOR ', ')
                    FROM \`IN\` I
                    JOIN CATEGORY C ON I.CategoryID = C.CategoryID
                    WHERE I.BookID = B.BookID
                ) AS category,

                (
                    SELECT PIC.URL
                    FROM PICTURE PIC
                    WHERE PIC.BookID = B.BookID
                    ORDER BY PIC.PicID ASC
                    LIMIT 1
                ) AS image

            FROM BOOK B
            JOIN PUBLISHER P ON B.PublisherID = P.PublisherID
            ORDER BY B.BookID;
        `);
    return books
}

// GET /api/books/:id ดึงรายละเอียดหนังสือตาม ID
export async function getBooksID(id) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                success: false,
                message: "BookID ไม่ถูกต้อง"
            });
        }

    const [books] = await query(`
        SELECT
            B.BookID AS id,
            B.BookName AS title,
            B.Price AS price,
            B.QuantityInStock AS quantity,
            B.ISBNCode AS isbn,
            B.Description AS description,
            B.PublishDate AS publishDate,
            B.Size AS size,
            P.PublisherName AS publisher,

            (
                SELECT GROUP_CONCAT(A.AuthorName SEPARATOR ', ')
                FROM \`WRITE\` W
                JOIN AUTHOR A ON W.AuthorID = A.AuthorID
                WHERE W.BookID = B.BookID
            ) AS author,

            (
                SELECT GROUP_CONCAT(C.CategoryName SEPARATOR ', ')
                FROM \`IN\` I
                JOIN CATEGORY C ON I.CategoryID = C.CategoryID
                WHERE I.BookID = B.BookID
            ) AS category

        FROM BOOK B
        JOIN PUBLISHER P ON B.PublisherID = P.PublisherID
        WHERE B.BookID = ?;
    `, [id]);

    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "ไม่พบหนังสือ"
        });
    }

    const [pictures] = await query(`
        SELECT
            PicID AS id,
            Name AS name,
            URL AS url
        FROM PICTURE
        WHERE BookID = ?
    `, [id]);

    return { ...books[0], images: pictures }
}

// GET /api/books/:id/related ดึงหนังสือหมวดหมู่เดียวกัน
export async function getBookRelated(id){
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
            success: false,
            message: "BookID ไม่ถูกต้อง"
        });
    }

    const [currentBook] = await query(`
        SELECT BookID
        FROM BOOK
        WHERE BookID = ?
    `, [id]);

    if (currentBook.length === 0) {
        return res.status(404).json({
            success: false,
            message: "ไม่พบหนังสือ"
        });
    }

    const [books] = await query(`
        SELECT
            B.BookID AS id,
            B.BookName AS title,
            B.Price AS price,

            (
                SELECT GROUP_CONCAT(A.AuthorName SEPARATOR ', ')
                FROM \`WRITE\` W
                JOIN AUTHOR A ON W.AuthorID = A.AuthorID
                WHERE W.BookID = B.BookID
            ) AS author,

            (
                SELECT PIC.URL
                FROM PICTURE PIC
                WHERE PIC.BookID = B.BookID
                ORDER BY PIC.PicID ASC
                LIMIT 1
            ) AS image

        FROM BOOK B

        WHERE B.BookID != ?

        AND EXISTS (
            SELECT 1
            FROM \`IN\` I1
            JOIN \`IN\` I2
                ON I1.CategoryID = I2.CategoryID
            WHERE I1.BookID = ?
            AND I2.BookID = B.BookID
        )

        ORDER BY B.BookID
        LIMIT 10;
    `, [id, id]);

    return books
}