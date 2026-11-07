
export function TopBar() {
  return (
    <header className="flex h-20 items-center justify-between bg-[#8a5f66] bg-[repeating-linear-gradient(45deg,rgba(255,255,255,.05)_0_2px,transparent_2px_4px)] px-6">
      {/* Replace this placeholder with: <img src="/logo.png" alt="มหาสมุด" className="h-14" /> */}
      <a href="#" className="flex items-center gap-3 text-white">
        <span className="grid size-14 place-items-center rounded-full bg-[#f6e7c1] text-[#8a5f66] ring-2 ring-[#d9b66a]">
          {/* <Icon name="book" className="size-7" /> */}
        </span>
        <span className="hidden text-lg font-bold sm:block">มหาสมุด</span>
      </a>
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-[#e6dcf5] text-[#9a5fa8]">
          {/* <Icon name="user" className="size-5" /> */}
        </span>
        <div className="text-right leading-tight text-white">
          <p className="text-sm font-semibold">ชื่อบัญชีผู้ดูแลระบบ</p>
          <p className="text-[11px] font-medium tracking-wide text-[#fde9a8]">ADMINISTRATOR</p>
        </div>
      </div>
    </header>
  );
}