import { Link } from "react-router-dom";
export default function Navbar() {
  return <nav className="flex h-11 w-full items-center justify-center gap-10 bg-[#FCF3D2] text-sm font-semibold text-[#946D6D]">
    <Link to="/home">⌂</Link><a href="/#books">หนังสือทั่วไป</a><a href="/#books">นวนิยาย</a><a href="/#books">หนังสือการ์ตูน</a><a href="/#books">ตำราเรียน</a><a href="/#books">นิตยสาร</a>
  </nav>;
}