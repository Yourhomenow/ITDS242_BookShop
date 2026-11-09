import { Link } from "react-router-dom";

export default function BookCard({
  id,
  title,
  author,
  price,
  image
}) {
  return (
    <Link to={`/detail/${id}`} className="overflow-hidden rounded-lg border border-[#eadfd6] bg-linear-to-b from-[#fdf3c8] to-[#DAD8F7] text-[#684D4D] shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative rounded-t-lg flex h-40 items-center justify-center border border-stone-200 bg-white md:h-[190px]">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-contain"/>) : (
          <span className="text-xs text-stone-400">
            ไม่มีรูปภาพ
          </span>)}</div>
      <div className="min-h-[100px] bg-gradient-to-br from-[#eff4f8] to-bookLavender p-2.5 text-[11px]">
        <b className="block">{title}</b>
        ผู้แต่ง: {author}
        <div className="mt-2 text-sm font-bold text-bookPurple">
          {Number(price).toFixed(2)} ฿
        </div>
      </div>
    </Link>
  );
}