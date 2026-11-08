import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookCard from "../../shared/components/BookCard";

export default function Detail() {
  const { id } = useParams();

  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ดึงข้อมูลหนังสือจาก ITDS242_BookShop SQL
useEffect(() => {
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      // ดึงรายละเอียดหนังสือ
      const response = await fetch(`/api/books/${id}`);
      if (!response.ok) {
        throw new Error("โหลดข้อมูลไม่สำเร็จ");
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "เกิดข้อผิดพลาด");
      }
      setBook(result.data);

      // ดึงหนังสือแนะนำ
      const relatedResponse = await fetch(`/api/books/${id}/related`);
      if (!relatedResponse.ok) {
        throw new Error("โหลดหนังสือแนะนำไม่สำเร็จ");
      }
      const relatedResult = await relatedResponse.json();
      setBooks(
        Array.isArray(relatedResult.data)
          ? relatedResult.data
          : []
      );
    } catch (err) {
      console.error("Fetch books error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchBooks();
}, [id]);

  // หนังสือแนะนำ แทบด้านล่าง
  const recommendations = books;
  if (loading) {
    return <p className="py-10 text-center">กำลังโหลด...</p>;
  }

  if (error) {
    return (
      <main className="mx-auto max-w-[1180px] px-3 py-5">
        <p className="text-center text-red-500">{error}</p>
        <Link to="/search" className="mt-3 block text-center text-blue-600">
          กลับไปหน้าค้นหา
        </Link>
      </main>
    );
  }

  if (!book) return null;

  return (
    <main className="mx-auto max-w-[1180px] px-3 py-5 md:px-[18px] md:py-7">

      <p className="mb-3 text-xs text-[#9a8589]">
        <Link to="/home">หน้าหลัก</Link>　›　
        <Link to="/search">หนังสือ</Link>　›　{book.title}</p>

      <section className="flex gap-4 rounded-xl border border-[#eadfd6] bg-white p-3 md:gap-6 md:p-6">

        {/* รูปหนังสือ */}
        <div className="flex h-[190px] w-[125px] shrink-0 items-center justify-center overflow-hidden rounded-xl border-[6px] border-bookLavender bg-white md:h-[275px] md:w-[190px]">

          {book.images?.length > 0 ? (
            <img src={book.images[0].url}alt={book.title}className="h-full w-full object-contain"/>
          ) : (
            <span className="text-xs text-stone-400">ไม่มีรูปภาพ</span>
          )}

        </div>

        {/* ข้อมูลหนังสือ */}
        <div className="flex-1 py-1">
          <span className="rounded-full bg-bookLavender px-3 py-1 text-[11px] text-[#8c70a0]">{book.category}</span>

          <h1 className="mb-4 mt-2 text-xl font-bold md:mb-6 md:text-2xl">{book.title}</h1>
          <p className="text-xs leading-7 text-[#9a8589]">ผู้แต่ง: {book.author || "-"}
            <br />สำนักพิมพ์: {book.publisher || "-"}</p>
          <div className="mt-4 border-t border-stone-100 pt-4 text-xl font-bold text-bookPurple">{Number(book.price).toLocaleString("th-TH")} ฿</div></div>
      </section>

      {/* รายละเอียดเพิ่มเติมของหนังสือ */}
      <section className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-[2fr_1.35fr]">

        <div className="min-h-28 rounded-xl bg-bookCream p-4">
          <h2 className="mb-3 text-sm font-bold text-bookPurple">รายละเอียดหนังสือ</h2>
          <p className="text-xs text-[#8f7a7d]">{book.description || "ไม่มีรายละเอียดหนังสือ"}</p>
        </div>
        <div className="rounded-xl bg-bookCream p-4">
          <h2 className="mb-2 text-sm font-bold text-bookPurple">ข้อมูลหนังสือ</h2>

          <div className="space-y-1 text-xs text-[#8f7a7d]">
            <p>ISBN<span className="float-right">{book.isbn || "-"}</span></p>
            <p>ผู้แต่ง<span className="float-right">{book.author || "-"}</span></p>
            <p>สำนักพิมพ์<span className="float-right">{book.publisher || "-"}</span></p>
            <p>จำนวนหน้า<span className="float-right">{book.pages || "-"}</span></p>
          </div>
        </div>
      </section>

      {/* หนังสือแนะนำ */}
      <section className="mt-4 rounded-sm bg-gradient-to-r from-[#d6e8ed] to-[#a6cee0] p-4">

        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold text-bookPurple">
            หนังสือที่คุณอาจสนใจ
          </h2>
          <Link to="/search" className="text-[11px]">
            ดูทั้งหมด ›
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {recommendations.slice(0, 3).map((item) => (
            <BookCard
              key={item.id}
              id={item.id}
              title={item.title}
              author={item.author}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </section>
    </main>
  );
}