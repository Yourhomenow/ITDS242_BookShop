const base_className = "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium shadow-md shadow-plum/30 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum cursor-pointer"

export function SquareButton({text, icon, onClick, text_colour = "FFFFFF", bg_colour = "7E6666"}){
    return (
        <button 
            type="button" 
            className={base_className}
            style={{
                backgroundColor: `#${bg_colour}`,
                color: `#${text_colour}`
            }} 
            onClick={onClick}
        >
            {(icon) && (<svg className="size-4"><use href={`#${icon}`}/></svg>)}
            {text}
        </button>
    )
}