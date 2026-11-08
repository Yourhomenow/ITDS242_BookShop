import { useNavigate } from "react-router-dom";

const categoryColor = 
{
    General: {textColor: "37A34E", textBgColor: "B7F7B0", bgColor: "E8F5E4", thai:"หนังสือทั่วไป"},
    Novel: {textColor: "BF7373", textBgColor: "F1C8C8", bgColor: "F5E9E4", thai:"นวนิยาย"},
    "Comic&Manga": {textColor: "B5AB42", textBgColor: "F7F0B0", bgColor: "FAF8E0", thai:"หนังสือการ์ตูน"},
    Study: {textColor: "2F808B", textBgColor: "C8ECF1", bgColor: "E9FCFF", thai:"ตำราเรียน"},
    Magazine: {textColor: "973C8C", textBgColor: "F1C8EC", bgColor: "FFEFFD", thai:"นิตยสาร"}
}

export function BookRow ({ book, onSelect, isSelected, onTrash}){
    const navigate = useNavigate();

    const category = book.category[0];
    const colors = categoryColor[category] ?? {
        textColor: "555555",
        textBgColor: "EEEEEE",
        bgColor: "FFFFFF",
        thai: category || "ไม่ระบุหมวดหมู่"
    };

    let [author] = book.author;
    for (let i in book.author){
        if (i != 0){
            author += `, ${book.author[i]}`;
        }
    }

    const picture = book.picture[0];
    return (
        <tr 
            className="h-[70px] border-b border-slate-100 font-semibold text-[#5b4650] text-center hover:brightness-102 transition-[filter] duration-130"
            style={{
                backgroundColor: `#${colors.bgColor}`
            }}
        >
            <td className="px-6 py-4">
                <div className="flex justify-center items-center">
                    <input 
                        type="checkbox" 
                        className=" size-3"
                        checked={isSelected}
                        onChange={(e) => {onSelect(book.id, e.target.checked)}}
                    />
                </div>
            </td>

            <td className="px-6 py-4 text-left">{String(book.id).padStart(4, "0")}</td>

            <td className="px-6 py-4">
                <div className="flex justify-center items-center">
                    <img src={picture.url} alt={picture.name} className="h-14 w-10 rounded object-cover"></img>
                </div>
            </td>

            <td className="px-6 py-4 text-left">
                <div className="flex flex-col">
                    {book.name}
                    <label className="font-light text-[#737185] text-sm">{author}</label>
                </div>
            </td>

            <td className="px-6 py-4">
                <span 
                    className="rounded-4xl px-2.5 py-1"
                    style={{
                        backgroundColor: `#${colors.textBgColor}`,
                        color: `#${colors.textColor}`
                    }}
                >
                    {colors.thai}
                </span>
            </td>

            <td className="px-6 py-4">{book.price}</td>
            <td className="px-6 py-4">{book.quantity}</td>
            
            <td className="px-6 py-4">
                <span className={`rounded-4xl px-2.5 py-1 ${
                    book.quantity > 0 ? 'bg-[#ADDEB1] text-[#317B5B]' : 'bg-[#ffe98a] text-[#6B6122]'
                    }`}>
                    {book.quantity > 0 ? "พร้อมจำหน่าย" : "หมดสต็อก"}
                </span>
            </td>

            <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                    <button 
                        type="button" aria-label="แก้ไข" 
                        className="grid size-8 place-items-center rounded-lg 
                            border border-[#D0DDF0] bg-[#e3effd] text-[#3b82c4] hover:bg-[#cfe3fa] cursor-pointer"
                        onClick={() => navigate(`/book-management/change/${book.id}`)}
                    >
                        <svg className="size-4"><use href="#i-edit"/></svg>
                    </button>
                    <button type="button" onClick={() => onTrash(book.id)} aria-label="ลบ" className="grid size-8 place-items-center rounded-lg border border-[#F0D0D0] bg-[#fde4e4] text-[#d24a4a] hover:bg-[#fbcfcf] cursor-pointer">
                        <svg className="size-4"><use href="#i-trash"/></svg>
                    </button>
                </div>
            </td>
        </tr>
    )
}