import { useNavigate } from "react-router-dom";

import { TopBar } from "../../shared/components/TopBar"
import { SideBar } from "../../shared/components/SideBar"
import { SquareButton } from "../../shared/components/SquareButton"

function BookManangement(){
    const navigate = useNavigate();

    return (
        <>
            <TopBar/>
            <div className="flex min-h-[calc(100vh-5rem)] bg-[#F8FAFC]">
                <SideBar activePage="book"/>
                <main className="min-w-0 flex-1 space-y-5 p-6">
                    <div className="flex items-start gap-4">
                        <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-[#dcd2ee] bg-[#ece6f5] text-[#7a4f8f]">
                            <svg className="size-6"><use href="#i-box"/></svg>
                        </span>
                        <div>
                            <h1 className="text-2xl font-bold text-ink text-[#684D4D]">จัดการหนังสือ</h1>
                            <p className="mt-0.5 text-sm text-[#9A6EA5]">เพิ่ม แก้ไช และลบข้อมูลรายการหนังสือ</p>
                        </div>
                        <div className="flex items-end gap-4 self-center ml-auto">
                            <SquareButton text="เพิ่มหนังสือใหม่" icon="i-plus" bg_colour="9A6EA5" onClick={() => navigate("/admin-management")}/>
                            <SquareButton text="ลบสินค้า" icon="i-trash" onClick={() => navigate("/admin-management")}/>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default BookManangement