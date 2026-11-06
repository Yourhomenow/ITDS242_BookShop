import { Link, Route, Routes } from "react-router-dom"
import { IconSprite } from "../shared/components/IconSprite"
import AdminManagement from "../features/adminManagement/adminManagement"

function App() {
  return (
    <>
      <IconSprite/>
      <Routes>
        <Route path="/admin-management" element={<AdminManagement />} />
        <Route path="/" element={<AdminManagement />} />
      </Routes>
    </>

  )
}

export default App