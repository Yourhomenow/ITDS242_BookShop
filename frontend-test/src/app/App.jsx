import { Route, Routes } from "react-router-dom"
import { IconSprite } from "../shared/components/IconSprite"
// import AdminManagement from "../features/adminManagement/AdminManagement"
import AdminCreate from "../features/adminManagement/AdminCreate"
import AdminChange from "../features/adminManagement/AdminChange"

import HeaderShop from "../shared/components/header_shop";
import NavbarShop from "../shared/components//navbar_shop";
import Search from "../features/product-catalog/Search";
import Detail from "../features/product-catalog/Detail";
import {
  BookManagement,
  BookCreate,
  BookChange,
} from "../features"
import AdminManagement from "../features/adminManagement/AdminManagement";

function App() {
  return (
    <>
      <IconSprite/>
      <Routes>
        <Route path="/search/:keyword?"element={<><HeaderShop /><NavbarShop /><Search /></>}/>
        <Route path="/detail/:id" element={<><HeaderShop /><NavbarShop /><Detail /></>}/>
      
        <Route path="/adminManagement" element={<AdminManagement />}/>
        <Route path="/adminCreate" element={<AdminCreate />}/>
        <Route path="/adminChange/:id" element={<AdminChange />}/>
        <Route path="/bookManagement" element={<BookManagement />} />
        <Route path="/bookCreate" element={<BookCreate />} />
        <Route path="/bookChange/:id" element={<BookChange />} />
        <Route path="/" element={<AdminManagement />} />
      </Routes>
    </>

  )
}

export default App