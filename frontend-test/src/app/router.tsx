import { Link, Routes, Route } from 'react-router-dom'
import AdminManagement from '../features/adminManagement/adminManagement'

export function Router() {
  return (
    <div className="">
      <h1 className="text-amber-900 text-3xl font-bold underline">
        Hello world
      </h1>
      <Link
        to="/admin-management"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Admin Management
      </Link>
      <Routes>
        <Route path="/admin-management" element={<AdminManagement />} />
      </Routes>
    </div>
  )
}
