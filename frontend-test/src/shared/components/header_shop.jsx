import logo from "../../assets/logo.png";

function Header() {
return (
<header className="w-full bg-[#946D6D]">
  <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-5">
    <img src={logo} alt="Logo" className="h-12 w-12 shrink-0 object-contain"/>
    <div className="flex h-9 min-w-0 flex-1 items-center rounded-full bg-[#E8E8E8] px-4 text-sm text-stone-400">
      ⌕　ค้นหาจาก ชื่อหนังสือ, ผู้แต่ง, สำนักพิมพ์</div>
    <div className="flex shrink-0 items-center gap-3">
      <span className="text-sm text-white">🇹🇭</span>
      <a href="#" className="rounded-full bg-[#E8DDF5] px-5 py-2 text-sm text-[#51445B]">เข้าสู่ระบบ</a>
    </div>
  </div>
</header>
);
}
export default Header;