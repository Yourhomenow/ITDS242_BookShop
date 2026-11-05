const based_className = "flex items-center gap-3 rounded-xl px-4 py-2.5 hover:bg-white/40 focus-visible:outline-2 focus-visible:outline-plum";
const select_className = "flex items-center gap-3 rounded-xl bg-white/80 px-4 py-2.5 font-semibold text-[#3d3550] shadow-sm focus-visible:outline-2 focus-visible:outline-plum";

export function SideBar ({ activePage }){
    let admin_className = based_className;
    let book_className = based_className ;
    
    if (activePage == "admin"){
        admin_className = select_className
    }else if (activePage == "book"){
        book_className = select_className
    }
    return (
        <>
            <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
                <defs>
                    <symbol id="i-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></symbol>
                    <symbol id="i-grid" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></symbol>
                    <symbol id="i-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.8 0 4.5 1.9 4.5 5"/></symbol>
                </defs>
            </svg>
            <aside className="hidden w-60 shrink-0 bg-linear-to-b from-[#9cc8e8] via-[#dcd3f7] to-[#fdf3c8] p-3 md:block">
                <nav className="space-y-1 pt-3 text-sm font-medium text-[#4b4660]">
                    <a href="#" className={based_className}>
                    <svg className="size-4"><use href="#i-home"/></svg>หน้าหลัก
                    </a>
                    <a href="#" className={book_className}>
                    <svg className="size-4"><use href="#i-grid"/></svg>จัดการสินค้า/บริการ
                    </a>
                    <a href="#" className={admin_className}>
                    <svg className="size-4"><use href="#i-users"/></svg>จัดการบัญชีผู้ใช้
                    </a>
                </nav>
            </aside>
        </>
    )
}