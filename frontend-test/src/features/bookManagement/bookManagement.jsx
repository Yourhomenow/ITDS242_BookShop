import { TopBar } from "../../shared/components/TopBar"
import { SideBar } from "../../shared/components/SideBar"

function BookManangement(){
    return (
        <div>
            <TopBar/>
            <SideBar activePage={"book"}/>
        </div>
    )
}

export default BookManangement