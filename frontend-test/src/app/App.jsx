import { Route, Routes } from "react-router-dom"
import { IconSprite } from "../shared/components/IconSprite"
import AdminManagement from "../features/adminManagement/AdminManagement"
import AdminCreate from "../features/adminManagement/AdminCreate"
import AdminChange from "../features/adminManagement/AdminChange"
import {
  BookManagement,
  BookCreate,
  BookChange,
} from "../features"

function App() {
  return (
    <>
      <IconSprite/>
      <Routes>
        <Route path="/adminManagement" element={<AdminManagement />} />
        <Route path="/adminCreate" element={<AdminCreate />}/>
        <Route path="/adminChange" element={<AdminChange />}/>
        <Route path="/book-management" element={<BookManagement />} />
        <Route path="/book-management/create" element={<BookCreate />} />
        <Route path="/book-management/change/:id" element={<BookChange />} />
        <Route path="/" element={<AdminManagement />} />
      </Routes>
    </>

  )
}

export default App