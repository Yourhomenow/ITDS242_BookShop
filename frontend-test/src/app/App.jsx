import { Link, Route, Routes } from "react-router-dom"
import { IconSprite } from "../shared/components/IconSprite"
import AdminManagement from "../features/adminManagement/adminManagement"
import {
  BookManagement,
  BookCreate,
} from "../features"

function App() {
  return (
    <>
      <IconSprite/>
      <Routes>
        <Route path="/admin-management" element={<AdminManagement />} />
        <Route path="/book-management" element={<BookManagement />} />
        <Route path="/book-management/book-create" element={<BookCreate />} />
        <Route path="/" element={<AdminManagement />} />
      </Routes>
    </>

  )
}

export default App