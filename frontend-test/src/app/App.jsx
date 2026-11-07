import { Link, Route, Routes } from "react-router-dom"
import { IconSprite } from "../shared/components/IconSprite"
import AdminManagement from "../features/adminManagement/adminManagement"
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
        <Route path="/admin-management" element={<AdminManagement />} />
        <Route path="/book-management" element={<BookManagement />} />
        <Route path="/book-management/create" element={<BookCreate />} />
        <Route path="/book-management/change/:id" element={<BookChange />} />
        <Route path="/" element={<AdminManagement />} />
      </Routes>
    </>

  )
}

export default App