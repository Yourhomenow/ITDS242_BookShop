export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 bg-linear-to-b from-[#9cc8e8] via-[#dcd3f7] to-[#fdf3c8] p-3 md:block">
      <nav className="space-y-1 pt-3 text-sm font-medium text-[#4b4660]">
        <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-2.5 hover:bg-white/40 focus-visible:outline-2 focus-visible:outline-plum">
          <svg className="size-4"><use href="#i-home"/></svg>หน้าหลัก
        </a>
        <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-2.5 hover:bg-white/40 focus-visible:outline-2 focus-visible:outline-plum">
          <svg className="size-4"><use href="#i-grid"/></svg>จัดการสินค้า/บริการ
        </a>
        <a href="#" aria-current="page" className="flex items-center gap-3 rounded-xl bg-white/80 px-4 py-2.5 font-semibold text-[#3d3550] shadow-sm focus-visible:outline-2 focus-visible:outline-plum">
          <svg className="size-4"><use href="#i-users"/></svg>จัดการบัญชีผู้ใช้
        </a>
      </nav>
    </aside>
  );
}