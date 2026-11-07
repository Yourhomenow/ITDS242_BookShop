import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { TopBar } from "../../shared/components/TopBar"
import { SideBar } from "../../shared/components/SideBar"
import { SquareButton } from "../../shared/components/SquareButton"
import { BookRow } from "./table component/bookRow";
import { DeletePopUp } from "./DeletePopUp";

const th_className = "font-medium px-6 py-3 text-center"

function filterBooks(booksEntry, search, categoryFilter, statusFilter) {
    return booksEntry.filter((entry) => {
    const book = entry.book;

    const matchesSearch =
        `${book.id} ${book.name}`
            .toLowerCase()
            .includes(search.toLowerCase().trim());

    const matchesCategory =
        categoryFilter === "all" ||
        entry.category === categoryFilter;

    let matchesStatus = true;

    if (statusFilter === "available") {
        matchesStatus = book.quantity > 0;
    }
    else if (statusFilter === "outOfStock") {
        matchesStatus = book.quantity <= 0;
    }

    return matchesSearch && matchesCategory && matchesStatus;
    });
}

function BookManagement(){
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

    const bookEntries = [
        {
            book: books[0],
            category: "Comic&Manga",
            author: "superCoolPenName",
            pic: {
                name: "cover.png",
                url: "https://picsum.photos/seed/book1/200"
            }
        },
        {
            book: books[1],
            category: "Magazine",
            author: "superCoolPenName",
            pic: {
                name: "cover.png",
                url: "https://picsum.photos/seed/book2/200"
            }
        }
    ];

    {/* Search function */}
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const filteredBooks = filterBooks(bookEntries, search, categoryFilter, statusFilter);

    {/* Tickbox */}
    const [selectedBooks, setSelectedBooks] = useState([]);
    function handleBookSelect(bookId, checked) {
        if (checked) {
            setSelectedBooks(prev => [...prev, bookId]);
        } else {
            setSelectedBooks(prev =>
                prev.filter(id => id !== bookId)
            );
            
        }
    }
    
    {/* Delete Pop Up */}
    const [showPopup, setShowPopup] = useState(false);
    const [deletePop, setDeletePop] = useState(0);
    function onTrash(id){
        setDeletePop(id);
        setShowPopup(true);
    }

    {/* Choose 6 rows to display */}
    const [tablePage, setTablePage] = useState(1);
    const showTable = 6;
    let tableRow = [];
    for (let i = (((tablePage - 1) * showTable)); i < (((tablePage - 1) * showTable) + showTable); i++){
        if (filteredBooks[i]){
            tableRow.push(<BookRow 
                                key={filteredBooks[i].book.id} 
                                book={filteredBooks[i].book} 
                                pic={filteredBooks[i].pic} 
                                category={filteredBooks[i].category} 
                                author={filteredBooks[i].author}
                                onSelect={handleBookSelect}
                                isSelected={selectedBooks.includes(filteredBooks[i].book.id)}
                                onTrash={onTrash}
                        />)
        }else {
            tableRow.push(<tr key={`empty-${i}`} className="h-[70px] border-b border-slate-100"></tr>)
        }
    }

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
                            <SquareButton text="เพิ่มหนังสือใหม่" icon="i-plus" bg_colour="9A6EA5" onClick={() => navigate("/book-management/create")}/>
                            <SquareButton text="ลบสินค้า" icon="i-trash" onClick={() => navigate("/admin-management")}/>
                        </div>
                    </div>

                    {/* Search + Filter */}
                    <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                        <div className="mt-1 flex flex-wrap items-center gap-4">
                            <div className="flex flex-col flex-8 min-w-[300px]">
                                <label htmlFor="search" className="text-[11px] font-medium text-[#737185] pb-1">คำค้นหา</label>
                                <div className="relative min-w-55 flex-1">
                                    <svg className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"><use href="#i-search"/></svg>
                                    <input 
                                        id="search" type="search" placeholder="ค้นหารหัสหนังสือ หรือชื่อหนังสือ..." 
                                        value={search}
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-plum focus:ring-2 focus:ring-plum/20" 
                                        onChange={
                                            (e) => {setSearch(e.target.value); setTablePage(1); }
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col flex-3 min-w-[100px]">
                                <label htmlFor="category" className="text-[11px] font-medium text-[#737185] pb-1">หมวดหมู่</label>
                                <div className="relative">
                                    <select 
                                        id="category" 
                                        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold text-[#684D4D] outline-none focus:border-plum focus:ring-2 focus:ring-plum/20"
                                        value={categoryFilter}
                                        onChange={(e) => {
                                            setCategoryFilter(e.target.value); setTablePage(1);}
                                        }
                                    >
                                        <option value="all">ทั้งหมด</option>
                                        <option value="General">หนังสือทั่วไป</option>
                                        <option value="Novel">นวนิยาย</option>
                                        <option value="Comic&Manga">หนังสือการ์ตูน</option>
                                        <option value="Study">ตำราเรียน</option>
                                        <option value="Magazine">นิตยสาร</option>
                                    </select>
                                    <svg className="pointer-events-none absolute right-3 size-3.5 top-1/2 -translate-y-1/2"><use href="#i-chev"/></svg>
                                </div>
                            </div>

                            <div className="flex flex-col flex-3 min-w-[100px]">
                                <label htmlFor="status" className="text-[11px] font-medium text-[#737185] pb-1">สถานะ</label>
                                <div className="relative">
                                    <select 
                                        id="status" 
                                        className="h-11 w-full flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 text-sm focus-within:border-plum focus-within:ring-2 focus-within:ring-plum/20 appearance-none bg-transparent pr-5 font-semibold text-[#684D4D] outline-none"
                                        value={statusFilter}
                                        onChange={
                                            (e) => {setStatusFilter(e.target.value); setTablePage(1);}
                                        }
                                    >
                                        <option value="all">ทั้งหมด</option>
                                        <option value="available">พร้อมจำหน่าย</option>
                                        <option value="outOfStock">หมดสต็อก</option>
                                    </select>
                                <svg className="pointer-events-none absolute right-3 size-3.5 top-1/2 -translate-y-1/2"><use href="#i-chev"/></svg>
                                </div>
                            </div>

                            <div className="flex flex-col flex-1">
                                <label htmlFor="status" className="text-[11px] font-medium text-[#73718500] pb-1">ค้นหา2</label>
                                <SquareButton text="ค้นหา" icon="i-search" text_colour="946D6D" bg_colour="DBD8F7"/>
                            </div>
                        </div>
                    </section>

                    {/* Table */}
                    <section className="overflow-hidden rounded-2xl border bg-white shadow-sm border-b-2 border-[#7E6666]">
                     <div className="overflow-x-auto">
                        <table className="w-full min-w-160 text-sm  table-fixed">
                            <colgroup>
                                <col className="w-[4%] min-w-[48px]" />   {/* Checkbox */}
                                <col className="w-[9%] min-w-[80px]" />   {/* Book ID */}
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
                                {tableRow}        
                            </tbody>
                            <tfoot>
                                <tr className="h-[41px] text-xs text-[#737185]">
                                    {
                                        filteredBooks.length > 0 ? 
                                            <th scope="col" colSpan="6" className="font-light px-6 py-3 text-left">แสดง {(((tablePage - 1) * showTable)) + 1}-{filteredBooks.length > (((tablePage - 1) * showTable) + showTable) ? ((((tablePage - 1) * showTable) + showTable)) : (filteredBooks.length)} จากทั้งหมด {filteredBooks.length} รายการหนังสือ</th>
                                        :
                                            <th scope="col" colSpan="6" className="font-light px-6 py-3 text-left">ไม่พบรายการหนังสือ</th>
                                    }
                                    
                                    <th scope="col" colSpan="3" className="font-light px-6 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                type="button" aria-label="หน้าที่แล้ว" 
                                                className="grid size-8 place-items-center border border-[#E8E7ED] rounded-lg bg-[#FFFFFF] text-[#737185] hover:bg-[#f1eeee] cursor-pointer"
                                                onClick={() => {if(tablePage > 1) {setTablePage(tablePage - 1)}}}
                                            >
                                                
                                                <svg className="size-4"><use href="#i-chev-left"/></svg>
                                            </button>
                                            <span className="text-sm grid size-8 place-items-center rounded-lg bg-[#9A6EA5] text-[#ffffff]">
                                                {tablePage}
                                            </span>
                                            <button 
                                                type="button" aria-label="หน้าต่อไป" 
                                                className="grid size-8 place-items-center border border-[#E8E7ED] rounded-lg bg-[#FFFFFF] text-[#737185] hover:bg-[#f1eeee] cursor-pointer"
                                                onClick={() => {
                                                    if(filteredBooks.length > (((tablePage - 1) * showTable) + showTable)) {
                                                        setTablePage(tablePage + 1)
                                                    }
                                                }}
                                            >
                                                <svg className="size-4"><use href="#i-chev-right"/></svg>
                                            </button>
                                        </div>
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                     </div>
                    </section>
                </main>
            </div>
            {showPopup && (
                <DeletePopUp 
                    onClick={setShowPopup} 
                    id={deletePop}
                    name={books.find(book => book.id === deletePop)?.name}    
                />
            )}
        </>
    )
}

export default BookManagement;