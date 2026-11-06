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
                    {/* Title */}
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

                    {/* Search + Filter */}
                    <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                        <div className="mt-1 flex flex-wrap items-center gap-4">
                            <div className="flex flex-col flex-8">
                                <label htmlFor="q" className="text-[11px] font-medium text-[#737185] pb-1">คำค้นหา</label>
                                <div className="relative min-w-55 flex-1 sm:max-w-3xl">
                                    <svg className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"><use href="#i-search"/></svg>
                                    <input id="q" type="search" placeholder="ค้นหาผู้ใช้งาน..." className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-plum focus:ring-2 focus:ring-plum/20" />
                                </div>
                            </div>

                            <div className="flex flex-col flex-3">
                                <label htmlFor="category" className="text-[11px] font-medium text-[#737185] pb-1">หมวดหมู่</label>
                                <div className="relative">
                                    <select id="category" className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold text-[#3d3a4a] outline-none focus:border-plum focus:ring-2 focus:ring-plum/20">
                                        <option value="all">ทั้งหมด</option>
                                        <option value="general">หนังสือทั่วไป</option>
                                        <option value="novel">นวนิยาย</option>
                                        <option value="comic&manga">หนังสือการ์ตูน</option>
                                        <option value="study">ตำราเรียน</option>
                                        <option value="magazine">นิตยสาร</option>
                                    </select>
                                    <svg className="pointer-events-none absolute right-3 size-3.5 top-1/2 -translate-y-1/2"><use href="#i-chev"/></svg>
                                </div>
                            </div>

                            <div className="flex flex-col flex-3 relative">
                                <label htmlFor="status" className="text-[11px] font-medium text-[#737185] pb-1">สถานะ</label>
                                <select id="status" className="flex h-11 items-center gap-1.5 rounded-xl border border-slate-200 px-4 text-sm focus-within:border-plum focus-within:ring-2 focus-within:ring-plum/20 appearance-none bg-transparent pr-5 font-semibold text-[#3d3a4a] outline-none">
                                    <option value="all">ทั้งหมด</option>
                                    <option value="avalible">พร้อมจำหน่าย</option>
                                    <option value="outOfStock">หมดสต็อก</option>
                                </select>
                                <svg className="pointer-events-none absolute right-3 size-3.5 top-1/2 translate-y-1/4"><use href="#i-chev"/></svg>
                            </div>
                        </div>
                    </section>

                    {/* Table */}
                    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                        hello
                    </section>
                </main>
            </div>
        </>
    )
}

export default BookManangement