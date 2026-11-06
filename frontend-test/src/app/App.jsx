import { Route, Routes } from "react-router-dom"
import { IconSprite } from "../shared/components/IconSprite"
import AdminManagement from "../features/adminManagement/AdminManagement"
import AdminCreate from "../features/adminManagement/AdminCreate"
import AdminChange from "../features/adminManagement/AdminChange"



function App() {
  return (
    <>
      <IconSprite/>
      <Routes>
        <Route path="/adminManagement" element={<AdminManagement />}/>
        <Route path="/adminCreate" element={<AdminCreate />}/>
        <Route path="/adminChange" element={<AdminChange />}/>
        <Route path="/" element={<AdminManagement />} />
      </Routes>
    </>

  )
}

export default App