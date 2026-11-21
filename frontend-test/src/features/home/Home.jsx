import { useEffect, useState } from "react";

import logo from "../../assets/logo.png";

import BookCard from "../../shared/components/BookCard";
import banner from "../../assets/banner_shop.png";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ดึงข้อมูลหนังสือจาก ITDS242_BookShop sql
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/books/`);
        if (!response.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");

        const result = await response.json();
        if (!result.success) throw new Error(result.message || "เกิดข้อผิดพลาด");

        setBooks(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // แสดงรายการหนังสือ (ใช้ซ้ำทั้งส่วน BOOK และ NEW ARRIVAL)
  const renderBooks = (list) => {
    if (loading) return <p>กำลังโหลด...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (list.length === 0) return <p>ไม่พบหนังสือ</p>;

    return list.map((book) => (
      <div key={book.id} className="w-44 shrink-0">
        <BookCard
          id={book.id}
          title={book.title}
          author={book.author}
          price={book.price}
          image={book.image}
        />
      </div>
    ));
  };

  return (
    <div className="bg-[#FAF9F6]">
      <main className="mx-auto min-h-screen max-w-[1180px] border-l border-r border-gray-200 bg-white px-3 py-4 md:px-[18px] md:py-5">
        {/* Banner (เหมือน Search.jsx) */}
        <section className="relative flex h-[230px] items-center justify-center overflow-hidden bg-gradient-to-b from-bookCream via-[#fff1ce] via-70% to-bookBlue text-center md:h-[250px]">
          <div>
            <img src={banner} alt="Mahasamut Banner" className="h-64 w-full object-cover" />
          </div>
        </section>

        {/* BOOK */}
        <h2 className="mt-8 mb-2 text-xl font-bold tracking-wide text-[#946D6D]">BOOK</h2>
        <section className="flex items-center gap-4 border-y border-[#c9a0dc] px-2 py-6">
          <button type="button" aria-label="ก่อนหน้า" className="shrink-0 text-[#946D6D]">
            <svg className="size-6 rotate-90"><use href="#i-chev" /></svg>
          </button>

          <div className="flex min-w-0 flex-1 justify-around gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {renderBooks(books.slice(0, 4))}
          </div>

          <button type="button" aria-label="ถัดไป" className="shrink-0 text-[#946D6D]">
            <svg className="size-6 -rotate-90"><use href="#i-chev" /></svg>
          </button>
        </section>

        {/* NEW ARRIVAL */}
        <h2 className="mt-8 mb-2 text-xl font-bold tracking-wide text-[#946D6D]">NEW ARRIVAL</h2>
        <section className="flex items-center gap-4 border-y border-[#c9a0dc] px-2 py-6">
          <div className="flex min-w-0 flex-1 justify-around gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {renderBooks(books.slice(-4))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-wrap items-start gap-16 bg-[#A9C9E3] px-10 py-8 text-sm text-[#3d3a4a]">
        <div className="space-y-2">
          <img src={logo} alt="Logo" className="h-12 w-12 shrink-0 object-contain"/>
          <p className="font-bold">ติดต่อเรา</p>
          <p>e-commerce@mashamud.com</p>
        </div>

        <div>
          <h3 className="mb-2 font-bold">หนังสือของเรา</h3>
          <ul className="space-y-1">
            <li>หนังสือทั่วไป</li>
            <li>นวนิยาย</li>
            <li>หนังสือการ์ตูน</li>
            <li>ตำราเรียน</li>
            <li>นิตยสาร</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-bold">ข้อมูล บมจ. มหาสมุด</h3>
          <ul className="space-y-1">
            <li>ทีมพัฒนา</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Home;