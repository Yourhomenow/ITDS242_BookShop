import { Fragment, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams  } from "react-router-dom";

import BookCard from "../../shared/components/BookCard";
import banner from "../../assets/banner_shop.png";

export default function Search() {
  const {keyword = ""} = useParams();
  const [searchParams] = useSearchParams();
  const categoryKeyword = searchParams.get("category") || "";
  
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

  useEffect(() => {
    function checkSearch() {
      setSearch(keyword);
      setCategory(categoryKeyword);
    }

    checkSearch();
  }, [keyword, categoryKeyword]);

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
    <div className="bg-[#FAF9F6]">
    <main className="mx-auto min-h-screen max-w-[1180px] px-3 py-4 md:px-[18px] md:py-5 bg-white border-r border-l border-gray-200">

      <section className="relative flex h-[230px] items-center justify-center overflow-hidden bg-gradient-to-b from-bookCream via-[#fff1ce] via-70% to-bookBlue text-center md:h-[250px]">
        <div>
          <img src={banner} alt="Mahasamut Banner" className="w-full h-64 object-cover"/></div>
      </section>
      <section className="min-h-screen mt-5 grid grid-cols-1 gap-5 md:grid-cols-[220px_1fr]">
        <aside className="rounded-xl bg-[#d9e8ed] p-4 text-xs text-[#684D4D] font-medium">
          <div className="bg-[#DBD8F7] rounded-xl shadow-md mb-5 p-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full">
              <option value="">ทุกหมวดหมู่</option>
              <option value="Novel">นวนิยาย</option>
              <option value="General">หนังสือทั่วไป</option>
              <option value="Comic&Manga">หนังสือการ์ตูน</option>
              <option value="Study">ตำราเรียน</option>
              <option value="Magazine">นิตยสาร</option>
            </select>
          </div>
          <div className="bg-[#DBD8F7] rounded-xl shadow-md mb-5">
            <div className="flex gap-2 m-1 p-3 pt-4 pb-4 items-center">
              <span className="shrink-0">ชื่อผู้แต่ง</span>
              <input placeholder="" value={author} onChange={(e) => setAuthor(e.target.value)} className="min-h-[20px] w-full bg-white rounded-2xl"/>
            </div>
          </div>
          <div className="bg-[#DBD8F7] rounded-xl shadow-md mb-5">
            <div className="flex gap-2 m-1 p-3 pt-4 pb-4 items-center">
              <span className="shrink-0">สำนักพิมพ์</span>
              <input placeholder="" value={publisher} onChange={(e) => setPublisher(e.target.value)} className="min-h-[20px] w-full bg-white rounded-2xl"/>
            </div>
          </div>
          <div className="bg-[#DBD8F7] rounded-xl shadow-md mb-5">
            <p className="m-1 w-full rounded-lg p-3 pt-4 pb-4">ราคาสูงสุด: {price} ฿</p>
          </div>
          <input type="range"min="0"max="3000" value={price}  onChange={(e) => setPrice(Number(e.target.value))} className="w-full accent-[#FDF4D2]"
          />
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
    </div>
  );
}