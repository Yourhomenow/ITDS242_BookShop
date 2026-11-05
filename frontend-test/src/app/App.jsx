import { Link, Route, Routes } from "react-router-dom"
import AdminManagement from "../features/adminManagement/adminManagement"
import BookManagement from "../features/bookManagement/bookManagement"

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin-management" element={<AdminManagement />} />
        <Route path="/book-management" element={<BookManagement />} />
        <Route path="/" element={<AdminManagement />} />
      </Routes>
    </>

  )
}

export default App