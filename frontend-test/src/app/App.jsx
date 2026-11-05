import { Link, Route, Routes } from "react-router-dom"
import AdminManagement from "../features/adminManagement/adminManagement"

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin-management" element={<AdminManagement />} />
        <Route path="/" element={<AdminManagement />} />
      </Routes>
    </>

  )
}

export default App