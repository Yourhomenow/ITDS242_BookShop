import logo from "../../assets/logo.png";

export function TopBar() {
  return (
    <header className="flex h-20 items-center justify-between bg-[#8a5f66] px-6">
      <img src={logo} alt="มหาสมุด" className="h-18 object-contain" />
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-[#EBE9F5] text-[#7E6FB8]">
          <svg className="size-6"><use href="#i-user" /></svg>
        </span>
        <div className="text-right leading-tight text-white">
          <p className="text-sm font-semibold">ชื่อบัญชีผู้ดูแลระบบ</p>
          <p className="text-[11px] font-medium tracking-wide text-[#fde9a8]">ADMINISTRATOR</p>
        </div>
      </div>
    </header>
  );
}