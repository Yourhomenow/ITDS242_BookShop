import { useState } from "react";
import { Sidebar } from "../../shared/components/Sidebar"
import { TopBar } from "../../shared/components/TopBar"
import AdminDeleteModel from "./AdminDeleteModel";

function AdminManagement() {
  // Static dataset for admin accounts
  const [openDeleteModel,setOpenDeleteModel] = useState(false);
  const adminUsers = [
    {
      id: '0001',
      name: 'ชื่อบัญชีผู้ดูแลระบบ1',
      status: 'active',
      statusText: 'ใช้งานอยู่',
    },
    {
      id: '0002',
      name: 'ชื่อบัญชีผู้ดูแลระบบ2',
      status: 'active',
      statusText: 'ใช้งานอยู่',
    },
    {
      id: '0003',
      name: 'ชื่อบัญชีผู้ดูแลระบบ3',
      status: 'active',
      statusText: 'ใช้งานอยู่',
    },
    {
      id: '0004',
      name: 'ชื่อบัญชีผู้ดูแลระบบ4',
      status: 'suspended',
      statusText: 'ระงับการใช้งาน',
    },
  ]

  return (
    <>
      {/* Icon sprite */}
      <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <defs>
          <symbol id="i-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></symbol>
          <symbol id="i-grid" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></symbol>
          <symbol id="i-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.8 0 4.5 1.9 4.5 5"/></symbol>
          <symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4.5 6v5.5c0 4.5 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/></symbol>
          <symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></symbol>
          <symbol id="i-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></symbol>
          <symbol id="i-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></symbol>
          <symbol id="i-edit" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M18.4 2.6a2 2 0 0 1 2.9 2.9L12 14.8 8 16l1.2-4z"/></symbol>
          <symbol id="i-trash" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></symbol>
          <symbol id="i-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></symbol>
          <symbol id="i-book" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/></symbol>
        </defs>
      </svg>


      <TopBar/>
      
      <div className="flex min-h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <Sidebar/>

        {/* Main */}
        <main className="min-w-0 flex-1 space-y-5 p-6">

          {/* Page title */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-[#dcd2ee] bg-[#ece6f5] text-[#7a4f8f]">
                <svg className="size-6"><use href="#i-shield"/></svg>
              </span>
              <div>
                <h1 className="text-2xl font-bold text-[#684D4D]">จัดการบัญชีผู้ดูแลระบบ</h1>
                <p className="mt-0.5 text-sm text-[#8a7a80]">ค้นหา อัปเดต และควบคุมสิทธิ์การเข้าใช้งานของทีมงานหลังบ้าน</p>
              </div>
            </div>
            <button type="button" className="flex items-center gap-2 rounded-xl bg-plum px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-plum/30 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum">
              <svg className="size-4"><use href="#i-plus"/></svg>เพิ่มบัญชีใหม่
            </button>
          </div>

          {/* Search + filter */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <label htmlFor="q" className="text-[11px] font-medium text-[#7a6a70]">คำค้นหา</label>
            <div className="mt-1 flex flex-wrap items-center gap-4">
              <div className="relative min-w-55 flex-1 sm:max-w-3xl">
                <svg className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"><use href="#i-search"/></svg>
                <input id="q" type="search" placeholder="ค้นหาผู้ใช้งาน..." className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-plum focus:ring-2 focus:ring-plum/20" />
              </div>
              <label className="relative flex h-11 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-500 focus-within:border-plum focus-within:ring-2 focus-within:ring-plum/20">
                สถานะ:
                <select id="status" className="appearance-none bg-transparent pr-5 font-semibold text-[#3d3a4a] outline-none">
                  <option value="all">ทั้งหมด</option>
                  <option value="active">ใช้งานอยู่</option>
                  <option value="suspended">ระงับการใช้งาน</option>
                </select>
                <svg className="pointer-events-none absolute right-3 size-3.5"><use href="#i-chev"/></svg>
              </label>
            </div>
          </section>

          {/* Table */}
          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-160 text-sm">
                <thead>
                  <tr className="border-b-2 border-[#8b5a62] bg-cream text-left text-xs font-semibold text-ink">
                    <th scope="col" className="px-6 py-3">รหัสผู้ดูแลระบบ</th>
                    <th scope="col" className="px-6 py-3">ชื่อผู้ใช้งาน</th>
                    <th scope="col" className="px-6 py-3">สถานะ</th>
                    <th scope="col" className="px-6 py-3 text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody id="rows">
                  {adminUsers.map((user, index) => {
                    const isActive = user.status === 'active'
                    return (
                      <tr 
                        key={user.id} 
                        className={`hover:bg-slate-50/70 ${index !== adminUsers.length - 1 ? 'border-b border-slate-100' : ''}`} 
                        data-status={user.status} 
                        data-search={`${user.id} ${user.name}`}
                      >
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-2.5 font-semibold text-[#5b4650]">
                            <span className="size-2 rounded-full bg-plum"></span>{user.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold">{user.name}</td>
                        <td className="px-6 py-4">
                          <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                            isActive ? 'bg-[#c8f1d8] text-[#1c7a4b]' : 'bg-[#ffe98a] text-[#8a5b00]'
                          }`}>
                            {user.statusText}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button type="button" aria-label="แก้ไข" className="grid size-8 place-items-center rounded-lg bg-[#e3effd] text-[#3b82c4] hover:bg-[#cfe3fa]">
                              <svg className="size-4"><use href="#i-edit"/></svg>
                            </button>
                            <button onClick={()=>setOpenDeleteModel(!openDeleteModel)} type="button" aria-label="ลบ" className="grid size-8 place-items-center rounded-lg bg-[#fde4e4] text-[#d24a4a] hover:bg-[#fbcfcf]">
                              <svg className="size-4"><use href="#i-trash"/></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p id="empty" hidden className="px-6 py-8 text-center text-sm text-[#8a7a80]">ไม่พบผู้ใช้งานที่ตรงกับการค้นหา ลองเปลี่ยนคำค้นหาหรือตัวกรองสถานะ</p>
          </section>

        </main>
      </div>

      <AdminDeleteModel
        isOpen={openDeleteModel}
        onClose={()=> setOpenDeleteModel(false)}
      />
      
    </>
  )
}

export default AdminManagement