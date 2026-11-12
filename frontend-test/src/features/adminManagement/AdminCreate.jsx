import { Link, useNavigate } from "react-router-dom"
import { SideBar } from "../../shared/components/SideBar"
import { TopBar } from "../../shared/components/TopBar"
import { useState } from "react"
import { verifyPassword } from "../../shared/utils/verifyPassword";

function AdminCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [haveSameName, setHaveSameName] = useState(false) 
  


  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      const response = await fetch('http://localhost:3005/api/admins',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Username: name,
          Password: password
        })
      })
      navigate('/adminManagement')
      console.log('Created Admin: ',response)
    }catch(err){
      console.error('HTTP error! Status: ',err)
    }
  }

  const checkSameName = async (input)=>{
    try{
      // console.log(input)
      const res = await fetch('/api/admins')
      if (!res.ok) throw new Error(`Network error: ${res.status}`);
      const result = await res.json()
      // console.log(result)
      const sameName = result.filter((admin)=> admin.Username === input)
      // console.log(sameName)
      if(sameName.length === 0) {
        setHaveSameName(false)
        // console.log(haveSameName)
      }else{
        console.log('This name have been taken')
        setHaveSameName(true)
      }

    }catch(err){
      console.error(err)
    }
  }

  

  return (
    <>
      {/* Icon sprite */}
      <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <defs>
          <symbol id="i-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></symbol>
          <symbol id="i-grid" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></symbol>
          <symbol id="i-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><circle cx="17" cy="9" r="2.5" /><path d="M17 14c2.8 0 4.5 1.9 4.5 5" /></symbol>
          <symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4.5 6v5.5c0 4.5 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5 7.5-9.5V6z" /><path d="m9 12 2 2 4-4" /></symbol>
          <symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></symbol>
          <symbol id="i-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></symbol>
          <symbol id="i-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></symbol>
          <symbol id="i-edit" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" /><path d="M18.4 2.6a2 2 0 0 1 2.9 2.9L12 14.8 8 16l1.2-4z" /></symbol>
          <symbol id="i-trash" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></symbol>
          <symbol id="i-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></symbol>
          <symbol id="i-book" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 21V5" /></symbol>
        </defs>
      </svg>


      <TopBar />

      <div className="flex min-h-[calc(100vh-5rem)]">
        {/* SideBar */}
        <SideBar activePage="admin"/>

        {/* Main */}
        <main className="min-w-0 flex-1 space-y-5 p-6">

          {/* Page title */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-[#dcd2ee] bg-[#ece6f5] text-[#7a4f8f]">
                <svg className="size-6"><use href="#i-plus" /></svg>
              </span>
              <div>
                <h1 className="text-2xl font-bold text-[#684D4D]">สร้างบัญชีผู้ใช้งานผู้ดูแลระบบ</h1>
                <p className="mt-0.5 text-sm text-[#8a7a80]">ค้นหา อัปเดต และควบคุมสิทธิ์การเข้าใช้งานของทีมงานหลังบ้าน</p>
              </div>
            </div>
          </div>

          {/* Search + filter */}
          <div className="flex flex-wrap gap-5">
            <form action="POST" onSubmit={handleSubmit}>
              <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <div className="flex">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-[#e0e3e4] bg-[#e1f1f3] text-[#5d75f0]">
                    <svg className="size-6"><use href="#i-user" /></svg>
                  </span>
                  <div className="flex flex-col">
                    <p className="text-lg pl-5 h-min font-bold text-[#684D4D]">ข้อมูลบัญชีทั่วไป</p>
                    <p className="text-sm pl-5 h-min font-bold text-[#938686]">ระบุข้อมูลเบื้องต้นและความปลอดภัยสำหรับการเข้าสู่ระบบในครั้งแรก</p>
                  </div>
                </div>
                <hr className="mt-4 mb-4 border-gray-300 border " />
                <div className="flex flex-row">
                  <div className="flex grow flex-col mr-5">
                    <label htmlFor="Username" className="text-md h-min font-bold text-[#684D4D]">ชื่อผู้ใช้งาน (Username)</label>
                    <input onChange={(e)=> {
                      if(e.target.value.length >= 6) checkSameName(e.target.value);
                      setName(e.target.value)
                      }} id="Username" name="Username" type="text" placeholder="somsakAdmin" className="p-2 mt-1 border border-gray-300 rounded-lg " pattern="[A-Za-z0-9]{6,}" required/>
                    {haveSameName && 
                      <p className="ml-2 text-red-500 text-md">
                        This name already taken.
                      </p>
                    }
                    <p className="text-sm pl-2 h-min font-bold text-[#938686]">ความยาวอย่างน้อย 6 ตัวอักษร เฉพาะภาษาอังกฤษและตัวเลข</p>
                  </div>
                  <div className="flex grow flex-col">
                    <label htmlFor="adminPassword" className="text-md h-min font-bold text-[#684D4D]">รหัสผ่าน (Password)</label>
                    <input onChange={(e)=> setPassword(e.target.value)} id="Password" name="Password" type="password" placeholder="Admin@2024Secure!" className="p-2 mt-1 border border-gray-300 rounded-lg " required/>
                    <p className="text-sm pl-2 h-min font-bold text-[#938686]">รหัสผ่านต้องมีตัวพิมพ์ใหญ่ พิมพ์เล็ก ตัวเลขและ สัญลักษณ์ เช่น @, #, %</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  {!haveSameName && <button type="submit" className="bg-[#9A6EA5] p-2 rounded-xl text-white">
                    บันทึกบัญชีผู้ใช้
                  </button>}
                  <Link to="/adminManagement" className="bg-white shadow-2xs border-2 border-gray-200 p-2 rounded-xl text-[#684D4D]">
                    ยกเลิกขั้นตอน
                  </Link>
                </div>
              </section>
            </form>

            <div className="flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <p className="text-md h-min font-bold text-[#684D4D]">การตรวจสสอบความครบถ้วน</p>
              <p className="text-xs h-min font-bold text-[#938686]">ระบุข้อมูลเบื้องต้นและความปลอดภัยสำหรับการเข้าสู่ระบบในครั้งแรก</p>
              <hr className="mt-4 mb-4 border-gray-200 border " />
              <div className="flex items-center">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl border border-[#dcd2ee] bg-[#e2f5cf] text-[#16ba21]">
                  <svg className="size-5"><use href="#i-shield" /></svg>
                </span>
                <p className="text-xs h-min ml-2 font-bold text-[#938686]">ระบุข้อมูลเบื้องต้นและความปลอดภัยสำหรับการเข้าสู่ระบบในครั้งแรก</p>
              </div>
              <div className="flex items-center">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl border border-[#dcd2ee] bg-[#e2f5cf] text-[#16ba21]">
                  <svg className="size-5"><use href="#i-shield" /></svg>
                </span>
                <p className="text-xs h-min ml-2 font-bold text-[#938686]">ตรวจสอบชื่อผู้ใช้งานว่างพร้อมใช้งาน</p>
              </div>

              <div className="grid grid-cols-2">
                
                <div className="col-span-2 mt-2">
                  <div className={`${verifyPassword(password) ? "text-[#10B981]" : "text-[#b91026]"} mb-1 text-sm font-medium text-fg-success`}>{verifyPassword(password) ? 'Strong' : 'Weak'}</div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div className={`${verifyPassword(password) ? 'bg-[#10B981] w-full' :'bg-[#b91026] w-[10%]'} h-2 rounded-full transition`}></div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </main>
      </div>

    </>
  )
}

export default AdminCreate