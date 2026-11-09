import { Link } from "react-router-dom";
export default function Navbar() {
  return <nav className="flex h-11 w-full items-center justify-center gap-10 bg-[#FCF3D2] text-sm font-semibold text-[#946D6D]">
    <Link to="/home"><svg className="size-4"><use href="#i-home"/></svg></Link>
    <a href="/search?category=General">หนังสือทั่วไป</a>
    <a href="/search?category=Novel">นวนิยาย</a>
    <a href="/search?category=Comic%26Manga">หนังสือการ์ตูน</a>
    <a href="/search?category=Study">ตำราเรียน</a>
    <a href="/search?category=Magazine">นิตยสาร</a>
  </nav>;
}