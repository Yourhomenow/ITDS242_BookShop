import { useEffect, useMemo, useState } from "react";

import BookCard from "../../shared/components/BookCard";
import banner from "../../assets/banner_shop.png";

export default function Search() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [price, setPrice] = useState(3000);

  // ดึงข้อมูลหนังสือจาก ITDS242_BookShop sql 
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/books/`);

        if (!response.ok) {
          throw new Error("โหลดข้อมูลไม่สำเร็จ");
        }
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message || "เกิดข้อผิดพลาด");
        }
        setBooks(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // ค้นหาหนังสือตามข้อมูลที่ใส้
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchSearch =
        book.title?.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        !category || book.category === category;

      const matchAuthor =
        book.author?.toLowerCase().includes(author.toLowerCase());

      const matchPublisher =
        book.publisher?.toLowerCase().includes(publisher.toLowerCase());

      const matchPrice =
        Number(book.price) <= price;

      return (
        matchSearch &&
        matchCategory &&
        matchAuthor &&
        matchPublisher &&
        matchPrice
      );
    });
  }, [books, search, category, author, publisher, price]);

  return (
    <main className="mx-auto max-w-[1180px] px-3 py-4 md:px-[18px] md:py-5">

      <section className="relative flex h-[230px] items-center justify-center overflow-hidden bg-gradient-to-b from-bookCream via-[#fff1ce] via-70% to-bookBlue text-center md:h-[250px]">
        <div>
          <img src={banner} alt="Mahasamut Banner" className="w-full h-64 object-cover"/></div>
      </section>
      <section className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[220px_1fr]">
        <aside className="rounded-xl bg-[#d9e8ed] p-4 text-xs">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-3 w-full rounded-lg p-2">
            <option value="">ทุกหมวดหมู่</option>
            <option value="Novel">นวนิยาย</option>
            <option value="General">หนังสือทั่วไป</option>
            <option value="Comic&Manga">หนังสือการ์ตูน</option>
            <option value="Study">ตำราเรียน</option>
            <option value="Magazine">นิตยสาร</option>
          </select>

          <input placeholder="ชื่อผู้แต่ง" value={author} onChange={(e) => setAuthor(e.target.value)} className="mb-3 w-full rounded-lg p-2"/>
          <input placeholder="สำนักพิมพ์" value={publisher} onChange={(e) => setPublisher(e.target.value)} className="mb-3 w-full rounded-lg p-2"/>
          <p>ราคาสูงสุด: {price} ฿</p>
          <input type="range"min="0"max="3000" value={price}  onChange={(e) => setPrice(Number(e.target.value))} className="w-full"/>
          <button
            onClick={() => {
              setCategory("");
              setAuthor("");
              setPublisher("");
              setPrice(3000);
              setSearch("");
            }}
            className="mt-3 text-blue-700">ล้างตัวกรอง</button>
        </aside>
        <div>
          <input placeholder="ค้นหาหนังสือ..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-4 w-full rounded-lg border p-3"/>
          {loading ? (
            <p className="text-center">กำลังโหลด...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredBooks.length === 0 ? (
            <p className="text-center">ไม่พบหนังสือ</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  image={book.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}