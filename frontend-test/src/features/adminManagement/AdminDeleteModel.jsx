import { redirect } from "react-router-dom";


function AdminDeleteModel({isOpen, onClose, adminData,nav}) {
  if (!isOpen || !adminData) return null
  const handleDelete = async (admin)=>{
    try{
      const res = await fetch(`/api/admins/${admin.AdminID}`,{
        method: "DELETE",
      })
      if (!res.ok) throw new Error(`Network error: ${res.status}`);
      const result = await res.json()
      console.log(result)
      nav('/adminManagement')
      onClose()
      window.location.reload()
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div className="fixed inset-0 z-50 items-center flex bg-[#ac94949d] backdrop-blur-sm">
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
          <symbol id="i-minususer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0a3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21C8.043 21 5.862 20.355 4 19.234Z"/></symbol>
          
        </defs>
      </svg>

      <dialog className="flex justify-self-center rounded-2xl" open={isOpen} >
          <div className="flex-row p-10 rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="flex w-full gap-6 p-2">
                <span className="grid size-15 shrink-0 place-items-center rounded-full bg-[#FEE2E2] text-[#EF4444]">
                    <svg className="size-8"><use href="#i-minususer"/></svg>
                </span>
                <div className="flex flex-col self-center">
                    <span className="text-[#0F172A] font-bold text-2xl">
                        ยืนยันการลบข้อมูลถาวร?
                    </span>
                    <span className="text-[#64748B] font-light">
                        การดำเนินการนี้ไม่สามารถย้อนกลับได้
                    </span>
                </div>
            </div>
            <div className="flex mt-5 p-4 pl-9 items-center w-full min-h-[80px] max-h-[120px] gap-6 bg-[#F8FAFC] text-[#0F172A] rounded-xl font-light overflow-auto">
              <h4 className="text-xl font-bold">{String(adminData.AdminID).padStart(4, "0")}</h4>
              <br className="border-0 px-3"/>
              <h4 className="text-xl font-bold">{adminData.Username}</h4>
            </div>
            <div className="flex w-full gap-6 p-2 text-[#EF4444] rounded-xl font-light">
              <span>
                  * ข้อมูลการเข้าสู่ระบบ ล็อกและประวัติกิจกรรมทั้งหมดของบัญชีนี้จะถูกทำลายถาวรจากฐานข้อมูล
              </span>
            </div>
            <div className="mt-5 flex justify-end gap-4 min-h-[45px]">
              <button onClick={onClose} className="rounded-xl bg-[#E2E8F0] px-5 py-2 text-black cursor-pointer hover:bg-[#C3CBD7] active:scale-90 transition">
                ยกเลิก
              </button>
              <button onClick={()=>handleDelete(adminData)} className="rounded-xl bg-[#EF4444] px-5 py-2 text-white cursor-pointer hover:bg-[#E03B3B] active:scale-90 transition">
                ยืนยันลบถาวร
              </button>
            </div>
          </div>
      </dialog>
    </div>
  )
}

export default AdminDeleteModel