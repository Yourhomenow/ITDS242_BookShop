import { useState } from "react";

import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./api";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // คุณใช้ชื่อ username เก็บค่าอีเมล
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await login(username,password);
      navigate('/adminManagement')
      // alert("เข้าสู่ระบบแล้ว");
    }catch(err){
      alert("Have a error!");
      console.error(err)
    }

  };
  return (
    <div className="">

      {/* Main */}
      <main className="min-h-[calc(100vh-110px)] bg-gradient-to-br from-[#d9d4f5] via-[#c9d5f0] to-[#a9d0e8] flex flex-col items-center py-3">

        {/* Logo */}
        <div className="flex flex-col items-center mb-3">
          <img
            src={logo}
            alt="มหาสมุด"
            className="w-44 h-40 object-contain"
          />
        </div>

        {/* Login Card */}
        <div
          id="login-card"
          className="bg-[#fffdfa] w-[340px] rounded-2xl shadow-lg px-7 py-6"
        >

          <h2 className="text-2xl font-bold text-center text-[#795b70]">
            เข้าสู่ระบบ
          </h2>

          <p className="text-center text-xs text-[#987878] mt-2 mb-6">
            — ยินดีต้อนรับสู่มหาสมุด —
          </p>

          <form onSubmit={handleLogin} className="">

            {/* Username */}
            <div className="relative mb-3">

              <span className="absolute left-4 top-3 text-[#b59eaf]">
                <svg className="size-5"><use href="#i-user" /></svg>
              </span>

              <input
                type="text"
                placeholder="ชื่อผู้ใช้"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-[#ded6d6] rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-[#a995d0]"
              />

            </div>

            {/* Password */}
            <div className="relative mb-5">

              <span className="absolute left-4 top-3 text-[#b59eaf]">
                <svg className="size-5"><use href="#i-lock" /></svg>
              </span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#ded6d6] rounded-xl py-3 pl-10 pr-12 text-sm outline-none focus:border-[#a995d0]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-400"
              >
                {showPassword ? "👁" : "⊘"}
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r  from-[#d2cddb] to-[#a995d0] text-white py-3 rounded-xl font-bold hover:bg-[#795b70] transition duration-300 cursor-pointer"
            >
              เข้าสู่ระบบ
            </button>

          </form>


        </div>

      </main>
    </div>
  );
}

export default Login;
