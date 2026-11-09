import { useState } from "react";
import { Link } from "react-router-dom";
import { SideBar } from "../../shared/components/SideBar"

function Home() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF6EC]">
      {/* Header */}
      <header className="flex h-20 items-center gap-6 bg-[#8a5f66] bg-[repeating-linear-gradient(45deg,rgba(255,255,255,.05)_0_2px,transparent_2px_4px)] px-6">
        <Link to="/home" className="flex items-center gap-3 text-white">
          <span className="grid size-14 place-items-center rounded-full bg-[#f6e7c1] ring-2 ring-[#d9b66a]"></span>
          <span className="hidden whitespace-nowrap text-lg font-bold sm:block">มหาสมุด</span>
        </Link>

        <div className="mx-auto flex h-10 w-full max-w-2xl items-center gap-2 rounded-full bg-white px-4">
          <svg className="size-5 text-slate-500"><use href="#i-search" /></svg>
          <input
            type="text"
            placeholder="ค้นหาจาก ชื่อสินค้า, ผู้แต่ง, สำนักพิมพ์"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <Link
          to="/login"
          className="shrink-0 rounded-full px-5 py-2 
          text-sm hover:bg-white/20 bg-[#c9a0dc]"
        > เข้าสู่ระบบ</Link>
      </header>

      {/* Category nav */}
      <div className="relative flex flex-1 flex-col">

      {showSidebar && (
        <div className="absolute left-0 top-0 z-50 h-full bg-[#fdf3c8] shadow-xl">
          <SideBar activePage="home" />
        </div>
      )}

      {/* Category nav */}
      <nav className="flex items-center justify-evenly bg-[#F9F3DC] px-6 py-2 text-sm font-semibold">
      <button type="button" aria-label="เปิดเมนู" onClick={() => setShowSidebar(!showSidebar)} className="cursor-pointer">
        <svg className="size-6"><use href="#i-home" /></svg>
      </button>
        <span className="hover:underline">หนังสือทั่วไป</span>
        <span className="hover:underline" >นวนิยาย</span>
        <span className="hover:underline" >หนังสือการ์ตูน</span>
        <span className="hover:underline" >ตำราเรียน</span>
        <span className="hover:underline" >นิตยสาร</span>
      </nav>
   
  <div className="min-w-0 flex-1">
    {/* ว่าง*/}
    <section className="mx-6 mt-4 h-56 rounded-2xl bg-[#F3EBD3]"></section>

    {/* BOOK */}
    <h2 className="mx-6 mt-8 mb-2 text-xl font-bold tracking-wide text-[#8a5f66]">BOOK</h2>
    <section className="flex items-center gap-4 border-y border-[#c9a0dc] px-6 py-6">
      <button type="button" aria-label="ก่อนหน้า" className="shrink-0 text-[#8a5f66]">
        <svg className="size-6 rotate-90"><use href="#i-chev" /></svg>
      </button>

      <div className="flex min-w-0 flex-1 justify-around gap-4 overflow-x-auto">
        <div className="flex h-56 w-44 shrink-0 flex-col justify-end rounded-2xl bg-linear-to-b from-[#FBEFC4] to-[#D9D3F2] p-3 shadow-md">
          <p className="text-sm font-bold text-[#684D4D]">ชื่อหนังสือ</p>
          <p className="text-xs text-[#8a7a80]">ผู้แต่ง</p>
          <p className="mt-2 text-xs font-bold text-[#8a5f66]">00.0 ฿</p>
        </div>

        <div className="flex h-56 w-44 shrink-0 flex-col justify-end rounded-2xl bg-linear-to-b from-[#FBEFC4] to-[#D9D3F2] p-3 shadow-md">
          <p className="text-sm font-bold text-[#684D4D]">ชื่อหนังสือ</p>
          <p className="text-xs text-[#8a7a80]">ผู้แต่ง</p>
          <p className="mt-2 text-xs font-bold text-[#8a5f66]">00.0 ฿</p>
        </div>

        <div className="flex h-56 w-44 shrink-0 flex-col justify-end rounded-2xl bg-linear-to-b from-[#FBEFC4] to-[#D9D3F2] p-3 shadow-md">
          <p className="text-sm font-bold text-[#684D4D]">ชื่อหนังสือ</p>
          <p className="text-xs text-[#8a7a80]">ผู้แต่ง</p>
          <p className="mt-2 text-xs font-bold text-[#8a5f66]">00.0 ฿</p>
        </div>

        <div className="flex h-56 w-44 shrink-0 flex-col justify-end rounded-2xl bg-linear-to-b from-[#FBEFC4] to-[#D9D3F2] p-3 shadow-md">
          <p className="text-sm font-bold text-[#684D4D]">ชื่อหนังสือ</p>
          <p className="text-xs text-[#8a7a80]">ผู้แต่ง</p>
          <p className="mt-2 text-xs font-bold text-[#8a5f66]">00.0 ฿</p>
        </div>
      </div>

      <button type="button" aria-label="ถัดไป" className="shrink-0 text-[#8a5f66]">
        <svg className="size-6 -rotate-90"><use href="#i-chev" /></svg>
      </button>
    </section>

    {/* NEW ARRIVAL */}
    <h2 className="mx-6 mt-8 mb-2 text-xl font-bold tracking-wide text-[#8a5f66]">NEW ARRIVAL</h2>
  </div>
</div>

      {/* Footer */}
      <footer className=" flex flex-wrap items-start gap-16 bg-[#A9C9E3] px-10 py-8 text-sm text-[#3d3a4a]">
        <div className="space-y-2">
          <span className="grid size-14 place-items-center rounded-full bg-[#f6e7c1] ring-2 ring-[#d9b66a]"></span>
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