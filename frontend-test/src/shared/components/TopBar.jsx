import { useEffect } from "react";
import logo from "../../assets/logo.png";
import { getMe } from "../../features/login/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function TopBar() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState()


  useEffect(()=>{
    const me = async ()=>{
      try{
        const response = await getMe()
        const res = await fetch(`/api/admins/${response.AdminID}`)
        const resJson = await res.json()
        setAdminData(resJson)
        // console.log(response)
        // console.log(adminData)
      }catch(err){
        navigate("/login")
        console.error(err)
      }
    }

    me()

  },[navigate])

  return (
    <header className="flex h-20 items-center justify-between bg-[#8a5f66] px-6">
      <img src={logo} alt="มหาสมุด" className="h-18 object-contain" />
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-[#EBE9F5] text-[#7E6FB8]">
          <svg className="size-6"><use href="#i-user" /></svg>
        </span>
        <div className="text-right leading-tight text-white">
          <p className="text-sm font-semibold text-left">{adminData?.Username ?? "..."}</p>
          <p className="text-[11px] font-medium tracking-wide text-[#fde9a8]">ADMINISTRATOR</p>
        </div>
      </div>
    </header>
  );
}