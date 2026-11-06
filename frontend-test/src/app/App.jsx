import { Route, Routes } from "react-router-dom"
import AdminManagement from "../features/adminManagement/AdminManagement"
import AdminCreate from "../features/adminManagement/AdminCreate"

function App() {
  return (
    <>
      <Routes>
        <Route path="/adminManagement" element={<AdminManagement />}/>
        <Route path="/adminCreate" element={<AdminCreate />}/>
        <Route path="/" element={<AdminManagement />} />
      </Routes>
    </>

  )
}

export default App