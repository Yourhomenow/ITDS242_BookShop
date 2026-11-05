import { TopBar } from "../../shared/components/TopBar"
import { SideBar } from "../../shared/components/SideBar"

function BookManangement(){
    return (
        <>
        <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
            <defs>
                <symbol id="i-box" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></symbol>
                <symbol id="i-book" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/></symbol>
            </defs>
        </svg>

            <TopBar/>
            <div className="flex min-h-[calc(100vh-5rem)] bg-[#F8FAFC]">
                <SideBar activePage={"book"}/>
                <main className="min-w-0 flex-1 space-y-5 p-6">
                    <div className="flex items-start gap-4">
                        <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-[#dcd2ee] bg-[#ece6f5] text-[#7a4f8f]">
                            <svg className="size-6"><use href="#i-box"/></svg>
                        </span>
                        <div>
                            <h1 className="text-2xl font-bold text-ink text-[#684D4D]">จัดการหนังสือ</h1>
                            <p className="mt-0.5 text-sm text-[#9A6EA5]">เพิ่ม แก้ไช และลบข้อมูลรายการหนังสือ</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default BookManangement