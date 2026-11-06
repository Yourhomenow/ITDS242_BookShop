import { useNavigate } from "react-router-dom";

import { TopBar } from "../../shared/components/TopBar"
import { SideBar } from "../../shared/components/SideBar"
import { SquareButton } from "../../shared/components/SquareButton"
import { BookRow } from "./table component/bookRow";

const th_className = "font-medium px-6 py-3 text-center"

function BookManangement(){
    const navigate = useNavigate();
    const books = [
    {
      id: 1,
      name: 'หนังสือ1',
      quantity: 0,
      isbnCode: null,
      price: 50,
      description: 'คำอธิบาย1',
      publishDate: '2026-09-30',
      size: '99x99',
      publisherID: 1
    },
    {
      id: 2,
      name: 'หนังสือ2',
      quantity: 9999,
      isbnCode: null,
      price: 555550,
      description: 'คำอธิบาย1',
      publishDate: '2026-09-30',
      size: '99x99',
      publisherID: 1
    }
  ]
    return (
        <>
            <TopBar/>
            <div className="flex min-h-[calc(100vh-5rem)] bg-[#F8FAFC]">
                <SideBar activePage="book"/>
                <main className="min-w-0 flex-1 space-y-5 p-6">
                    {/* Title */}
                    <div className="flex flex-wrap items-start gap-4">
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
                                <div className="relative min-w-55 flex-1">
                                    <svg className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"><use href="#i-search"/></svg>
                                    <input id="q" type="search" placeholder="ค้นหาผู้ใช้งาน..." className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-plum focus:ring-2 focus:ring-plum/20" />
                                </div>
                            </div>

                            <div className="flex flex-col flex-3">
                                <label htmlFor="category" className="text-[11px] font-medium text-[#737185] pb-1">หมวดหมู่</label>
                                <div className="relative">
                                    <select id="category" className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold text-[#684D4D] outline-none focus:border-plum focus:ring-2 focus:ring-plum/20">
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

                            <div className="flex flex-col flex-3">
                                <label htmlFor="status" className="text-[11px] font-medium text-[#737185] pb-1">สถานะ</label>
                                <div className="relative">
                                    <select id="status" className="h-11 w-full flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 text-sm focus-within:border-plum focus-within:ring-2 focus-within:ring-plum/20 appearance-none bg-transparent pr-5 font-semibold text-[#684D4D] outline-none">
                                        <option value="all">ทั้งหมด</option>
                                        <option value="avalible">พร้อมจำหน่าย</option>
                                        <option value="outOfStock">หมดสต็อก</option>
                                    </select>
                                <svg className="pointer-events-none absolute right-3 size-3.5 top-1/2 -translate-y-1/2"><use href="#i-chev"/></svg>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Table */}
                    <section className="overflow-hidden rounded-2xl border bg-white shadow-sm border-b-2 border-[#7E6666]">
                     <div className="overflow-x-auto">
                        <table className="w-full min-w-160 text-sm  table-fixed">
                            <colgroup>
                                <col className="w-[4%] min-w-[48px]:" />   {/* Checkbox */}
                                <col className="w-[9%] min-w-[130px]" />   {/* Book ID */}
                                <col className="w-[8%] min-w-[96px]" />   {/* Image */}
                                <col className="w-[22%] min-w-[262px]" />  {/* Book name */}
                                <col className="w-[14%] min-w-[175px]" />  {/* Category */}
                                <col className="w-[11%] min-w-[131px]" />  {/* Price */}
                                <col className="w-[12%] min-w-[143px]" />  {/* Stock */}
                                <col className="w-[12%] min-w-[160px]" />  {/* Status */}
                                <col className="w-[8%] min-w-[130px]" />   {/* Actions */}
                            </colgroup>
                            <thead>
                                <tr className="h-[41px] border-b-2 border-[#7E6666] bg-cream text-left text-xs bg-linear-to-b from-[#FFFAE9] from-50% to-[#ece3c3] to-100% text-[#737185]">
                                    <th scope="col"></th>
                                    <th scope="col" className="font-medium px-6 py-3 text-left">รหัสหนังสือ</th>
                                    <th scope="col" className={th_className}>รูปภาพ</th>
                                    <th scope="col" className="font-medium px-6 py-3 text-left">ชื่อหนังสือ</th>
                                    <th scope="col" className={th_className}>หมวดหมู่</th>
                                    <th scope="col" className={th_className}>ราคา (บาท)</th>
                                    <th scope="col" className={th_className}>จำนวนคงเหลือ</th>
                                    <th scope="col" className={th_className}>สถานะ</th>
                                    <th scope="col" className={th_className}>จัดการ</th>
                                </tr>
                            </thead>
                            <tbody id="rows">
                                <BookRow book={books[0]} pic={{name: "cover.png", url:"https://picsum.photos/200"}} category={"Comic&Manga"} author={"superCoolPenName"}/>
                                <BookRow book={books[1]} pic={{name: "cover.png", url:"https://picsum.photos/500"}} category={"Magazine"} author={"superCoolPenName"}/>
                                <tr className="h-[70px] border-b border-slate-100"></tr>
                                <tr className="h-[70px] border-b border-slate-100"></tr>
                                <tr className="h-[70px] border-b border-slate-100"></tr>
                                <tr className="h-[70px] border-b border-slate-100"></tr>
                                {/* {books.map((book, index) => {

                                })} */}
                            </tbody>
                            <tfoot>
                                <tr className="h-[41px] text-xs text-[#737185]">
                                    <th scope="col" colSpan="7" className="font-light px-6 py-3 text-left">แสดง 1-6 จากทั้งหมด {books.length} รายการหนังสือ</th>
                                    <th scope="col" colSpan="2" className="font-light px-6 py-3 text-right">placeholder button</th>
                                </tr>
                            </tfoot>
                        </table>
                     </div>
                    </section>
                </main>
            </div>
        </>
    )
}

export default BookManangement