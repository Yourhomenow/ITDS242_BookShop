// const ICONS = {
//   home: <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
//   grid: (
//     <>
//       <rect x="3" y="3" width="18" height="18" rx="2" />
//       <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
//     </>
//   ),
//   users: (
//     <>
//       <circle cx="9" cy="8" r="3.5" />
//       <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
//       <circle cx="17" cy="9" r="2.5" />
//       <path d="M17 14c2.8 0 4.5 1.9 4.5 5" />
//     </>
//   ),
//   shield: (
//     <>
//       <path d="M12 3 4.5 6v5.5c0 4.5 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5 7.5-9.5V6z" />
//       <path d="m9 12 2 2 4-4" />
//     </>
//   ),
//   search: (
//     <>
//       <circle cx="11" cy="11" r="7" />
//       <path d="m20 20-3.5-3.5" />
//     </>
//   ),
//   chevron: <path d="m6 9 6 6 6-6" />,
//   plus: <path d="M12 5v14M5 12h14" />,
//   edit: (
//     <>
//       <path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
//       <path d="M18.4 2.6a2 2 0 0 1 2.9 2.9L12 14.8 8 16l1.2-4z" />
//     </>
//   ),
//   trash: <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />,
//   user: (
//     <>
//       <circle cx="12" cy="8" r="4" />
//       <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
//     </>
//   ),
//   book: (
//     <>
//       <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
//       <path d="M4 21V5" />
//     </>
//   ),
// };

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