import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-start gap-16 bg-[#A9C9E3] px-10 py-8 text-sm text-[#3d3a4a]">
        <div className="space-y-2">
          <img src={logo} alt="Logo" className="h-12 w-12 shrink-0 object-contain"/>
          <p className="font-bold">ติดต่อเรา</p>
          <p>e-commerce@mashamud.com</p>
        </div>

        <div>
          <h3 className="mb-2 font-bold">หนังสือของเรา</h3>
          <ul className="space-y-1">
            <div className="flex flex-col gap-0.5">
              <Link to="/search?category=General">หนังสือทั่วไป</Link>
              <Link to="/search?category=Novel">นวนิยาย</Link>
              <Link to="/search?category=Comic%26Manga">หนังสือการ์ตูน</Link>
              <Link to="/search?category=Study">ตำราเรียน</Link>
              <Link to="/search?category=Magazine">นิตยสาร</Link>
            </div>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-bold">ข้อมูล บมจ. มหาสมุด</h3>
          <ul className="space-y-1">
            <Link to="/team">ทีมพัฒนา</Link>
          </ul>
        </div>
      </footer>
  );
}