import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { TopBar } from "../../shared/components/TopBar"
import { SideBar } from "../../shared/components/SideBar"

async function uploadFile(file){
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "itds242-bookshop");

    const response = await fetch(
    "https://api.cloudinary.com/v1_1/itds242-bookshop/image/upload",
    {
        method: "POST",
        body: formData
    }
    );

    const result = await response.json();
    return {status: response.status, result: result};
}

export function BookChange(){
    const navigate = useNavigate();
    const { id } = useParams();

    const [pictureUpload, setPictureUpload] = useState([]);
    const [pictureDelete, setPictureDelete] = useState([]);

    function handleFileChange(e){
        const files = e.target.files
        for (const file of files) {
            if (file.type !== "image/png" && file.type !== "image/jpeg") {
                alert("Only PNG and JPEG images are allowed!");
                e.target.value = "";
                return;
            }
        }
        setPictureUpload(Array.from(files));
        console.log(Array.from(files));
    }

    let picture = [];
    for (let i in pictureUpload){
        const src = URL.createObjectURL(pictureUpload[i]);
        picture.push(<img src={src} className="block max-w-[200px] max-h-[200px] rounded-xl"></img>)
    }

    async function formSubmit(form){
        form.preventDefault();

        const formData = new FormData(form.currentTarget);
        const bookData = Object.fromEntries(formData);
        try{
            let picture = []
            if (pictureUpload.length > 0){
                for (let i in pictureUpload){
                    const response = await uploadFile(pictureUpload[i]);
                    if (response.status == 200){
                        picture.push({
                            name: pictureUpload[i].name,
                            url: response.result.secure_url
                        });
                    }else{
                        throw new Error(
                            "Can't upload image"
                        );
                    }
                }
            }

            const formatData = (data, picture) => ({
                book:{
                    name: data.name || null,
                    quantity: null,
                    price: data.price === "" ? null : Number(data.price),
                    size: data.size || null,
                    isbnCode: data.isbnCode || null,
                    publishDate: data.publishDate || null,
                    description: data.description || null
                },
                publisher: data.publisher || null,
                author: data.author || null,
                category: data.category || null,
                pictures: picture.length > 0 ? picture : null,
                deletePicID: pictureDelete.length > 0 ? pictureDelete : null
            });

            const formattedData = formatData(bookData, picture);
            const response = await fetch(`/api/admins/books/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formattedData)
            });
            if (!response.ok) {
                throw new Error("Can't update book");
            }
        }catch (err){
            console.error(err);
            alert(err.message);
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
                    <button 
                        type="button" aria-label="สร้าง" 
                        className="grid size-12 shrink-0 place-items-center rounded-xl border border-[#dcd2ee] bg-[#ece6f5] text-[#7a4f8f]
                                    hover:bg-[#e2dcea] cursor-pointer"
                        onClick={() => navigate('/book-management')}
                    >
                        <svg className="size-6"><use href="#i-corner-up-left"/></svg>
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold text-ink text-[#684D4D]">แก้ไขข้อมูลหนังสือ</h1>
                        <p className="mt-0.5 text-sm text-[#9A6EA5]">แก้ไขข้อมูลหนังสือในระบบบ {id}</p>
                    </div>
                </div>

                {/* Form Body */}
                <form onSubmit={formSubmit}>
                    <div className="flex flex-row gap-[5%] p-[2%] overflow-auto">
                        <div className="flex flex-wrap flex-6 self-start gap-4 bg-[#FFFFFF] border-2 p-10 w-max rounded-2xl border-[#F0E4CE] min-w-[300px]">
                            {/* Name */}
                            <div className="flex flex-col w-full gap-2">
                                <label className="font-medium text-[#402E40] pb-1">ชื่อหนังสือ</label>
                                <input 
                                    id="name" type="text" placeholder="ชื่อหนังสือ" 
                                    name="name"
                                    className="h-11 w-full rounded-xl 
                                        border border-[#F0E4CE] bg-[#FFFDF6] pl-4 text-sm outline-none
                                            placeholder:text-[#8B708B] focus:border-plum focus:ring-2 focus:ring-plum/20" 
                                />
                            </div>

                            {/* ISBN */}
                            <div className="flex flex-col w-full gap-2">
                                <label className="font-medium text-[#402E40] pb-1">รหัสISBN</label>
                                <input 
                                    id="ISBN" type="text" placeholder="999-999-99-99999-9 (เว้นว่างหากไม่มี)"
                                    name="isbnCode"
                                    className="h-11 w-full rounded-xl 
                                        border border-[#F0E4CE] bg-[#FFFDF6] pl-4 text-sm outline-none
                                            placeholder:text-[#8B708B] focus:border-plum focus:ring-2 focus:ring-plum/20" 
                                />
                            </div>

                            {/* Category/ Price */}
                            <div className="flex flex-wrap w-full gap-[4%]">
                                <div className="flex flex-col w-[48%] min-w-[150px] gap-2">
                                    <label className="font-medium text-[#402E40] pb-1">หมวดหมู่</label>
                                    <input 
                                        id="category" type="text" placeholder="หมวดหมู่1, หมวดหมู่2"
                                        name="category"
                                        className="h-11 w-full rounded-xl 
                                            border border-[#F0E4CE] bg-[#FFFDF6] pl-4 text-sm outline-none
                                            placeholder:text-[#8B708B] focus:border-plum focus:ring-2 focus:ring-plum/20" 
                                    />
                                </div>
                                <div className="flex flex-col w-[48%] min-w-[150px] gap-2">
                                    <label className="font-medium text-[#402E40] pb-1">ราคาขาย (บาท)</label>
                                    <input 
                                        id="price" type="text" placeholder="0.00"
                                        name="price"
                                        className="h-11 w-full rounded-xl 
                                            border border-[#F0E4CE] bg-[#FFFDF6] pl-4 text-sm outline-none
                                            placeholder:text-[#8B708B] focus:border-plum focus:ring-2 focus:ring-plum/20" 
                                    />
                                </div>
                            </div>

                            {/* Author/ Publisher */}
                            <div className="flex flex-wrap w-full gap-[4%]">
                                <div className="flex flex-col w-[48%] min-w-[150px] gap-2">
                                    <label className="font-medium text-[#402E40] pb-1">ผู้แต่ง</label>
                                    <input 
                                        id="author" type="text" placeholder="ชื่อผู้แต่ง1, ชื่อผู้แต่ง2" 
                                        name="author"
                                        className="h-11 w-full rounded-xl
                                            border border-[#F0E4CE] bg-[#FFFDF6] pl-4 text-sm outline-none
                                            placeholder:text-[#8B708B] focus:border-plum focus:ring-2 focus:ring-plum/20" 
                                    />
                                </div>
                                <div className="flex flex-col w-[48%] min-w-[150px] gap-2">
                                    <label className="font-medium text-[#402E40] pb-1">สำนักพิมพ์</label>
                                    <input 
                                        id="publisher" type="text" placeholder="ชื่อสำนักพิมพ์"
                                        name="publisher"
                                        className="h-11 w-full rounded-xl 
                                            border border-[#F0E4CE] bg-[#FFFDF6] pl-4 text-sm outline-none
                                            placeholder:text-[#8B708B] focus:border-plum focus:ring-2 focus:ring-plum/20" 
                                    />
                                </div>
                            </div>

                            {/* Size/ Publish Date */}
                            <div className="flex flex-wrap w-full gap-[4%]">
                                <div className="flex flex-col w-[48%] min-w-[150px] gap-2">
                                    <label className="font-medium text-[#402E40] pb-1">ขนาด</label>
                                    <input 
                                        id="size" type="text" placeholder="กว้าง x ยาว" 
                                        name="size"
                                        className="h-11 w-full rounded-xl 
                                            border border-[#F0E4CE] bg-[#FFFDF6] pl-4 text-sm outline-none
                                            placeholder:text-[#8B708B] focus:border-plum focus:ring-2 focus:ring-plum/20" 
                                    />
                                </div>
                                <div className="flex flex-col w-[48%] min-w-[150px] gap-2">
                                    <label className="font-medium text-[#402E40] pb-1">ปีที่ตีพิมพ์</label>
                                    <input 
                                        id="publishDate" type="text" placeholder="ปีที่ตีพิมพ์"
                                        name="publishDate"
                                        className="h-11 w-full rounded-xl 
                                            border border-[#F0E4CE] bg-[#FFFDF6] pl-4 text-sm outline-none
                                            placeholder:text-[#8B708B] focus:border-plum focus:ring-2 focus:ring-plum/20" 
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col w-full gap-2">
                                <label className="font-medium text-[#402E40] pb-1">คำอธิบายย่อภาษาไทย</label>
                                <textarea 
                                    id="description" rows="3" cols="5" placeholder="เนื้อหาและประวัติศาสตร์ของหนังสือ"
                                    name="description"
                                    className="min-h-[100px] w-full rounded-xl p-4
                                        border border-[#F0E4CE] bg-[#FFFDF6] pl-4 text-sm outline-none
                                            placeholder:text-[#8B708B] focus:border-plum focus:ring-2 focus:ring-plum/20" 
                                ></textarea>
                            </div>

                            <div className="mt-3 flex justify-end w-full gap-2">
                                <button type="button" 
                                    className="text-[#8B708B] bg-[#FFFFFF] p-3 pl-5 pr-5 rounded-2xl 
                                        border border-[#F0E4CE] cursor-pointer hover:brightness-105"
                                    onClick={() => navigate("/book-management")}
                                >
                                    ยกเลิก
                                </button>
                                <button type="submit" 
                                    className="bg-[#9A6EA5] p-3 pl-5 pr-5 rounded-2xl text-white 
                                        cursor-pointer hover:brightness-105">
                                    บันทึกสินค้าใหม่
                                </button>
                            </div>
                        </div>

                        {/* Picture */}
                        <div className="flex flex-4 self-start flex-col min-w-[305px] h-auto gap-4 bg-[#FFFFFF] border-2 p-6 w-max rounded-2xl border-[#F0E4CE]">
                            <span className="font-bold text-[#402E40]">รูปภาพปัจจุบัน</span>
                            <div>
                                { picture.length > 0 ?
                                    <div className="flex overflow-auto max-h-[200px] mb-[30px] gap-4">
                                        {picture}
                                    </div> 
                                    : ''
                                }
                                <label
                                    htmlFor="picture"
                                    className="flex flex-col items-center justify-center
                                        w-full rounded-xl
                                        min-h-[40px] bg-[#FFFDF6]
                                        cursor-pointer hover:bg-[#F9F3E8]"
                                >
                                    <span className="text-sm text-[#402E40]">
                                        เพิ่มรูปภาพ
                                    </span>
                                </label>

                                <input
                                    id="picture"
                                    name="picture"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    multiple
                                    className="sr-only"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        
                    </div>
                </form>
            </main>
        </div>
    </>
    )
}

export default BookChange;