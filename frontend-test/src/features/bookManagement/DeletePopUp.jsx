import { Fragment } from "react";

async function deleteBook(id, onClick, onDelete){
    try{
        for (let i in id){
            const response = await fetch(`/api/admins/books/${id[i]}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Can't insert book");
            }
        }
        onDelete(prev => prev + 1);
        onClick(false);
    }catch(err) {
        console.error(err);
        alert(err.message);
    }
}

export function DeletePopUp({ onClick, id, books, onDelete}) {
    id.sort((a, b) => a - b);

    let detail = [];
    for (let i in id){
        detail.push(
            <Fragment key={id[i]}>
                <span>
                    {String(id[i]).padStart(4, "0")}
                </span>
                <span>
                    {books.find((book) => book.id === id[i])?.name}
                </span>
            </Fragment>
        )
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#ac94949d]"
        >
            <div
                className="flex flex-col w-[40%] max-w-[600px] min-w-[300px]  min-h-[400px] max-h-[800px] rounded-2xl bg-white p-8 shadow-xl gap-4"
            >
                <div className="flex w-full gap-6 p-2">
                    <span className="grid size-15 shrink-0 place-items-center rounded-full bg-[#FEE2E2] text-[#EF4444]">
                        <svg className="size-8"><use href="#i-warning"/></svg>
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

                <div className="flex w-full min-h-[80px] max-h-[120px] gap-6 p-2 bg-[#F8FAFC] text-[#0F172A] rounded-xl font-light overflow-auto">
                    <div className="flex flex-col p-4 gap-2">
                        {detail}
                    </div>
                </div>

                <div className="flex w-full gap-6 p-2 text-[#EF4444] rounded-xl font-light">
                    <span>
                        * ข้อมูลหนังสือนี้จะถูกทำลายถาวรจากฐานข้อมูล
                    </span>
                </div>

                <div className="mt-5 flex justify-end gap-4 min-h-[45px]">
                    <button
                        type="button"
                        className="rounded-xl bg-[#E2E8F0] px-5 py-2 text-black cursor-pointer hover:bg-[#C3CBD7]"
                        onClick={() => onClick(false)}
                    >
                        ยกเลิก
                    </button>

                    <button
                        type="button"
                        onClick={() => deleteBook(id, onClick, onDelete)}
                        className="rounded-xl bg-[#EF4444] px-5 py-2 text-white cursor-pointer hover:bg-[#E03B3B]"
                    >
                        ยืนยันลบถาวร
                    </button>
                </div>
            </div>
        </div>
    )
}